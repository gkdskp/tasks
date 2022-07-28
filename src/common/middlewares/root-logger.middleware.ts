import { Logger } from "../helpers/logger";


export function loggerMiddleware(logger: Logger) {
    return (req: any, res: any, next: (error?: any) => void) => {
        logger.log(`${req.path} ${req.ip} ${Date.now().toString()}`) ;
        next();
    }
}