import { ApiError } from "./apiError";

export class IDNullError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: ID is null or undefined";
        super(400, message);
        this.name = "IDNullError";
    }
}