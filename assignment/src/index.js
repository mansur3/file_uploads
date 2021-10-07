const express = require("express");
const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.set("view engine", "ejs");


const userController = require("./controllers/user.controller"); 
const galleryController = require("./controllers/gallery.controller");


app.use("/user", userController);
app.use("/gallery", galleryController);


module.exports = app;