import { Finance } from "./Finance";

export class Expense implements Finance {
    id: string;
    userId: string;
    amount: number;
    description: string;
    date: Date;

    constructor(
        id: string,
        userId: string,
        amount: number,
        description: string,
        date: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.amount = amount;
        this.description = description;
        this.date = date;
    }
}