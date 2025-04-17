import { ILogger } from '../types/page.types';

export class Logger implements ILogger {
    private static instance: Logger;
    private debugMode: boolean;

    private constructor() {
        this.debugMode = process.env.DEBUG === 'true';
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public static info(message: string): void {
        console.log(`[INFO] ${message}`);
    }

    public static error(message: string): void {
        console.error(`[ERROR] ${message}`);
    }

    public static debug(message: string): void {
        console.debug(`[DEBUG] ${message}`);
    }

    public info(message: string, ...args: any[]): void {
        console.info(message, ...args);
    }

    public error(message: string, error?: Error): void {
        console.error(message, error);
    }

    public debug(message: string, ...args: any[]): void {
        if (this.debugMode) {
            console.debug(message, ...args);
        }
    }

    public warn(message: string, ...args: any[]): void {
        console.warn(message, ...args);
    }
} 