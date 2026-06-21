---
title: Resolving Ant Design UI Locator Conflicts via Playwright
description: Advanced strategies to handle dynamically generated overlays, selectors, and nested layouts using Page Object Models.
---

Modern UI frameworks like Ant Design optimize component generation dynamically, which frequently creates duplicate locators or detached elements during automated end-to-end testing runs.

## 1. The Strategy: Strict Data Attributes over Layout Text

Avoid tracking elements through changing display labels. Instead, implement a robust Page Object Model utilizing targeted node filtering:

```typescript
import { expect, type Locator, type Page } from '@playwright/test';

export class CustomerCreationPage {
  readonly page: Page;
  readonly submitButton: Locator;
  readonly activeDropdownItem: Locator;

  constructor(page: Page) {
    this.page = page;
    // Target the button inside the precise wrapper container boundary
    this.submitButton = page.locator('.ant-form-item-control').locator('button:has-text("Submit")');
    this.activeDropdownItem = page.locator('.ant-select-item-option-content');
  }

  async selectDropdownValue(value: string) {
    // Wait for dynamic overlay to mount to DOM completely
    const targetOption = this.activeDropdownItem.filter({ hasText: value });
    await targetOption.waitFor({ state: 'visible' });
    await targetOption.click();
  }
}
```
