import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
import { UserEntity, UserRole } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { EntityNotFoundException } from "src/common/exceptions/entity-not-found.exception";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ) { }

    findAll() {
        return this.userRepository.find();
    }

    findOne(id: string) {
        return this.userRepository.findOne(id);
    }

    async create(user: UserDto) {
        const newUser = new UserEntity();

        newUser.email = user.email;
        newUser.name = user.name;
        newUser.password = await bcrypt.hash(user.password, 10);

        const userEntity = this.userRepository.create(newUser);
        await userEntity.save();
        return userEntity;
    }

    async makeAdmin(id: string) {
        const user = await this.findOne(id);

        if(!user) {
            throw new EntityNotFoundException();
        }

        user.role = UserRole.ADMIN;
        await user.save();

        return user;
    }

    async makeUser(id: string) {
        const user = await this.findOne(id);

        if(!user) {
            throw new EntityNotFoundException();
        }

        user.role = UserRole.USER;
        await user.save();

        return user;
    }

    async deleteUser(id: string) {
        const user = await this.findOne(id);

        if(!user) {
            throw new EntityNotFoundException();
        }

        await user.remove();

        return user;
    }
}