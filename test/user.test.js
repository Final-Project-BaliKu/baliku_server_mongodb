// const mongoose = require("mongoose");
// const request = require("supertest");
// const app = require("../app.js");
// const User = require("../models/user");
// let user = { email: "rafipratama@gmail.com", password: "rafipratama" };

// const Admin = require("../Model");

// beforeAll(async () => {
//     mongoose.connect("mongodb://localhost:27017/test_database", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//     });
// });

// afterAll(async () => {
//     await mongoose.connection.close()
// })

// test("should 1+1 equal 2", () => {
//     expect(1 + 1).toEqual(2);
// });

const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../models/user");
const app = require("../app");
const connectDB = require("../config");

let access_token;

describe("Test case user", () => {
    beforeAll(async () => {
        try {
            // await mongoose.connect("mongodb://localhost:27017/test", {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            //     useCreateIndex: true,
            //     useFindAndModify: false,
            // });

            await connectDB("mongodb://localhost:27017/test");
        } catch (err) {
            console.log(err);
        }
    });

    afterAll(async () => {
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteMany();
        }
        await mongoose.disconnect();
    });

    it("should be able to register a user", async () => {
        const response = await request(app).post("/users/register").send({
            email: "test@mail.com",
            password: "test123",
        });
        expect(response.status).toBe(201);
    });

    it("should not able to register email empty ", async () => {
        const response = await request(app).post("/users/register").send({
            password: "test123",
        });
        expect(response.status).toBe(400);
    });

    it("email must be in valid standard", async () => {
        const response = await request(app).post("/users/register").send({
            email: "testail.com",
            password: "test123",
        });
        expect(response.status).toBe(400);
    });

    it("Login successs", async () => {
        const response = await request(app).post("/users/login").send({
            email: "test@mail.com",
            password: "test123",
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token", expect.any(String));
        access_token = response.body.token;
    });

    it("Login failed because email/password wrong", async () => {
        const response = await request(app).post("/users/login").send({
            email: "test@mail.com",
            password: "test12345",
        });
        expect(response.status).toBe(401);
        expect(response.body).toBe("email and Password not match");
    });

    it("Login failed because email not registered", async () => {
        const response = await request(app).post("/users/login").send({
            email: "test12345@mail.com",
            password: "test123",
        });
        expect(response.status).toBe(404);
        expect(response.body).toBe("email not registered");
    });

    it("Get all user", async () => {
        const response = await request(app).get("/users").set("access_token", access_token).send();

        expect(response.status).toBe(200);
    });

    it("Get all user", async () => {
        const response = await request(app).get("/users").set("access_token", "access_token").send();

        expect(response.status).toBe(400);
    });

    it("Get all user", async () => {
        const response = await request(app).get("/users").send();

        expect(response.status).toBe(400);
    });

    it("should not able to register a user unique", async () => {
        const response = await request(app).post("/users/register").send({
            email: "test@mail.com",
            password: "test123",
        });
        expect(response.status).toBe(400);
    });
});
