import * as dotenv from 'dotenv';

dotenv.config();

export class ConfigManager {
    private static instance: ConfigManager;
    private config: { [key: string]: any };

    private constructor() {
        this.config = {
            DEFAULT_TIMEOUT: 30000,
            BASE_URL: 'https://www.saucedemo.com'
        };
    }

    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    public get(key: string): any {
        return this.config[key];
    }

    public getNumber(key: string): number {
        return Number(this.config[key]);
    }

    public set(key: string, value: any): void {
        this.config[key] = value;
    }
} 