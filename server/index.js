"use strict";

const express = require('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

// Handlers
const { addNewAdmin, loginAdmin } = require("./AdminHandlers")
const { addNewUser, loginUser } = require('./UserHandlers');

const { Error404 } = require("./ErrorHandler");
const PORT = 4000;

express()
    .use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Methods",
            "OPTIONS, HEAD, GET, PUT, POST, DELETE"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    })
    .use(morgan("tiny"))
    .use(express.static("./server/assets"))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))

    // Register 
    .post("/register/admin", addNewAdmin)
    .post("/register/user", addNewUser)

    // Login
    .post("/login/admin", loginAdmin)
    .post("/login/user", loginUser)

    // ERROR Handler 404 Not Found
    .get("*", (req, res) => res.status(404).json(Error404))

    .listen(PORT, () => console.info(`Listening on port ${PORT}`));