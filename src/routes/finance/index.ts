import { Router } from "express";
import { financePrivateRoute } from "./private/FinancePrivateRoute";

const routes = Router();

routes.use("/finance", financePrivateRoute);

export {routes};