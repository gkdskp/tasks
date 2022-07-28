import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { AuthGuard } from "./auth.guard";
import { RolesGuard } from "./role.guard";
import { Roles } from "./roles.decorator";
import { UserLoginDto } from "./user-login.dto";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";

@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService
    ) {}

    @Query()
    @UseGuards(AuthGuard)
    async getUsers() {
        return this.userService.findAll();
    }

    @Query()
    @UseGuards(AuthGuard)
    async getUserById(
        @Args('id') id: string
    ) {
        return this.userService.findOne(id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Mutation()
    @Roles('admin')
    async createUser(
        @Args('user') user: UserDto
    ) {
        return this.userService.create(user);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Mutation()
    @Roles('admin')
    async makeAdmin(
        @Args('id') id: string
    ) {
        return this.userService.makeAdmin(id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Mutation()
    @Roles('admin')
    async makeUser(
        @Args('id') id: string
    ) {
        return this.userService.makeUser(id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Mutation()
    @Roles('admin')
    async deleteUser(
        @Args('id') id: string
    ) {
        await this.userService.deleteUser(id);
        return { "message": "Success" };
    }
    
    @Mutation()
    async login(
        @Args('credentials') credentials: UserLoginDto
    ) {
        const token = await this.userService.login(credentials);
        return { token };
    }
}