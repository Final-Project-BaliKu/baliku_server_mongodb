const Controller = require("../controllers/controllerUser");
const router = require("express").Router();
const { authentication } = require("../middlewares/auth");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.use(authentication);
router.get("/", Controller.getAll);

module.exports = router;
