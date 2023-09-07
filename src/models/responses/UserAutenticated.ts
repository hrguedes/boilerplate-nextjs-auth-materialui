import UserResponse from "./UserResponse";

export default interface UserAutenticated {
    user: UserResponse;
    roles: string[];
    token: string;
    tokenExpires: Date;
}