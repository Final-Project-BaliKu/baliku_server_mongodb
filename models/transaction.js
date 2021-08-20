const { getDatabase } = require('../config')

const collection = 'Users'
class Transaction {
    static find() {
        return getDatabase().collection(collection).find().toArray()
    }
    static findOne(query) {
        return getDatabase().collection(collection).findOne(query);
    }
    static insertOne(data) {
        return getDatabase().collection(collection).insertOne(data);
    }
    static updateOne(query, newValue){
        return getDatabase().collection(collection).updateOne(query, newValue);
    }
    static deleteOne(query) {
        return getDatabase().collection(collection).deleteOne(query);
    }
    static insertMany(query){
        return getDatabase().collection(collection).insertMany(query)
    }
    static deleteMany() {
        return getDatabase().collection(collection).deleteMany({})
    }
    
}

module.exports = Transaction;