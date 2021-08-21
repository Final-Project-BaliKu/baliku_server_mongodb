const request = require("supertest");
const mongoose = require("mongoose");
const Transaction = require("../models/transaction");
const User = require('../models/user')
const app = require("../app");

const access_token;
beforeAll(async () => {
    try {
        await mongoose.connection('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
    } catch (err) {
        console.log(err);
    }

    const register = await request(app).post('/users/register').send({
        email: "test@mail.com",
        password: "test12345",
    })
    console.log(register);
    const login = await request(app).post("/users/login").send({
        email: "test@mail.com",
        password: "test12345",
    });
    console.log(login);
    access_token = login.access_token
})

afterAll(async () => {
    try {
        await User.deleteMany({})
        await Transaction.deleteMany({})
        await mongoose.disconnect();
    } catch(err){
        console.log(err);
    }
})

describe("Test case Add Transaction", () => {
    it("Add Transction success ", async() =>{
        const response = await request(app).post('/transactions').send({

        })
    })
})


it("Login failed because email/password wrong", async () => {
    const response = await request(app).post("/users/login").send({
        email: "test@mail.com",
        password: "test12345",
    });
    // console.log(response);
    expect(response.status).toBe(400);
    expect(response.body).toBe("Username and Password not match");
});