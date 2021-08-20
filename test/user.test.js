const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app.js')
const User = require('../models/user');
let user = {email: 'rafipratama@gmail.com', password: 'rafipratama', }

const Admin = require('../Model')

beforeAll(async () => {
    mongoose.connect("mongodb://localhost:27017/test_database", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })

})

afterAll(async () => {
    await mongoose.connection.close()
})
