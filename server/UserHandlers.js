"use strict";

const bcrypt = require('bcrypt')

const { v4: uuidv4 } = require("uuid");
const e = require("express");

const { usersCollection, adminRestoInfoCollection } = require('./dbConstants');

const hashPass = async (passToHash) => {
    try {
        return await bcrypt.hash(passToHash, 10);

    } catch (err) {
        console.log(err, "Error hashing password")
    }
};

// POST - create new User
const addNewUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    let { password } = req.body;

    // if any of the field below are not entered -> status 400
    if (!req.body ||
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !email.includes('@')) {

        return res.status(400).json({ status: 400, message: "Error. Missing data from one field or more" })
    };

    const { db } = req.app.locals;

    // check if user already exists by email
    const existingUser = await db.collection(usersCollection).findOne({ email });

    // If user exists, throw an error or else create new user
    if (existingUser !== null) {
        return res.status(400).json({ status: 400, data: existingUser, message: "That user email already exists" })
    } else {
        const hashedPassword = await hashPass(req.body.password);

        const user = { firstName, lastName, email, password: hashedPassword, isAdmin: false };

        const userData = { _id: uuidv4(), ...user };
        const newUser = await db.collection(usersCollection).insertOne(userData);

        res.status(201).json({ status: 201, data: newUser, message: "New user created and added to database" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (
        !req.body ||
        !password ||
        !email ||
        !email.includes('@')) {
        // client.close();

        return res.status(400).json({ status: 400, message: "Error - data missing" })
    };
    const { db } = req.app.locals;

    const findUser = await db.collection(usersCollection).findOne({ email });

    if (findUser === null) {
        return res.status(400).json({ status: 400, data: findUser, message: "Unable to find user" })
    } else {
        const hashpass = findUser.password;

        const decryptPass = await bcrypt.compare(password, hashpass);

        if (decryptPass) {
            res.status(200).json({ status: 200, data: { firstName: findUser.firstName, admin: findUser.isAdmin, email: findUser.email, adminId: findUser._id }, message: "User login successful" })
        } else {
            // res.status(400).json{}
            // send error msg if incorrect pass
        }
    }
};

const getSearchResults = async (req, res) => {
    try {
        const { db } = req.app.locals;

        const searchResults = await db.collection(adminRestoInfoCollection).findOne();

        res.status(200).json({ status: 200, data: searchResults, message: "Successfully obtained search results" })

    } catch (error) {
        res.status(500).json({ error: "Error retreiving search results" })
    }
};

// access menu by ID
const getMenu = async (req, res) => {
    // try {
    const { db } = req.app.locals;
    console.log({ db })

    const { _id } = req.params;
    console.log({ _id }, ' this is id')

    const adminInfo = await db.collection(adminRestoInfoCollection).find({ _id }).toArray();


    if (adminInfo) {
        res.status(200).json({ status: 200, data: adminInfo, message: "Successfully retreived menu by ID" })
    }
    // } catch (error) {
    //     res.status(500).json({ status: 500, message: "Error retreiving menu by ID" })
    // }
};

module.exports = { addNewUser, loginUser, getSearchResults, getMenu };