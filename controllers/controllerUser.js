const { ObjectId } = require("mongodb");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateEmail } = require("../helper/validation");

class Controller {
    static async register(req, res) {
        let { email, password } = req.body;
        if (!validateEmail(email)) {
            res.status(400).json("Email not Valid");
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        try {
            const response = await User.create({ email, password });
            res.status(201).json(response);
        } catch (err) {
            /* istanbul ignore else */
            if (err.message !== undefined) {
                res.status(400).json(err.message);
            } else {
                res.status(500).json(err);
            }
        }
    }
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const response = await User.findOne({ email });
            if (!response) {
                res.status(404).json("email not registered");
            } else if (bcrypt.compareSync(password, response.password)) {
                let token = jwt.sign({ id: response._id, email: response.email }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });

                res.status(200).json({ token, email });
            } else {
                res.status(401).json("email and Password not match");
            }
        } catch (error) {
            /* istanbul ignore next */
            res.status(500).json(error);
        }
    }
    static async getAll(req, res) {
        try {
            const response = await User.find();
            res.status(200).json(response);
        } catch (error) {
            /* istanbul ignore next */
            res.status(500).json(error);
        }
    }
}

module.exports = Controller;
