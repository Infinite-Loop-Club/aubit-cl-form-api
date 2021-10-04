// * Import needed stuffs
const jwt = require('jsonwebtoken');

// TODO: Extract the env values
const { JWT_ACCESS_TOKEN } = process.env;

/**
 * @desc To generate the token for accessing our webapp
 *
 *@param object - This is contains user encryption informations. ex. roleId, email.
 *@param exp - Set expiration time if you want.
 */
exports.getAccessToken = async (config, exp) =>
	jwt.sign(config, JWT_ACCESS_TOKEN || '', { expiresIn: exp });

/**
 *
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function for move on through middleware
 */
exports.authenticator = (req, res, next) => {
	// ? Get the auth header from request payload
	const authHeader = req.headers.authorization;

	// ! check if the header present or not
	if (!authHeader)
		return res
			.status(400)
			.json({ result: false, error: 'Forbidden', message: 'Header is missing.' });

	// TODO: extract the token from header
	const token = authHeader.split(' ')[1];

	if (!token)
		return res
			.status(400)
			.json({ result: false, error: 'Forbidden', message: 'Token is missing.' });

	// * Check if the token is valid or not
	jwt.verify(token, JWT_ACCESS_TOKEN || '', (err, user) => {
		// ! If not throw error
		if (err) return res.status(403).json({ result: false, error: 'Unauthorized', message: err });

		// TODO: Store into users object
		req.user = user;

		// TODO: move on to next middleware functions
		return next();
	});
};
