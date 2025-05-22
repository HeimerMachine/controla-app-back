import jsonwtoken, { JsonWebTokenError } from "jsonwebtoken";
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

  const decoded = jsonwtoken.verify(
    token,
    dotenv.config().parsed?.JWT_SECRET as string
  );
  if(decoded instanceof JsonWebTokenError) {
    throw new InvalidToken();
  }
  res.locals.user = {
    id: (decoded as { id: string }).id,
  };
  next();
}

export default authMiddleware;
