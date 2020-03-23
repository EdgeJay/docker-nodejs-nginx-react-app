import test from 'ava';
import * as uuid from 'uuid';
import ServerError from './ServerError';

test('ServerError.toJson() should return object in expected format', t => {
  const details = 'This is a test';
  const transactionId = uuid.v4();
  const message = 'Server error';
  const serverError = new ServerError(details, transactionId);
  const json = serverError.toJson();

  t.deepEqual(json, {
    error: {
      type: 'ServerError',
      message,
      details,
      transactionId,
    },
  });
});

test('ServerError.toJson() should return object in expected format even if error code is unknown', t => {
  const details = 'This is another test';
  const transactionId = uuid.v4();
  const message = 'Server error';
  const serverError = new ServerError(details, transactionId);
  const json = serverError.toJson();

  t.deepEqual(json, {
    error: {
      type: 'ServerError',
      message,
      details,
      transactionId,
    },
  });
});

test('ServerError.toJson() should return object even if details and transaction ID are not provided', t => {
  const message = 'Server error';
  const serverError = new ServerError();
  const json = serverError.toJson();

  t.deepEqual(json, {
    error: {
      type: 'ServerError',
      details: '',
      transactionId: '',
      message,
    },
  });
});
