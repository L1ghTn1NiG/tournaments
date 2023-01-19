const Router = require('express').Router;
const router = Router();

const admin = require('../middlewares/is-admin');

const UserController = require('../controllers/user-controller');
const rolesRouter = require('./role-routes');

const validator = require('../middlewares/validator');
const schemas = require('../schemas/user-schemas');

router.use('/roles/', admin, rolesRouter);

router.get('/', validator(schemas.getList), UserController.getList);
router.post('/', admin, validator(schemas.create), UserController.create);

// Me operations is like :id operations, but applies to current authenticated user.
// As you can see in UserController, getMe and updateMe calls getByID and updateByID inside themselves.
router.get('/me', validator(schemas.getMe), UserController.getMe);
router.put('/me', validator(schemas.updateMe), UserController.updateMe);

router.get('/:id', validator(schemas.getByID), UserController.getByID);
router.put(
    '/:id',
    admin,
    validator(schemas.updateByID),
    UserController.updateByID,
);

router.put(
    '/:id/roles/makeAdmin',
    admin,
    validator(schemas.giveAdminRoleByID),
    UserController.giveAdminRoleByID,
);
router.put(
    '/:id/roles/makeUser',
    admin,
    validator(schemas.revokeAdminRoleByID),
    UserController.revokeAdminRoleByID,
);

module.exports = router;
