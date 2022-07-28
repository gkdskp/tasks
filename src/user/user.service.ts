import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
import { UserEntity, UserRole } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { EntityNotFoundException } from "src/common/exceptions/entity-not-found.exception";
import * as jsonwebtoken from "jsonwebtoken";
import { UserLoginDto } from "./user-login.dto";


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

    findOneByEmail(email: string) {
        return this.userRepository.findOne({ email })
    }

    async create(user: UserDto) {
        const newUser = new UserEntity();

        newUser.email = user.email;
        newUser.name = user.name;
        newUser.password = await bcrypt.hash(user.password, 10);
        newUser.role = user.role;

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

    async login(credentials: UserLoginDto) {
        const user = await this.findOneByEmail(credentials.email);
        
        if(!user) {
            throw new EntityNotFoundException();
        }
        
        const result = await bcrypt.compare(credentials.password, user.password);
        if(! result) {
            throw new ForbiddenException();
        }
        
        console.log(user);
        const token = jsonwebtoken.sign({ id: user.id, role: user.role }, process.env.JWT_TOKEN_SECRET);
        return token;
    }
}