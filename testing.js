// let data = "2021-08-16";

// console.log(+data.slice(8, 10)); // day
// console.log(+data.slice(0, 4)); // month
// console.log(+data.slice(5, 7)); // year

let data = new Date();
console.log(data.toLocaleString("default", { month: "long" }));

// data.toDateString;

// {
//     _id : ObjectId("6124640820c29e4687ab8338"),
//     UserId : "6123c2302cd0862ee16d9ffc",
//     title : "Uluwatu Bali",
//     checkIn : "2021-08-06",
//     checkOut : "2021-08-07",
//     plans : [
//         {
//         day: 1,
//         places: [
//             {
//                 name: data.name,
//                 locationId: data.location_id,
//                 location: data.address,
//                 latitude: data.latitude,
//                 longitude: data.longitude,
//                 rating: data.rating,
//                 description: data.description,
//                 image: data.photo.images.medium.url,
//                 ranking: data.ranking
//             },
//             {
//                 name: data.name,
//                 locationId: data.location_id,
//                 location: data.address,
//                 latitude: data.latitude,
//                 longitude: data.longitude,
//                 rating: data.rating,
//                 description: data.description,
//                 image: data.photo.images.medium.url,
//                 ranking: data.ranking
//             },

//         ]
//     },
//     {
//         day: 2,
//         places: [
//             {
//                 name: data.name,
//                 locationId: data.location_id,
//                 location: data.address,
//                 latitude: data.latitude,
//                 longitude: data.longitude,
//                 rating: data.rating,
//                 description: data.description,
//                 image: data.photo.images.medium.url,
//                 ranking: data.ranking
//             },
//             {
//                 name: data.name,
//                 locationId: data.location_id,
//                 location: data.address,
//                 latitude: data.latitude,
//                 longitude: data.longitude,
//                 rating: data.rating,
//                 description: data.description,
//                 image: data.photo.images.medium.url,
//                 ranking: data.ranking
//             },

//         ]
//     },
//     ]
// }
