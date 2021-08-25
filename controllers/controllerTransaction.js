const { ObjectId } = require("mongodb");
const Transaction = require("../models/transaction");

class Controller {
    static async allTransaction(req, res) {
        const UserId = req.user._id;
        try {
            const response = await Transaction.find({ UserId });
            res.status(200).json(response);
        } catch (error) {
            /* istanbul ignore next */
            res.status(500).json(error);
        }
    }

    static async getOneTransaction(req, res) {
        const { id } = req.params;

        try {
            let response = await Transaction.findOne({ _id: id });
            if (response) {
                return res.status(200).json(response);
            } else {
                return res.status(404).json({ message: "Transaction not found" });
            }
        } catch (err) {
            /* istanbul ignore next */
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async addTransaction(req, res) {
        const date = new Date();
        const { price, duration, title } = req.body;
        const UserId = req.user._id;
        try {
            const response = await Transaction.create({ UserId, date, price, duration, title });

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
    // static async deleteTransaction(req, res) {
    //     const { id } = req.params;
    //     try {
    //         const response = await Transaction.deleteOne({ id });
    //         console.log(response);
    //         res.status(200).json(response);
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // }
}

module.exports = Controller;
