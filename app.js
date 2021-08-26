require("dotenv").config();
const express = require("express");
// const { run } = require("./config");
// const connectDB = require("./config");
const router = require("./routes/index");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
// app.use(cors());
// connectDB();

module.exports = app;
