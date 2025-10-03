export class ApiError extends Error {
  constructor(state, message, error = {}) {
    super(message);
    this.state = state;
    this.message = message;
  }

  static BadRequest(message, errors) {
    return new ApiError(400, message, errors);
  }

  static Unauthorized() {
    return new ApiError(401, 'User is not authorized');
  }

  static NotFound() {
    return new ApiError(404, 'Not found');
  }
}
