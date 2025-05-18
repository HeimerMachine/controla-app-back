import { ApiError } from "../apiError";

export class EmailRequiredError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Email is required";
        super(403, message);
    }
}