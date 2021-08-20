const { ObjectId } = require("mongodb");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateEmail } = require("../helper/validation");

class Controller {
     static async register(req, res) {
        let {email, password} = req.body;
        if(!validateEmail(email)){
            res.status(400).json('Email not Valid')
            return; 
        }
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);  
        try{
            const response= await User.create({email, password})
            res.status(201).json(response.email);
        }catch(error){
            res.status(500).json(error);
        }
    }
    static async login(req, res) {
        const { email, password } = req.body;
        try{
            const response = await User.findOne({email})
            if(!response){
                res.status(400).json('Username and Password not match')
            }else if(bcrypt.compareSync(password, response.password)){

                res.status(200).json({token, email})
            }else{
                res.status(400).json('Username and Password not match')
            }
        }catch(error){
            res.status(500).json(error)
        }
    }
    static async getAll(req, res) {
        console.log("ENTERING GETALL")
        try{
            const response = await User.find()
            console.log(response);
            res.status(200).json(response);
        }catch(error){
            res.status(500).json(error)
        }    
    }
}

module.exports = Controller;
