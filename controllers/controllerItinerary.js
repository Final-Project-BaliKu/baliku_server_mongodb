const { ObjectId } = require("mongodb");
const Itinerary = require("../models/itinerary");

class Controller {
    static async allItineraries(req, res) {
        console.log("masuk sini");
        try {
            let response = await Itinerary.find();
            console.log(response);
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static getOne(req, res) {}

    static async postItinerary(req, res) {
        // const { _id: UserId } = req.user;

        console.log(req.user);

        // const { checkIn, checkOut, locationId, location, longitude, latitude, price, rating, description, name, image } = req.body;

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

        // try {
        //     let response = await Itinerary.findOne({ name });

        //     let newItinerary = new Itinerary({
        //         UserId,
        //         checkIn,
        //         checkOut,
        //         places: [
        //             {
        //                 name,
        //                 locationId,
        //                 location,
        //                 latitude,
        //                 longitude,
        //                 rating,
        //                 description,
        //                 image,
        //             },
        //         ],
        //         price: +price,
        //     });
        //     response = await Itinerary.create(newItinerary);
        //     return res.status(201).json(response);
        // } catch (err) {
        //     /* istanbul ignore next */
        //     if (err.message !== undefined) {
        //         return res.status(400).json({ message: err.message });
        //     } else {
        //         return res.status(500).json({ message: "Internal server error" });
        //     }
        // }
    }

    static putItinerary(req, res) {}

    static deleteItinerary(req, res) {}
}

module.exports = Controller;
