import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";

@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService
    ) {}

    @Query()
    async getUsers() {
        return this.userService.findAll();
    }

    @Query()
    async getUserById(
        @Args('id') id: string
    ) {
        return this.userService.findOne(id);
    }

    @Mutation()
    async createUser(
        @Args('user') user: UserDto
    ) {
        return this.userService.create(user);
    }

    @Mutation()
    async makeAdmin(
        @Args('id') id: string
    ) {
        return this.userService.makeAdmin(id);
    }

    @Mutation()
    async makeUser(
        @Args('id') id: string
    ) {
        return this.userService.makeUser(id);
    }

    @Mutation()
    async deleteUser(
        @Args('id') id: string
    ) {
        await this.userService.deleteUser(id);
        return { "message": "Success" };
    }
}