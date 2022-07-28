import { LoggingStrategy } from "../interfaces/logging-strategy";

export class Logger {
    constructor(private loggingStrategy:  LoggingStrategy, private prefix: string) { }

    log(message: string): void {
        this.loggingStrategy.log(`[${this.prefix}]: ${message}`);
    }

    error(message: string): void {
        this.loggingStrategy.error(`[${this.prefix}]: ${message}`);
    }

    info(message: string): void {
        this.loggingStrategy.info(`[${this.prefix}]: ${message}`);
    }

    warn(message: string): void {
        this.loggingStrategy.warn(`[${this.prefix}]: ${message}`);
    }
}