import jsonwtoken, { JsonWebTokenError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();


async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const decoded = jsonwtoken.verify(token, dotenv.config().parsed?.JWT_SECRET as string);
    res.locals.user = {
        id: (decoded as { id: string }).id,
    };
    next();
  } catch (error: JsonWebTokenError | unknown) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    if (error instanceof Error) {
      return res.status(401).json({ message: error.message });
    }
    if(error)
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

export default authMiddleware;