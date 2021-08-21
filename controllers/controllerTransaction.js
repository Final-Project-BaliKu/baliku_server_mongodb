const { ObjectId } = require('mongodb');
const Transaction = require('../models/transaction');


class Controller {
    static async allTransaction(req, res){
        const UserId = req.user._id
        console.log(UserId);
        try{
            const response = await Transaction.find({UserId})
            console.log(response);
            res.status(200).json(response);
        }catch(error){
            res.status(500).json(error);
        }
    }
    static async addTransaction(req, res){
        const date = new Date();
        const {price, duration} = req.body;
        const UserId = req.user._id
        try{
            const response = await Transaction.create({UserId, date, price, duration})
            console.log(response);
            res.status(201).json(response);
        }catch(error){
            res.status(500).json(error)
        }
    }
    static async deleteTransaction(req, res){
        const {id} = req.params
        try{
            const response = await Transaction.deleteOne({id})
            console.log(response);
            res.status(200).json(response);
        }catch(error) {
            res.status(500).json(error);
        }
    }
}

module.exports=Controller;