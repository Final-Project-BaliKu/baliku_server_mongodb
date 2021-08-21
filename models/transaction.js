const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

module.exports = Transaction = mongoose.model("transactions", TransactionSchema);
