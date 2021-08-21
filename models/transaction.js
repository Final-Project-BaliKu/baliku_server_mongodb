
const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
    UserId: {
        type: String,
    },
    date: {
        type: String,
    },
    price: {
        type: String,
    },
    duration: {
        type: Number,
    },
});

module.exports = Transaction = mongoose.model("transactions", TransactionSchema);

module.exports = Transaction;