const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app.js')
const User = require('../models/user');
const bcrypt = require('bcrypt');
// mongoose.connect("mongodb://localhost:27017/test", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
// })
beforeAll(async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
    }catch(err) {
        
    }
    await User.deleteMany({});
   const response = await User.create({email: 'deria@long.com', password: '$2b$10$DBoYGucy9nAXc.EZs6TNfOlEvQM3p1ItnEUMriCJ.Q7ULR4HV0KWO' })
   console.log(response)
})
afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close()
})
let user = {email: 'darlian@gmail.com', password:'lastnia'}
describe("POST Regis Success", () => {
    test('Should POST [success port]',(done) => {
         request(app)
        .post('/users/register')
        .send(user)
        .then((response) => {
            expect(response.status).toBe(201);
            expect(response.body).not.toHaveProperty('password')
            done()
        })
    })
})

describe("POST Login Success", () => {
    test('Should POST [success port]', (done) => {
        jest.setTimeout(5000);
        request(app)
        .post('/users/login')
        .send({email: 'deria@long.com', password: 'longnia' })
        .then((response) => {
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("access_token", expect.any(String))
            expect(response.body).not.toHaveProperty('password')
            done()
        })
    })

    // test('should POST [error port]', (done) =>{
    //     request(app)
    //     .post('/uses/login')
    //     .send({email:})
    // })
})


