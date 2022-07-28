import { LoggingStrategy } from "../interfaces/logging-strategy";

export class ConsoleLoggingStrategy implements LoggingStrategy {
    log(message: string): void {
        console.log(message);
    }

    warn(message: string): void {
        console.warn(message);
    }

    info(message: string): void {
        console.info(message);
    }
    
    error(message: string): void {
        console.error(message);
    }
}