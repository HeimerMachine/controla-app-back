import { UserPublicRoute } from "./public/UserPublicRoute.js";
import express from "express";

const routes = express.Router();
routes.use("/users", UserPublicRoute);

export {routes}
