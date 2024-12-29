import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const API_HOST = process.env.API_HOST as string;

export const generateAccessToken = (payload: object): string => {
  const jwtSignOptions: SignOptions = {
    algorithm: 'HS256',
    issuer: API_HOST,
    audience: FRONTEND_URL,
    expiresIn: '10m',
  };

  return jwt.sign(payload, JWT_SECRET_KEY, jwtSignOptions);
};

export const validateJWT = (
  token: string,
  verifyOptions?: jwt.VerifyOptions,
) => {
  const jwtVerifyOptions = {
    algorithm: 'HS256',
    issuer: API_HOST,
    audience: FRONTEND_URL,
    ...verifyOptions,
  };
  const payload = jwt.verify(token, JWT_SECRET_KEY, jwtVerifyOptions) as {
    id: number;
  };
  return payload;
};
