import jwt, { Secret } from "jsonwebtoken";

const generateToken = (payload: any, secret: Secret, expiresIn: number) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });
  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, "abcdefgh") as jwt.JwtPayload;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
