const Router = require('express').Router;
const router = Router();

const AuthController = require('../controllers/auth-controller');

const validator = require('../middlewares/validator');
const schemas = require('../schemas/auth-schemas');

router.post('/register', validator(schemas.register), AuthController.register);
router.get('/login', validator(schemas.login), AuthController.login);
router.get('/logout', validator(schemas.logout), AuthController.logout);

module.exports = router;
