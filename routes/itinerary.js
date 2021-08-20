const Controller = require("../controllers/controllerItinerary");
const router = require("express").Router();
const { authentication } = require("../middlewares/auth");

// router.use(authentication);

router.get("/", Controller.allItineraries);

// get one where user login
router.get("/:id", Controller.getOne);

router.post("/", Controller.postItinerary);
router.put("/:id", Controller.putItinerary);
router.delete("/:id", Controller.deleteItinerary);

module.exports = router;
