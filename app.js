require("dotenv").config();
const express = require("express");
// const { run } = require("./config");

const router = require("./routes/index");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);


module.exports = app;
