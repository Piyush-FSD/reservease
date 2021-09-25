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
    const { busName, firstName, lastName, email, address, postalCode, province, country } = req.body;
    let { password, confPassword } = req.body;

    // if any of the field below are not entered -> status 400
    if (!req.body ||
        !busName ||
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confPassword ||
        !address ||
        !postalCode ||
        !province ||
        !country ||
        !email.includes('@')) {
        client.close();

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
        const hashedConfPassword = await hashPass(req.body.confPassword)

        const admin = { busName, firstName, lastName, email, password: hashedPassword, confpassword: hashedConfPassword, address, postalCode, province, country };

        const adminData = { _id: uuidv4(), ...admin };
        const newAdmin = await db.collection("admins").insertOne(adminData);

        res.status(201).json({ status: 201, data: newAdmin, message: "New admin created and added to database" });
    }
    client.close();
};


module.exports = { addNewAdmin }