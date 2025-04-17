import { Page } from '@playwright/test';
import { PageFactory } from '../utils/page.factory';

export interface CustomWorld {
  page: Page | null;
  pageFactory: PageFactory;
  getPage<T>(pageClass: new (page: Page) => T): T;
} 