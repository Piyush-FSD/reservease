"use strict";
const bcrypt = require('bcrypt')
var QRCode = require('qrcode')
const { cloudinary } = require('./utils/cloudinary')

const { v4: uuidv4 } = require("uuid");

const { Error404 } = require("./ErrorHandler");
const { usersCollection, adminRestoInfoCollection, adminMenuCollection } = require('./dbConstants');
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

    const { busName, firstName, lastName, email, address, postalCode, province, city, phone, website } = req.body;
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
        !city ||
        !phone ||
        !website ||
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
        const adminData = { _id: userId, firstName, lastName, email, website, password: hashedPassword, isAdmin: true };

        const newAdmin = await db.collection(usersCollection).insertOne(adminData);

        const adminRestoInfo = { _id: uuidv4(), busName, address, postalCode, province, city, phone, website, userId, menu: [] };

        const newAdminRestoInfo = await db.collection(adminRestoInfoCollection).insertOne(adminRestoInfo);

        // assign QR code to newly registered admin
        QRCode.toFile(
            'VenuQrCodes/' + busName + '.png',
            website,
            [{ data: [253, 254, 255], mode: 'byte' }]
        )

        // upload QR code to cloudinary
        try {
            const fileStr = 'VenuQrCodes/' + busName + '.png';
            const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'test'
            })
            console.log(uploadedResponse);

            return res.status(201).json({ status: 201, data: { ...newAdmin, ...newAdminRestoInfo }, message: "New admin created, added to database and QR code image has been uploaded" });

        } catch (error) {
            console.log(error, "TRY CATCH ERROR")
            return res.status(500).json({ error: "Issue uploading image" })
        }
    }
};

const addNewMenuItem = async (req, res) => {
    try {
        const { itemTitle, itemDetails, itemPrice, image } = req.body;

        if (!itemTitle || !itemDetails || !itemPrice || !image) {
            return res.status(400).json({ status: 400, message: "Error. Missing data from one field or more" })
        }

        const { db } = req.app.locals;

        const uploadedImage = await uploadImageToCloudinary(image);
        // console.log(uploadedImage)

        const menuItemId = uuidv4();
        const menuItemInfo = { _id: menuItemId, itemTitle, itemDetails, itemPrice, itemImage: uploadedImage.secure_url };

        const newMenuItemEntry = await db.collection(adminRestoInfoCollection).updateOne({ userId: res.locals.adminUser.userId }, { $push: { menu: menuItemInfo } });

        if (newMenuItemEntry.acknowledged === true) {
            res.status(201).json({ status: 201, data: newMenuItemEntry, message: "Menu item added" });
        };

    } catch (error) {
        console.error(error);
        console.log('fail')
        res.status(500).json({ error: "Error uploading menu item" });
    };
};

const deleteMenuItem = async (req, res) => {
    try {
        const { db } = req.app.locals;
        const { _id } = req.params;

        const menuItemById = await db.collection(adminMenuCollection).deleteOne({ _id });

        if (menuItemById) {
            res.status(200).json({ status: 200, data: menuItemById, message: "Menu item deleted" })
        } else {
            res.status(404).json({ Error404 })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting menu item" })
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const { db } = req.app.locals;
        const { _id } = req.params;

        const menuInfo = {
            $set: {
                itemTitle: req.body.itemTitle,
                itemDetails: req.body.itemDetails,
                itemPrice: req.body.itemPrice
            }
        };

        const menuItemById = await db.collection(adminMenuCollection).updateOne({ _id }, menuInfo);

        if (menuItemById) {
            res.status(200).json({ status: 200, data: menuItemById, message: "Menu item updated" })
        } else {
            res.status(404).json({ Error404 })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating menu item" })
    }
};

const getMenuInfoById = async (req, res) => {
    try {
        const { db } = req.app.locals;
        const { _id } = req.params;

        const menuData = await db.collection(adminMenuCollection).findOne({ _id })

        res.status(201).json({ status: 201, data: menuData, message: "Accessed menu info by ID" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retreiving menu info by ID" })
    }
};

const getAllMenuInfo = async (req, res) => {
    try {
        const { db } = req.app.locals;

        const allMenuData = await db.collection(adminMenuCollection).find().toArray();

        if (allMenuData.length === 0) {
            throw new Error("No menu items available")
        }
        res.status(200).json({ status: 200, data: allMenuData, message: "Sucessfully obtainned all menu data" })

    } catch (error) {
        console.error(error, 'hello');
        res.status(500).json({ error: error.message, message: "Error retreiving menu info" })
    }
};

const getAdminEmail = async (req, res) => {
    try {
        const { db } = req.app.locals;
        console.log('hit')

        // const { email } = req.body;
        const { email } = req.params;

        const menuInfoEmail = await db.collection(usersCollection).find({ email }).toArray();

        res.status(200).json({ status: 200, data: menuInfoEmail, message: "Successfully got menu info by email" });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error sending email" })
    }
};

const addNewMenuImg = async (req, res) => {
    try {
        const fileStr = req.body.data;

        const uploadedResponse = await uploadImageToCloudinary(fileStr);
        console.log(uploadedResponse);

        res.json({ message: "Image has been uploaded" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Issue uploading image" })
    }
};

const uploadImageToCloudinary = async (image) => {

    const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: 'test'
    })

    return uploadedResponse;
}

module.exports = { addNewAdmin, addNewMenuImg, addNewMenuItem, deleteMenuItem, updateMenuItem, getMenuInfoById, getAllMenuInfo, getAdminEmail }
