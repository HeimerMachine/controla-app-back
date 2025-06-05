
import { FinanceType } from "@entities/Finance";
import { FinanceRepository } from "@repositories/FinanceRepository";
import { CreateFinanceService } from "@services/finance/CreateFinanceService";
import { GetAllFinancesByUserService } from "@services/finance/GetAllFinancesByUserService";
import { Request, Response } from "express";

const initializeUseCases = () => {
  const financeRepository = new FinanceRepository();
  const createFinanceService = new CreateFinanceService(financeRepository);
  const getAllFinancesByUser = new GetAllFinancesByUserService(financeRepository);

  return {
    createFinanceService, getAllFinancesByUser
  }
}

const { createFinanceService, getAllFinancesByUser } = initializeUseCases();

//TODO - refactor all controllers from object to a class.
const FinanceController = {
  createFinance: async (req: Request, res: Response, type: FinanceType) => {
    const { amount, description, date, category } = req.body;
    console.log(category)
    const finance = await createFinanceService.execute(
      res.locals.decoded.email,
      amount,
      description,
      date,
      type,
      category ? category.toUpperCase() : undefined
    );
    return res.status(201).json({
      message: `Finance of type ${type} created successfully`,
      finance,
    });
  },
  getAllFinancesByUser: async (req: Request, res: Response) => {
    console.log(res.locals);
    const userEmail = res.locals.decoded.email;
    const finances = await getAllFinancesByUser.execute(userEmail);
    res.status(200).json({
      message: "Finances retrieved successfully",
      finances,
    });
  },
};

export default FinanceController;