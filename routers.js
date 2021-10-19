const router = require('express').Router();

const { authenticator } = require('./auth');
const {
	handleCreateClApplication,
	handleStaffVerifyRoute,
	handleStaffLoginRoute,
	handleCheckAuth
} = require('./handler');

/**
 * @type : POST
 * @access : PUBLIC
 * @requires: -
 * @description : Fot sending otp to the correspond email
 */
router.post('/login', handleStaffLoginRoute);

/**
 * @type : POST
 * @access : PRIVATE
 * @requires: -
 * @description : For verify the otp from the email
 */
router.post('/verify', handleStaffVerifyRoute);

/**
 * @type : POST
 * @access : PRIVATE
 * @requires: -
 * @description : For storing all information to db and send email to admistrative.
 */
router.post('/apply-cl', authenticator, handleCreateClApplication);

/**
 * @type : GET
 * @access : PRIVATE
 * @requires: -
 * @description : To check validation for jwt token.
 */
router.get('/auth', authenticator, handleCheckAuth);

module.exports = router;
