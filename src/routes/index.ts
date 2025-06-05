import { UserPublicRoute } from "./user/public/UserPublicRoute.js";
import { UserPrivateRoute } from "./user/private/UserPrivateRoute.js"
import express from "express";

const routes = express.Router();
routes.use("/users", UserPublicRoute);
routes.use("/users", UserPrivateRoute);

export {routes}
