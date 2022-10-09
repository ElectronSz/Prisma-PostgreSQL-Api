import express, { Request, Response, NextFunction } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
import { createUser, findUserByEmail, findUserById } from "../services/user";
import { generateTokens } from "../utils/jwt";
import {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
} from "../services/auth";

import { hashToken } from "../utils/hashToken";

const authRoutes = express.Router();

authRoutes.post(
  "/register",
  async (req: Request<never>, res: Response, next: NextFunction) => {
    try {
      let { profile, name, email, password } = req.body;
      if (!email || !password) {
        res
          .status(400)
          .json({ message: "You must provide an email and a password." });
      }

      const existingUser = await findUserByEmail(email);

      if (existingUser) {
        res.status(400).json({ message: "Email already in use." });
      }

      const user: any = await createUser({
        email,
        password,
        profile,
        name,
      });
      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(user, jti);
      await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

      res.status(200).json({
        accessToken,
        refreshToken,
        user,
      });
    } catch (err) {
      next(err);
    }
  }
);

authRoutes.post(
  "/login",
  async (req: Request<never>, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res
          .status(400)
          .json({ message: "You must provide an email and a password." });
      }

      const existingUser: any | null = await findUserByEmail(email);

      if (!existingUser) {
        res.status(403).json({ message: "Invalid login credentials." });
      }

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!validPassword) {
        res.status(403).json({ message: "Invalid login credentials." });
      }

      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(existingUser, jti);
      await addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: existingUser.id,
      });

      res.json({
        accessToken,
        refreshToken,
        existingUser,
      });
    } catch (err) {
      next(err);
    }
  }
);

authRoutes.post(
  "/refreshToken",
  async (req: Request<never>, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({ message: "Missing refresh token." });
      }
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const savedRefreshToken: any | null = await findRefreshTokenById(
        payload.jti
      );

      if (!savedRefreshToken || savedRefreshToken.revoked === true) {
        res.status(401).json({ message: "Unauthorized" });
      }

      const hashedToken = hashToken(refreshToken);
      if (hashedToken !== savedRefreshToken.hashedToken) {
        res.status(401).json({ message: "Unauthorized" });
      }

      const user: any | null = await findUserById(payload.userId);
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
      }

      await deleteRefreshToken(savedRefreshToken.id);
      const jti = uuidv4();
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(
        user,
        jti
      );
      await addRefreshTokenToWhitelist({
        jti,
        refreshToken: newRefreshToken,
        userId: user.id,
      });

      res.json({
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (err) {
      next(err);
    }
  }
);

authRoutes.post(
  "/revokeRefreshTokens",
  async (req: Request<never>, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      await revokeTokens(userId);
      res.json({ message: `Tokens revoked for user with id #${userId}` });
    } catch (err) {
      next(err);
    }
  }
);

export { authRoutes };
