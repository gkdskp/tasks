import * as Dataloader from "dataloader";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

export function createUserLoader(userService: UserService) {
    return new Dataloader<string, UserEntity>(async (ids) => {
        const users = await userService.getUserByIds([...ids]);
        const userMap = {};

        users.forEach(user => {
            userMap[user.id] = user
        });

        console.log(userMap);

        return ids.map(id => userMap[id]);
    });
}