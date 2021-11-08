import { Prisma } from "@prisma/client";
import prismaClient from "../db/default.prisma";
import { cryptUtils } from "../utils/crypto";
const addUser = async (user: Prisma.usersCreateInput) => {
  const generatedPassword = cryptUtils.cryptString(user.passwd);
  user.passwd = `${generatedPassword.encoded}:${generatedPassword.salt}`;
  return await prismaClient.users.create({
    data: user
  });
};

const update = async (user: any) => {
  await prismaClient.users.update({
    data: user,
    where: {
      id: user
    }
  });
};
const list = async () => {
  return await prismaClient.users.findMany();
};
const login = async (email: string, password: string) => {
  const user = await prismaClient.users.findFirst({
    where: {
      email
    }
  });
  if (user) {
    const salt = user.passwd.split(":")[1];
    const result = cryptUtils.verifyString(password, user.passwd.split(":")[0], salt);
    if (result) return user;
  }
  return null;
};

export const usersDao = {
  addUser,
  update,
  list,
  login
};
