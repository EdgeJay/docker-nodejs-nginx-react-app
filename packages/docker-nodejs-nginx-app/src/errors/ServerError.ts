interface ErrorJsonOutput {
  error: {
    type: string;
    message: string;
    details: string;
    transactionId: string;
  };
}

export default class ServerError extends Error {
  details: string;

  statusCode: number;

  transactionId: string;

  constructor(details = '', transactionId = '') {
    super('Server error');
    this.name = 'ServerError';
    this.details = details;
    this.statusCode = 500;
    this.transactionId = transactionId;
  }

  toJson(): ErrorJsonOutput {
    return {
      error: {
        type: this.name,
        message: this.message,
        details: this.details,
        transactionId: this.transactionId,
      },
    };
  }
}
