const { ObjectId } = require("mongodb");
const Itinerary = require("../models/itinerary");

class Controller {
    static async allItineraries(req, res) {
        const { _id: UserId } = req.user;
        try {
            let response = await Itinerary.find({ UserId });
            res.status(200).json(response);
        } catch (err) {
            /* istanbul ignore next */

            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getOne(req, res) {
        const { id } = req.params;
        try {
            let response = await Itinerary.findOne({ _id: id });
            if (response) {
                return res.status(200).json(response);
            } else {
                return res.status(404).json({ message: "Itinerary not found" });
            }
        } catch (err) {
            /* istanbul ignore next */
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async postItinerary(req, res) {
        const { _id: UserId } = req.user;

        const { checkIn, checkOut, title } = req.body;

        try {
            let response;

            let newItinerary = new Itinerary({
                UserId,
                title,
                checkIn,
                checkOut,
                plans: "",
            });
            response = await newItinerary.save();
            return res.status(201).json(response);
        } catch (err) {
            /* istanbul ignore next */
            if (err.message !== undefined) {
                return res.status(400).json({ message: err.message });
            } else {
                /* istanbul ignore next */
                return res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    static async putItinerary(req, res) {
        const { _id: UserId } = req.user;
        const id = req.params.id;
        const { checkIn, checkOut, plans } = req.body;

        if (!checkIn || !checkOut || !plans) {
            return res.status(400).json({ message: "please fill all fields" });
        } else {
            const updatedItinerary = {
                UserId,
                checkIn,
                checkOut,
                plans,
            };

            try {
                let response = await Itinerary.findOneAndUpdate({ _id: id }, updatedItinerary, {
                    new: true,
                });
                if (response) {
                    return res.status(200).json(response);
                } else {
                    return res.status(404).json({ message: "Itinerary not found" });
                }
            } catch (err) {
                /* istanbul ignore next */
                return res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    static async deleteItinerary(req, res) {
        const id = req.params.id;
        try {
            let response = await Itinerary.findOne({ _id: id });
            if (response) {
                response = await Itinerary.deleteOne({ _id: id });
                res.status(200).json(response);
            } else {
                return res.status(404).json({ message: "Itinerary not found" });
            }
        } catch (err) {
            /* istanbul ignore next */
            if (err.message !== undefined) {
                return res.status(400).json({ message: err.message });
            } else {
                return res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    static async insertPlans(req, res) {
        const id = req.params.id;

        if (!req.body.plans) {
            res.status(400).json({ message: "Plans must be filled" });
        } else {
            try {
                let response = await Itinerary.findOneAndUpdate({ _id: id }, { plans: req.body.plans }, { new: true });

                if (response) {
                    return res.status(200).json(response);
                } else {
                    return res.status(404).json({ message: "Itinerary not found" });
                }
            } catch (err) {
                /* istanbul ignore next */
                return res.status(500).json({ message: "Internal server error" });
            }
        }

        // }
    }
}

module.exports = Controller;
