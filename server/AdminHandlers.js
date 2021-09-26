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
        // client.close();

        return res.status(400).json({ status: 400, message: "Error. Missing data from one field or more" })
    };

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FinalProject-Bootcamp");

    // check if admin already exists by email
    const existingAdmin = await db.collection("admins").findOne({ email });

    // If admin exists, throw an error or else create new admin
    if (existingAdmin !== null) {
        return res.status(400).json({ status: 400, data: existingAdmin, message: "That admin email already exists" })
    } else {
        const hashedPassword = await hashPass(req.body.password);

        const admin = { busName, firstName, lastName, email, password: hashedPassword, address, postalCode, province, country, phone };

        const adminData = { _id: uuidv4(), ...admin };
        const newAdmin = await db.collection("admins").insertOne(adminData);

        res.status(201).json({ status: 201, data: newAdmin, message: "New admin created and added to database" });
    }
    client.close();
};

// user login based on email
const loginAdmin = async (req, res) => {
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

    const findAdmin = await db.collection("admins").findOne({ email });

    if (findAdmin === null) {
        return res.status(400).json({ status: 400, data: findAdmin, message: "Unable to find admin" })
    } else {
        // access hashed password from database
        const hashpass = findAdmin.password;

        // compare pass from req.body and encrypted database password
        const decryptPass = await bcrypt.compare(password, hashpass);

        if (decryptPass) {
            res.status(200).json({ status: 200, data: { ...decryptPass, busName: findAdmin.busName }, message: "Admin login successful" })
        }
    }
    client.close();
};

module.exports = { addNewAdmin, loginAdmin }