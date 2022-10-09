import { Response, Request, NextFunction } from "express";
const jwt = require("jsonwebtoken");

function isAuthenticated(
  req: Request<any, any, any>,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "🚫 Un-Authorized 🚫" });
  } else {
    try {
      const token = authorization.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.params.payload = payload;
    } catch (err: Object | any) {
      res.status(401).json({ message: "🚫 Un-Authorized 🚫" });
      if (err.name === "TokenExpiredError") {
        res.status(401).json({ message: "🚫 Un-Authorized 🚫" });
      }
      res.status(401).json({ message: "🚫 Un-Authorized 🚫" });
    }

    return next();
  }
}

export { isAuthenticated };
