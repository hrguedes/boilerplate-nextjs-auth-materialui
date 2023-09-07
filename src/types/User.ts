export type User = {
    id: string;
    name: string;
    email: string;
    userType: string;
    roles: string[];
    token: string;
    tokenExpires: Date;
}