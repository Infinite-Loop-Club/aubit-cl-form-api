const { ExtendableError } = require('./ExtendableError');

// 500 Internal Server Error
class SqlError extends ExtendableError {
	constructor(m) {
		if (arguments.length === 0) super('sql error');
		else super(m);
	}
}

exports.SqlError = SqlError;
