import ServerError from './ServerError';

export enum ApiErrorCode {
  UNACCEPTABLE_CONTENT_TYPE = 2000,
  INVALID_INPUT = 3000,
}

interface ApiErrorJsonOutput {
  error: {
    errorCode: number;
    type: string;
    message: string;
    details: string;
    transactionId: string;
  };
}

export default class ApiError extends ServerError {
  static getMessage(errorCode: ApiErrorCode): string {
    switch (errorCode) {
      case ApiErrorCode.UNACCEPTABLE_CONTENT_TYPE:
        return 'Content-type not accepted by endpoint';
      case ApiErrorCode.INVALID_INPUT:
        return 'Invalid input';
      default:
        return 'Server error';
    }
  }

  static getStatusCode(errorCode: ApiErrorCode): number {
    switch (errorCode) {
      case ApiErrorCode.UNACCEPTABLE_CONTENT_TYPE:
      case ApiErrorCode.INVALID_INPUT:
        return 400;
      default:
        return 500;
    }
  }

  errorCode: number;

  constructor(errorCode: ApiErrorCode, details = '', transactionId = '') {
    super(details, transactionId);
    this.message = ApiError.getMessage(errorCode);
    this.errorCode = errorCode;
    this.statusCode = ApiError.getStatusCode(errorCode);
    this.name = 'ApiError';
    this.details = details;
  }

  toJson(): ApiErrorJsonOutput {
    return {
      error: {
        errorCode: this.errorCode,
        type: this.name,
        message: this.message,
        details: this.details,
        transactionId: this.transactionId,
      },
    };
  }
}
