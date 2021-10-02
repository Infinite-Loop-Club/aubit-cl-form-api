const router = require('express').Router();

const { handleCreateClApplication } = require('./handler');

/**
 * @type : POST
 * @access : PRIVATE
 * @requires: -
 * @description : For storing all information to db and send email to admistrative.
 */
router.post('/apply-cl', handleCreateClApplication);

module.exports = router;
