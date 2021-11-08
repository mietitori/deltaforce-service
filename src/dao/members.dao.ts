import { Prisma } from ".prisma/client";
import prismaClient from "../db/default.prisma";
const addMember = async (member: Prisma.membersCreateInput) => {
  const insertedMember = await prismaClient.members.create({
    data: member
  });
  return insertedMember;
};
const list = async () => {
  return await prismaClient.members.findMany();
};

export const membersDao = {
  addMember,
  list
};
