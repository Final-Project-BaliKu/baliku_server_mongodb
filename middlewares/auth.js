const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ObjectId } = require("mongodb");

async function authentication(req, res, next) {
    const { access_token } = req.headers;
    if (access_token) {
        try {
            const token = jwt.verify(access_token, process.env.SECRET_KEY);
            /* istanbul ignore else */
            if (token) {
                await User.findOne({ _id: ObjectId(token.id) })
                    .then((data) => {
                        if (data) {
                            req.user = { _id: token.id, email: data.email };
                            next();
                        } else {
                            res.status(400).json("Invalid Authentication, Please login again !");
                        }
                    })
                    .catch((err) => {
                        /* istanbul ignore next */
                        res.status(500).json(err);
                    });
            } else {
                /* istanbul ignore next */
                res.status(400).json("Please login First");
            }
        } catch (error) {
            /* istanbul ignore next */
            res.status(400).json(error);
        }
    } else {
        res.status(400).json("Please login First");
    }
}

module.exports = { authentication };
