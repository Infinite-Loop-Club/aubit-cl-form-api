const { ExtendableError } = require('./ExtendableError');

// 400 Bad Request
class NotAcceptable extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Not Modified');
    else super(m);
  }
}

exports.NotAcceptable = NotAcceptable;
