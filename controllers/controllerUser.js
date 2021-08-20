const { ObjectId } = require("mongodb");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateEmail } = require("../helper/validation");

class Controller {
    static register(req, res) {
        console.log("register", 342432);
        let { email, password } = req.body;
        if (!validateEmail(email)) {
            res.status(400).json("Email not Valid");
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        User.insertOne({ email, password })
            .then((data) => {
                console.log(data);
                res.status(201).json({ _id: ObjectId(data.insertedId), email });
            })
            .catch((err) => {
                res.status(500).json(err.message);
            });
    }
    static login(req, res) {
        const { email, password } = req.body;
        User.findOne({ email: email })
            .then((data) => {
                if (!data) {
                    res.status(400).json("Username and Password not match");
                } else if (bcrypt.compareSync(password, data.password)) {
                    let token = jwt.sign({ id: data._id, email: data.email }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });
                    res.status(200).json({ token, email });
                } else {
                    res.status(400).json("Username and Password not match");
                }
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }
    static getAll(req, res) {
        User.find()
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }
}

module.exports = Controller;
