// const { getDatabase } = require("../config");

// const collection = "Itineraries";
// class Itinerary {
//     static find(query) {
//         return getDatabase().collection(collection).find(query).toArray();
//     }
//     static findOne(query) {
//         return getDatabase().collection(collection).findOne(query);
//     }
//     static insertOne(data) {
//         return getDatabase().collection(collection).insertOne(data);
//     }
//     static updateOne(query, newValue) {
//         console.log(newValue, 321);
//         return getDatabase().collection(collection).updateOne(query, { $set: newValue });
//     }
//     static deleteOne(query) {
//         return getDatabase().collection(collection).deleteOne(query);
//     }
//     static insertMany(query) {
//         return getDatabase().collection(collection).insertMany(query);
//     }
//     static deleteMany() {
//         return getDatabase().collection(collection).deleteMany({});
//     }
// }

// module.exports = Itinerary;

const mongoose = require("mongoose");
const ItinerarySchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true,
    },
    checkIn: {
        type: String,
        required: true,
    },
    checkOut: {
        type: String,
        required: true,
    },
    plans: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    // price: {
    //     type: Number,
    // },
    // day: {
    //     type: String,
    // },
});

module.exports = Itinerary = mongoose.model("itineraries", ItinerarySchema);
