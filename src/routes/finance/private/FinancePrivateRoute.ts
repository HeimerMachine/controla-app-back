import { Router } from "express";
import authMiddleware from "../../../middleware/authMiddleware";
import FinanceController from "@controllers/FinanceController";
import { FinanceType } from "@entities/Finance";

export const financePrivateRoute = Router();

financePrivateRoute.post(
  "/create/:type",
  authMiddleware,
  async (req, res) => {
  const type = req.params.type.toUpperCase() as FinanceType;
    if (!["INCOME", "EXPENSE"].includes(type)) {
      res.status(400).json({ message: "Invalid finance type" });
    }
    await FinanceController.createFinance(
      req,
      res,
      type as FinanceType
    );
  }
);

financePrivateRoute.get("/all", authMiddleware, async (req, res) => {
  await FinanceController.getAllFinancesByUser(req, res);
})