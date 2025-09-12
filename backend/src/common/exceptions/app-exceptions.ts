import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus,
    error?: string,
    details?: Record<string, unknown>,
  ) {
    const errorResponse: Record<string, unknown> = {
      statusCode,
      message,
      error: error || HttpStatus[statusCode],
      timestamp: new Date().toISOString(),
    };

    if (details) {
      errorResponse.details = details;
    }

    super(errorResponse, statusCode);
  }
}

export class NotFoundAppException extends BaseException {
  constructor(resource: string, id?: string | number) {
    const message = id
      ? `${resource} with id '${id}' not found`
      : `${resource} not found`;
    super(message, HttpStatus.NOT_FOUND, 'Not Found');
  }
}

export class BadRequestAppException extends BaseException {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, HttpStatus.BAD_REQUEST, 'Bad Request', details);
  }
}

export class UnauthorizedAppException extends BaseException {
  constructor(message: string = 'Unauthorized access') {
    super(message, HttpStatus.UNAUTHORIZED, 'Unauthorized');
  }
}

export class ForbiddenAppException extends BaseException {
  constructor(message: string = 'Forbidden access') {
    super(message, HttpStatus.FORBIDDEN, 'Forbidden');
  }
}

export class ConflictAppException extends BaseException {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, HttpStatus.CONFLICT, 'Conflict', details);
  }
}

export class InternalServerAppException extends BaseException {
  constructor(
    message: string = 'Internal server error',
    details?: Record<string, unknown>,
  ) {
    super(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error',
      details,
    );
  }
}

export class ValidationAppException extends BaseException {
  constructor(message: string, validationErrors?: unknown[]) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY, 'Validation Error', {
      validationErrors,
    });
  }
}
