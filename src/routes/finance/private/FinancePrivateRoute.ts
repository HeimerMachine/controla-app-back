import { Request, Response, Router } from "express";
import authMiddleware from "../../../middleware/authMiddleware";
import FinanceController from "@controllers/FinanceController";
import { FinanceType } from "@entities/Finance";
import { z } from "zod";
import { CreateFinanceSchema } from "@schemas/finance/Finance.schema";

export const financePrivateRoute = Router();

financePrivateRoute.post(
  "/create/:type",
  authMiddleware,
  async (req: Request, res: Response) => {
    req.body.type = req.params.type.toUpperCase();
    const body = validateRequestBody(
      CreateFinanceSchema,
      req
    );
  const type = req.params.type.toUpperCase() as FinanceType;
    
    await FinanceController.createFinance(body, res, type as FinanceType);
  }
);

financePrivateRoute.get(
  "/all",
  authMiddleware,
  async (req: Request, res: Response) => {
    await FinanceController.getAllFinancesByUser(req, res);
  }
);

function validateRequestBody(schema: z.ZodSchema, req: Request) {
  const results = schema.safeParse(req.body);
  if (!results.success) {
    const errors = results.error.errors[0];
    throw new Error(`${errors.message}`);
  }
  return results.data;
}