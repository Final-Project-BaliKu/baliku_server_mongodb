const { ObjectId } = require("mongodb");
const Itinerary = require("../models/itinerary");

class Controller {
    static async allItineraries(req, res) {
        // console.log("masuk sini");
        const { _id: UserId } = req.user;
        try {
            let response = await Itinerary.find({ UserId });
            // console.log(response);
            res.status(200).json(response);
        } catch (err) {
            // console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getOne(req, res) {
        const { id } = req.params;
        // console.log(id);
        try {
            let response = await Itinerary.find({ _id: id });
            // console.log(response);
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
        // console.log(req.user);

        const { checkIn, checkOut, locationId, location, longitude, latitude, price, rating, description, name, image, day } = req.body;

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
            let response = await Itinerary.findOne({ name });

            let newItinerary = new Itinerary({
                UserId,
                checkIn,
                checkOut,
                places: [
                    {
                        name,
                        locationId,
                        location,
                        latitude,
                        longitude,
                        rating,
                        description,
                        image,
                    },
                ],
                price: +price,
                day,
            });
            response = await newItinerary.save();
            // console.log(response);
            return res.status(201).json(response);
        } catch (err) {
            /* istanbul ignore next */
            console.log(err.message);
            if (err.message !== undefined) {
                return res.status(400).json({ message: err.message });
            } else {
                return res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    static async putItinerary(req, res) {
        const { _id: UserId } = req.user;
        const id = req.params.id;
        const { checkIn, checkOut, locationId, location, longitude, latitude, price, rating, description, name, image, day } = req.body;

        const updatedItinerary = {
            UserId,
            checkIn,
            checkOut,
            places: {
                name,
                locationId,
                location,
                latitude,
                longitude,
                rating,
                description,
                image,
            },
            price: +price,
            day: +day,
        };

        try {
            let response = await Itinerary.findOneAndUpdate(id, updatedItinerary, {
                new: true,
            });

            if (response) {
                return res.status(200).json(response);
            } else {
                return res.status(404).json({ message: "Itinerary not found" });
            }
        } catch (err) {
            if (err.message !== undefined) {
                return res.status(400).json({ message: err.message });
            } else {
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
                /* istanbul ignore next */
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
}

module.exports = Controller;
