import { UserRole } from "./user.entity";

export class UserDto {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}