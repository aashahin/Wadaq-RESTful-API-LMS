class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = `${statusCode}` || 500;
    this.status = `${statusCode}`.startsWith(4) ? "Unsuccessful" : "Error";
  }
}
module.exports = ErrorHandler;
