export class User {
    id?: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;

    constructor(name: string, email: string, password: string, createdAt: Date = new Date()) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }
}
