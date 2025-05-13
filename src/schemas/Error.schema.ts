import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { Response } from "express";

export function httpError({ //transform this into a error middleware handler
  res,
  message,
  code,
  cause,
}: {
  res: Response;
  message: string;
  code: StatusCodes;
  cause?: string;
}) {
  return res.status(code).send({
    message,
    cause,
  });
}

export const httpErrorSchema = z.object({
  message: z.string(),
  cause: z.string().optional(),
});

export const errorResponses = {
  404: httpErrorSchema,
  400: httpErrorSchema,
  401: httpErrorSchema,
  500: httpErrorSchema,
};