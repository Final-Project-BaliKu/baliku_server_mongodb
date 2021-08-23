// graphQL
const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");

// Redis
const redis = new Redis();

const baseUrl = "http://localhost:3000";

const typeDefs = gql`
    type User {
        _id: ID
        email: String
        password: String
        token: String
    }

    type Place {
        name: String
        locationId: String
        location: String
        latitude: String
        longitude: String
        rating: Float
        description: String
        image: String
        price: Float
    }

    type Plan {
        day: String
        places: [Place]
    }

    type Itinerary {
        _id: ID
        UserId: ID
        title: String
        checkIn: String
        checkOut: String
        plans: [Plan]
    }

    type Transaction {
        _id: ID
        UserId: ID
        date: String
        price: Float
        duration: Int
        title: String
    }

    type Query {
        users(token: String): [User]
        itineraries(token: String): [Itinerary]
        transactions(token: String): [Transaction]
        user(_id: ID): User
        itinerary(token: String, _id: ID): Itinerary
        transaction(token: String, _id: ID): Transaction
    }

    type Mutation {
        register(email: String, password: String): User
        login(email: String, password: String): User
        postItinerary(
            token: String
            UserId: ID
            title: String
            checkIn: String
            checkOut: String
            price: Float
            name: String
            locationId: String
            location: String
            latitude: String
            longitude: String
            rating: Float
            description: String
            image: String
            day: String
        ): Itinerary
        putItinerary(
            token: String
            _id: ID
            UserId: ID
            title: String
            checkIn: String
            checkOut: String
            price: Float
            name: String
            locationId: String
            location: String
            latitude: String
            longitude: String
            rating: Float
            description: String
            image: String
            day: String
        ): Itinerary
        deleteItinerary(_id: ID, token: String): String
        addTransaction(token: String, price: Float, duration: Int, title: String): Transaction
        insertPlans(
            token: String
            _id: ID
            checkIn: String
            checkOut: String
            price: Float
            name: String
            locationId: String
            location: String
            latitude: String
            longitude: String
            rating: Float
            description: String
            image: String
            day: String
        ): Itinerary
    }
`;

const resolvers = {
    Query: {
        async users(_, args) {
            // console.log(args);
            try {
                let allUsers = await redis.get("allUsers");
                if (allUsers) return JSON.parse(allUsers);
                else {
                    let response = await axios({
                        method: "GET",
                        url: `${baseUrl}/users`,
                        headers: {
                            access_token: args.token,
                        },
                    });
                    // console.log(response);
                    return response.data;
                }
            } catch (err) {
                return err;
            }
        },

        async itineraries(_, args) {
            // console.log(args);
            try {
                let allItineraries = await redis.get("allItineraries");
                if (allItineraries) return JSON.parse(allItineraries);
                else {
                    let response = await axios({
                        method: "GET",
                        url: `${baseUrl}/itineraries`,
                        headers: {
                            access_token: args.token,
                        },
                    });
                    // console.log(response);
                    return response.data;
                }
            } catch (err) {
                console.log(err);
                return err;
            }
        },

        async itinerary(_, args) {
            console.log(args);
            try {
                let response = await axios({
                    method: "GET",
                    url: `${baseUrl}/itineraries/${args._id}`,
                    headers: {
                        access_token: args.token,
                    },
                });
                console.log(response.data);
                return response.data;
            } catch (err) {
                return err;
            }
        },

        async transactions(_, args) {
            try {
                let allTransactions = await redis.get("allTransactions");
                if (allTransactions) return JSON.parse("allTransactions");
                else {
                    let response = await axios({
                        method: "GET",
                        url: `${baseUrl}/transactions`,
                        headers: {
                            access_token: args.token,
                        },
                    });
                    return response.data;
                }
            } catch (err) {
                return err;
            }
        },

        async transaction(_, args) {
            try {
                let response = await axios({
                    method: "GET",
                    url: `${baseUrl}/transactions/${args._id}`,
                    headers: {
                        access_token: args.token,
                    },
                });
                return response.data;
            } catch (err) {
                return err;
            }
        },
    },

    Mutation: {
        async register(_, args) {
            try {
                let response = await axios({
                    method: "POST",
                    url: `${baseUrl}/users/register`,
                    data: {
                        email: args.email,
                        password: args.password,
                    },
                });
                // console.log(response.data);
                return response.data.token;
            } catch (err) {
                return err;
            }
        },

        async login(_, args) {
            try {
                let response = await axios({
                    method: "POST",
                    url: `${baseUrl}/users/login`,
                    data: {
                        email: args.email,
                        password: args.password,
                    },
                });
                // console.log(response.data);
                return response.data;
            } catch (error) {
                return err;
            }
        },

        async postItinerary(_, args) {
            const newItinerary = {
                checkIn: args.checkIn,
                checkOut: args.checkOut,
                plans: [],
                title: args.title,
                // plans: {
                //     name: args.name,
                //     locationId: args.locationId,
                //     location: args.location,
                //     latitude: args.latitude,
                //     longitude: args.longitude,
                //     rating: args.rating,
                //     description: args.description,
                //     image: args.image,
                // },
                // price: +args.price,
                // day: args.day,
            };

            try {
                await redis.del("allItineraries");
                let response = await axios({
                    method: "POST",
                    url: `${baseUrl}/itineraries`,
                    headers: {
                        access_token: args.token,
                    },
                    data: newItinerary,
                });
                // newItinerary._id = response.data._id;
                // console.log(response.data);
                console.log(response.data);
                return response.data;
            } catch (err) {
                // console.log(err.message);
                return err;
            }
        },

        async putItinerary(_, args) {
            const updatedItinerary = {
                checkIn: args.checkIn,
                checkOut: args.checkOut,
                plans: {
                    name: args.name,
                    locationId: args.locationId,
                    location: args.location,
                    latitude: args.latitude,
                    longitude: args.longitude,
                    rating: args.rating,
                    description: args.description,
                    image: args.image,
                },
                price: +args.price,
                day: args.day,
            };

            try {
                await redis.del("allItineraries");
                let response = await axios({
                    method: "PUT",
                    url: `${baseUrl}/itineraries/${args._id}`,
                    headers: {
                        access_token: args.token,
                    },
                    data: updatedItinerary,
                });
                // newItinerary._id = response.data._id;
                // console.log(response.data);
                return response.data;
            } catch (err) {
                // console.log(err.message);
                return err;
            }
        },

        async deleteItinerary(_, args) {
            const id = args._id;
            try {
                await redis.del("allItineraries");
                let response = await axios({
                    method: "DELETE",
                    url: `${baseUrl}/itineraries/${id}`,
                    headers: {
                        access_token: args.token,
                    },
                });
                console.log(response.data);
                return "Iternary has been deleted";
            } catch (err) {
                return err;
            }
        },

        async addTransaction(_, args) {
            try {
                await redis.del("allTransactions");
                let response = await axios({
                    method: "POST",
                    url: `${baseUrl}/transactions`,
                    headers: {
                        access_token: args.token,
                    },
                    data: {
                        title: args.title,
                        duration: args.duration,
                        price: args.price,
                    },
                });
                return response.data;
            } catch (err) {
                return err;
            }
        },

        async insertPlans(_, args) {
            console.log(args);
            const plans = {
                places: [
                    {
                        locationId: args.locationId,
                        location: args.location,
                        latitude: args.latitude,
                        longitude: args.longitude,
                        rating: args.rating,
                        description: args.description,
                        image: args.image,
                        price: +args.price,
                    },
                ],
                day: args.day,
            };
            try {
                await redis.del("allItineraries");
                let response = await axios({
                    method: "PATCH",
                    url: `${baseUrl}/itineraries/${args._id}`,
                    headers: {
                        access_token: args.token,
                    },
                    data: plans,
                });
                // newItinerary._id = response.data._id;
                console.log(JSON.stringify(response.data, null, 2));
                return response.data;
            } catch (err) {
                // console.log(err.message);
                return err;
            }
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
