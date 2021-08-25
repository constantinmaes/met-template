export interface User {
    email: string;
    password: string;
    permissions?: string[];
    createdAt: Date;
    updatedAt?: Date;
}
