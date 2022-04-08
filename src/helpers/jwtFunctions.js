import jwt from 'jsonwebtoken';
import config from '../../config/config';

const {
  app: { secretKey },
} = config;

export const encode = (payload) => {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: '1d',
  });
  return token;
};

export const decode = (token) => {
  const payload = jwt.verify(token, secretKey);
  return payload;
};
