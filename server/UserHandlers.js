"use strict";

const assert = require("assert");
const fs = require("file-system")
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const bcrypt = require('bcrypt')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");
const e = require("express");

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
        // client.close();

        return res.status(400).json({ status: 400, message: "Error. Missing data from one field or more" })
    };

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FinalProject-Bootcamp");

    // check if user already exists by email
    const existingUser = await db.collection("users").findOne({ email });

    // If user exists, throw an error or else create new user
    if (existingUser !== null) {
        return res.status(400).json({ status: 400, data: existingUser, message: "That user email already exists" })
    } else {
        const hashedPassword = await hashPass(req.body.password);

        const user = { firstName, lastName, email, password: hashedPassword };

        const userData = { _id: uuidv4(), ...user };
        const newUser = await db.collection("users").insertOne(userData);

        res.status(201).json({ status: 201, data: newUser, message: "New user created and added to database" });
    }
    client.close();
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

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FinalProject-Bootcamp");

    const findUser = await db.collection("users").findOne({ email });

    if (findUser === null) {
        return res.status(400).json({ status: 400, data: findUser, message: "Unable to find user" })
    } else {
        const hashpass = findUser.password;

        const decryptPass = await bcrypt.compare(password, hashpass);

        if (decryptPass) {
            res.status(200).json({ status: 200, data: { ...decryptPass, firstName: findUser.firstName }, message: "User login successful" })
        }
    }
    client.close();
};

module.exports = { addNewUser, loginUser };