import { Page } from '@playwright/test';

export interface CustomWorld {
    page: Page | null;
} 