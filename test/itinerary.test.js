const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");

let access_token;
let id;

describe("itineraries test case", () => {
    beforeAll(async () => {
        try {
            await mongoose.connect("mongodb://localhost:27017/test", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            });
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
        // console.log(response);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token", expect.any(String));
        access_token = response.body.token;
    });

    it("should add itinerary", async () => {
        // console.log(access_token);
        const response = await request(app)
            .post("/itineraries")
            .set("access_token", access_token)
            .send({
                // UserId: 1,
                checkIn: "10/11/2020",
                checkOut: "10/12/2020",
                places: [
                    {
                        name: "monkey forest",
                        locationId: "123321",
                        location: "Ubud",
                        latitude: "-8.5184",
                        longitude: "115.25884",
                        rating: "4",
                        description: "loremfewfwefew fwefwqfwf fewfawaewfewf ewffewfewfwe",
                        image: "https://media-cdn.tripadvisor.com/media/photo-s/03/bf/9c/95/monkey-forest.jpg",
                    },
                ],
                price: 70,
                day: "1",
            });
        // console.log(response.body);
        id = response.body._id;
        expect(response.status).toBe(201);
    });

    it("should get all itineraries", async () => {
        const response = await request(app).get("/itineraries").set("access_token", access_token).send();
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it("should get detail of one itinerary", async () => {
        // console.log(id);
        const response = await request(app).get(`/itineraries/${id}`).set("access_token", access_token).send();
        // console.log(response.body);
        expect(response.status).toBe(200);
    });

    it("should update detail of one itinerary", async () => {
        // console.log(id);
        const response = await request(app)
            .put(`/itineraries/${id}`)
            .set("access_token", access_token)
            .send({
                // UserId: 1,
                checkIn: "10/11/2020",
                checkOut: "10/12/2020",
                places: [
                    {
                        name: "monkey forest 14",
                        locationId: "123321",
                        location: "Ubud, Gianyar",
                        latitude: "-8.5184",
                        longitude: "115.25884",
                        rating: "4",
                        description: "loremfewfwefew fwefwqfwf fewfawaewfewf ewffewfewfwe",
                        image: "https://media-cdn.tripadvisor.com/media/photo-s/03/bf/9c/95/monkey-forest.jpg",
                    },
                ],
                price: 70,
                day: "1",
            });
        expect(response.status).toBe(200);
    });

    it("should able to delete one itinerary", async () => {
        // console.log(id);
        const response = await request(app).delete(`/itineraries/${id}`).set("access_token", access_token).send();
        // console.log(response.body);
        expect(response.status).toBe(200);
    });
});
