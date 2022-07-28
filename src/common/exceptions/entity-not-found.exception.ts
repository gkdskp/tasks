import { HttpException, HttpStatus } from "@nestjs/common";

export class EntityNotFoundException extends HttpException {
    constructor() {
        super('Resource conflict', HttpStatus.CONFLICT);
    }
}