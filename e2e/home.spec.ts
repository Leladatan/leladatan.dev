import { expect, test } from "@playwright/test";

test("home introduces leladatan in Russian and English", async ({ page }) => {
  await page.goto("/ru");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("leladatan");
  await expect(page.getByRole("link", { name: "Таск-менеджер" })).toBeVisible();

  await page.getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("leladatan");
  await expect(page.getByRole("link", { name: "Task manager" })).toBeVisible();
});
