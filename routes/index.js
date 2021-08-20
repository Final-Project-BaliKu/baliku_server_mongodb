const router = require("express").Router();

const userRouter = require("./user");
const itineraryRouter = require("./itinerary");
const transactionRouter = require("./transaction");

router.use("/users", userRouter);
router.use("/itineraries", itineraryRouter);
router.use("/transaction", transactionRouter);

module.exports = router;
