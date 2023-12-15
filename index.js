const express = require("express");
const app = express();
const nocache = require("nocache");
const ejs = require("ejs");
const Router = require("./controller/mainController");
const bodyParser = require("body-parser");
const session = require('express-session');



app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/controller", express.static("controller"))
app.use(express.json());

app.use(session({
    secret: 'shaheer091',
    resave: false,
    saveUninitialized: true,
}));

app.use("/", Router);

app.use(nocache());


const port = 3900;
app.listen(port, () => console.log("server started"));
