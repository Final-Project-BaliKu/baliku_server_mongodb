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
            // console.log(response);
            res.status(201).json(response);
        } catch (error) {
            /* istanbul ignore next */

            res.status(500).json(error);
        }
    }
    static async login(req, res) {
        // console.log("ENTER");
        const { email, password } = req.body;
        // console.log(email, password);
        try {
            const response = await User.findOne({ email });
            if (!response) {
                // console.log(response);
                res.status(404).json("Username and Password not match");
            } else if (bcrypt.compareSync(password, response.password)) {
                let token = jwt.sign({ id: response._id, email: response.email }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });
                // console.log(token);
                res.status(200).json({ token, email });
            } else {
                res.status(400).json("Username and Password not match");
            }
        } catch (error) {
            /* istanbul ignore next */
            res.status(500).json(error);
        }
    }
    static async getAll(req, res) {
        // console.log("ENTERING GETALL");
        try {
            const response = await User.find();
            // console.log(response);
            res.status(200).json(response);
        } catch (error) {
            /* istanbul ignore next */
            res.status(500).json(error);
        }
    }
}

module.exports = Controller;
