import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { AuthorizationTokenNotFoundError } from "@helpers/user-errors/authorizationTokenNotFoundError";
import { InvalidToken } from "@helpers/user-errors/invalidToken";

dotenv.config();

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    throw new AuthorizationTokenNotFoundError();
  }
  
  const decoded = jwt.verify(
    token,
    dotenv.config().parsed?.JWT_SECRET as string
  );
  if(decoded instanceof jwt.JsonWebTokenError) {
    throw new InvalidToken();
  }
  res.locals = {
    decoded
  };
  next();
}

export default authMiddleware;
