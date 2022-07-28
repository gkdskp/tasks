import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConsoleLoggingStrategy } from "../helpers/console-logging-strategy";
import { Logger } from "../helpers/logger";

@Injectable()
export class GraphQLLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(
        new ConsoleLoggingStrategy(),
        "app/graphql"
    )
    
    use(req: any, res: any, next: (error?: any) => void) {
        this.logger.info(`${JSON.stringify(req.body)}`);
        next();
    }
}