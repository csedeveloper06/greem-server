import prisma from "../../../shared/Prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("password incorrect");
  }

  const accessToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefg",
    {
      algorithm: "HS256",
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefgh",
    {
      algorithm: "HS256",
      expiresIn: "30d",
    }
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: userData.needPasswordChange,
  };
};

export const AuthServices = {
  loginUserIntoDB,
};
