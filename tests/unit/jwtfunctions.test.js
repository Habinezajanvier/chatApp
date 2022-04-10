import mongoose from 'mongoose';
import {
  decode,
  encode,
} from '../../src/helpers/jwtFunctions';

describe('Testing JWT functions', () => {
  const payload = {
    _id: mongoose.Types.ObjectId().toHexString(),
    fullname: 'John Doe',
    email: 'test@email.com',
  };
  let token;

  it('Should return a token', () => {
    token = encode(payload);
    expect(token).toMatch(
      /(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/
    );
  });

  it('Should decode the payload from token', () => {
    const data = decode(token);
    expect(data).toHaveProperty('_id', payload._id);
    expect(data).toHaveProperty('email', payload.email);
  });
});
