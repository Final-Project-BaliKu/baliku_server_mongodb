// const { MongoClient } = require('mongodb');
// const uri = 'mongodb://localhost:27017'
// const client = new MongoClient(uri)

// let database = null
// async function run() {
//     try {
//         await client.connect()
//         console.log('CONNECTION SUCCESSS');
//         database = client.db('baliku');
//     } finally {
//         //await client.close()
//     }
// }
// function getDatabase() {
//     return database;
// }

// module.exports = {
//     run,
//     getDatabase,
// }

const mongoose = require("mongoose");
const url = "";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/baliku", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
    } catch (err) {
        /* istanbul ignore next */
        console.log(err.message);
    }
};

module.exports = connectDB;
