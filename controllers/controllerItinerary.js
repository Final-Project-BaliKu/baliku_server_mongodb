const { ObjectId } = require("mongodb");
const Itinerary = require("../models/itinerary");

class Controller {
    static async allItineraries(req, res) {
        // console.log("masuk sini");
        const { _id: UserId } = req.user;
        try {
            let response = await Itinerary.find({ UserId });
            // let response = await Itinerary.find();
            // console.log(response);
            res.status(200).json(response);
        } catch (err) {
            // console.log(err);
            /* istanbul ignore next */

            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getOne(req, res) {
        const { id } = req.params;
        // console.log(id);
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
        // console.log(req.user);
        const { _id: UserId } = req.user;

        console.log(req.body, 1996696896);

        const { checkIn, checkOut, title } = req.body;
        // const { checkIn, checkOut, locationId, location, longitude, latitude, price, rating, description, name, image, day, places, title } = req.body;

        // const newItinerary = {
        //     UserId,
        //     checkIn,
        //     checkOut,
        //     places: {
        //         name,
        //         locationId,
        //         location,
        //         latitude,
        //         longitude,
        //         rating,
        //         description,
        //         image,
        //     },
        //     price: +price,
        // };

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
            // console.log(response, 1231244134);
            // newItinerary._id = response._id;
            return res.status(201).json(response);
        } catch (err) {
            // console.log(err.message);
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
        // console.log(id);
        const { checkIn, checkOut, plans } = req.body;
        // console.log(checkIn, checkOut, plans);

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

                // console.log(response, 123456789);

                if (response) {
                    // console.log(response);
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
        console.log(req.body.plans, 123);
        // console.log(Object.keys(req.body).length !== 0);
        // if (Object.keys(req.body).length === 0) {
        //     return res.status(400).json({ message: "please fill plans" });
        // } else {
        try {
            let response = await Itinerary.findOneAndUpdate({ _id: id }, { plans: req.body.plans }, { new: true });
            console.log(response, 12312);

            if (response) {
                // console.log(response.plans);
                return res.status(200).json(response);
            } else {
                return res.status(404).json({ message: "Itinerary not found" });
            }
        } catch (err) {
            /* istanbul ignore next */
            return res.status(500).json({ message: "Internal server error" });
        }
        // }
    }
}

module.exports = Controller;
