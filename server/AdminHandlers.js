"use strict";
const bcrypt = require('bcrypt')
const { cloudinary } = require('./utils/cloudinary')

const { v4: uuidv4 } = require("uuid");

const { Error404 } = require("./ErrorHandler");
const { projectName, usersCollection, adminRestoInfoCollection, adminMenuCollection } = require('./dbConstants');
// const { App } = require("../client/src/App");

// encrypting password function to call
const hashPass = async (passToHash) => {
    try {
        return await bcrypt.hash(passToHash, 10);
    } catch (err) {
        console.log(err, "Error hashing password")
    }
};

// POST - create new Admin
const addNewAdmin = async (req, res) => {
    const { busName, firstName, lastName, email, address, postalCode, province, country, phone } = req.body;
    let { password } = req.body;

    // if any of the field below are not entered -> status 400
    if (!req.body ||
        !busName ||
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !address ||
        !postalCode ||
        !province ||
        !country ||
        !phone ||
        !email.includes('@')) {

        return res.status(400).json({ status: 400, message: "Error. Missing data from one field or more" })
    };
    const { db } = req.app.locals;
    // check if admin already exists by email
    const existingAdmin = await db.collection(usersCollection).findOne({ email });

    // If admin exists, throw an error or else create new admin
    if (existingAdmin !== null) {
        return res.status(400).json({ status: 400, data: existingAdmin, message: "That admin email already exists" })
    } else {
        const hashedPassword = await hashPass(req.body.password);

        const userId = uuidv4();

        const adminData = { _id: userId, firstName, lastName, email, password: hashedPassword, isAdmin: true };

        const newAdmin = await db.collection(usersCollection).insertOne(adminData);

        const adminRestoInfo = { _id: uuidv4(), busName, address, postalCode, province, country, phone, userId: userId };

        const newAdminRestoInfo = await db.collection(adminRestoInfoCollection).insertOne(adminRestoInfo)

        res.status(201).json({ status: 201, data: { ...newAdmin, ...newAdminRestoInfo }, message: "New admin created and added to database" });
    }
};

const addNewMenuItem = async (req, res) => {
    try {
        const { itemTitle, itemDetails, itemPrice } = req.body;

        if (!req.body || !itemTitle || !itemDetails || !itemPrice) {
            return res.status(400).json({ status: 400, message: "Error. Missing data from one field or more" })
        }

        const menuItemId = uuidv4();
        const menuItemInfo = { _id: menuItemId, itemTitle, itemDetails, itemPrice }

        const { db } = req.app.locals;

        const newMenuItemEntry = await db.collection(adminMenuCollection).insertOne(menuItemInfo);

        res.status(201).json({ status: 201, data: { ...newMenuItemEntry }, message: "Menu item added" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error uploading menu item" })
    }
};

const addNewMenuImg = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'test'
        })
        console.log(uploadedResponse);
        res.json({ message: "Image has been uploaded" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Issue uploading image" })
    }
};

module.exports = { addNewAdmin, addNewMenuImg, addNewMenuItem }
