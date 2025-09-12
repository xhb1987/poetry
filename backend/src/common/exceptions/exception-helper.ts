import {
  NotFoundAppException,
  BadRequestAppException,
  ValidationAppException,
  ConflictAppException,
} from './app-exceptions';

export class ExceptionHelper {
  // Resource not found helpers
  static notFound(
    resource: string,
    id?: string | number,
  ): NotFoundAppException {
    return new NotFoundAppException(resource, id);
  }

  static poetryNotFound(id?: string | number): NotFoundAppException {
    return new NotFoundAppException('Poetry', id);
  }

  static userNotFound(id?: string | number): NotFoundAppException {
    return new NotFoundAppException('User', id);
  }

  // Validation helpers
  static validationError(
    message: string,
    errors?: unknown[],
  ): ValidationAppException {
    return new ValidationAppException(message, errors);
  }

  static invalidInput(field: string, value?: unknown): BadRequestAppException {
    return new BadRequestAppException(`Invalid input for field: ${field}`, {
      field,
      value,
    });
  }

  static invalidSearchQuery(): BadRequestAppException {
    return new BadRequestAppException(
      'Search query is required and cannot be empty',
    );
  }

  // Conflict helpers
  static alreadyExists(
    resource: string,
    field: string,
    value: string | number,
  ): ConflictAppException {
    return new ConflictAppException(
      `${resource} with ${field} '${value}' already exists`,
      { resource, field, value },
    );
  }

  // Common business logic exceptions
  static duplicatePoetry(title: string): ConflictAppException {
    return new ConflictAppException(
      `Poetry with title '${title}' already exists`,
      { title },
    );
  }

  static emptyPoetryCollection(): NotFoundAppException {
    return new NotFoundAppException('No poetry available in the collection');
  }
}
