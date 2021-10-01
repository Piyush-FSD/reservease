"use strict";

const express = require('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");

const fs = require("file-system")
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const { projectName } = require('./dbConstants');

// Handlers
const { addNewAdmin, addNewMenuImg, addNewMenuItem, deleteMenuItem, updateMenuItem, getMenuInfoById, getAllMenuInfo, getAdminEmail } = require("./AdminHandlers")
const { addNewUser, loginUser, getSearchResults, getMenu } = require('./UserHandlers');

const { Error404 } = require("./ErrorHandler");
const { adminCheckMiddleware } = require('./Middleware');
const PORT = 4000;

const app = express()
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
    .use("/", express.static(__dirname + "/"))

    // allow us to parse json body data.
    // -> set data to '50mb' to allow us to upload bigger imgs
    .use(express.json({ limit: '50mb' }))
    // accept data from forms
    .use(express.urlencoded({ limit: '50mb', extended: true }))

    // Register 
    .post("/register/admin", addNewAdmin)
    .post("/register/user", addNewUser)

    // Login (admin and user)
    .post("/login", loginUser)

    // Menu Items (Admin)
    .get("/menu/email/:email", getAdminEmail)
    .post("/menu/addImg", addNewMenuImg)
    .post("/menu/add", adminCheckMiddleware, addNewMenuItem)
    .put("/menu/update/:_id", adminCheckMiddleware, updateMenuItem)
    .delete("/menu/delete/:_id", adminCheckMiddleware, deleteMenuItem)
    .get("/menu/info", getAllMenuInfo)
    .get("/menu/:_id", getMenuInfoById)

    // Access buisness menu by ID
    // .get("/menu", getMenu)

    // Business search results
    .get("/search/results", getSearchResults)


    // ERROR Handler 404 Not Found
    .get("*", (req, res) => res.status(404).json(Error404))

async function setup() {
    const client = new MongoClient(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await client.connect();
    app.locals.db = client.db(projectName);
    app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
}
setup();