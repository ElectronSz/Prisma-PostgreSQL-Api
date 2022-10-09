const bcrypt = require("bcrypt");
import { db } from "../config/db";

function findUserByEmail(email: any) {
  return db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      active: true,
      createdAt: true,
      refreshTokens: true,
      profile: {
        select: {
          name: true,
          active: true,
          createdAt: true,
          permission: {
            select: {
              role: true,
              resource: true,
            },
          },
        },
      },
    },
  });
}

function createUser(user: any) {
  let { profile, name, email, password } = user;
  password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: {
      name,
      email,
      password,
      profile: {
        connect: { name: profile },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      active: true,
      createdAt: true,
      refreshTokens: true,
      profile: {
        select: {
          name: true,
          active: true,
          createdAt: true,
          permission: {
            select: {
              role: true,
              resource: true,
            },
          },
        },
      },
    },
  });
}

function findUserById(id: number) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

export { findUserByEmail, findUserById, createUser };
