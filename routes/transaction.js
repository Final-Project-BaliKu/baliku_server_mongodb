const Controller = require('../controllers/controllerTransaction');
const router = require('express').Router()
const {authentication} = require('../middlewares/auth')

router.use(authentication);
router.get('/', Controller.allTransaction);
router.post('/', Controller.addTransaction);
router.delete('/:id', Controller.deleteTransaction);


module.exports = router;