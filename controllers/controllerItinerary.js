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

    static postItinerary(req, res) {}

    static putItinerary(req, res) {}

    static deleteItinerary(req, res) {}
}

module.exports = Controller;
