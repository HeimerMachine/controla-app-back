import { ApiError } from "../apiError";

export class InvalidParamsError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Invalid params";
        super(400, message);
    }
}