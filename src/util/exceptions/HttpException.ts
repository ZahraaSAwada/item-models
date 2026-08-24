// src/util/exceptions/HttpException.ts
export class HttpException extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "HttpException";
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(
    message: string = "Internal Server Error",
    details?: Record<string, unknown>
  ) {
    super(500, message, details);
    this.name = "InternalServerErrorException";
  }
}