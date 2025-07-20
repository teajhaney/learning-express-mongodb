class AppError extends Error {
  constructor(stattusCode, message) {
    super(message);
    this.statusCode = stattusCode;
  }
}
module.exports = AppError;
