import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { Role } from "@bir-ilm/shared";
import { config } from "../config.js";

export type AuthUser = {
  id: string;
  telegramId?: string;
  role: Role;
};

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) return next();

  try {
    req.user = jwt.verify(token, config.jwtSecret) as AuthUser;
  } catch {
    req.user = undefined;
  }

  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  optionalAuth(req, res, () => {
    if (!req.user) return res.status(401).json({ error: "Authentication required" });
    next();
  });
}

export function requireRole(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "Authentication required" });
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Insufficient permissions" });
    next();
  };
}
