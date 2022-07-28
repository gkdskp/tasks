import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { ConsoleLoggingStrategy } from "../helpers/console-logging-strategy";
import { Logger } from "../helpers/logger";

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
    private readonly logger = new Logger(
        new ConsoleLoggingStrategy(),
        "app/graphql-exception"
    );
    
    catch(exception: HttpException, host: ArgumentsHost) {
        const status = exception.getStatus();
        this.logger.error(`Status: ${status}`);
    }
}