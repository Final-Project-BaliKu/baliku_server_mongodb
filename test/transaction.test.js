const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");
const connectDB = require("../config");

let access_token;
let id;

describe("transactions test case", () => {
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

    it("Login successs", async () => {
        const response = await request(app).post("/users/login").send({
            email: "test@mail.com",
            password: "test123",
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token", expect.any(String));
        access_token = response.body.token;
    });

    it("should add transaction", async () => {
        const response = await request(app).post("/transactions").set("access_token", access_token).send({
            price: 750,
            duration: 14,
            title: "Explore hidden gems",
        });
        expect(response.status).toBe(201);
        id = response.body._id;
    });

    it("should not add transaction when fields not filled", async () => {
        const response = await request(app).post("/transactions").set("access_token", access_token).send({
            price: 750,
        });
        expect(response.status).toBe(400);
    });

    it("should get all transactions by UserId login", async () => {
        const response = await request(app).get("/transactions").set("access_token", access_token).send();
        expect(response.status).toBe(200);
    });

    it("should get one detail transactions by ID", async () => {
        const response = await request(app).get(`/transactions/${id}`).set("access_token", access_token).send();

        expect(response.status).toBe(200);
    });

    it("should get one detail transactions by ID", async () => {
        const response = await request(app).get(`/transactions/61211b16b58256a43a12649f`).set("access_token", access_token).send();
        expect(response.status).toBe(404);
    });
});
