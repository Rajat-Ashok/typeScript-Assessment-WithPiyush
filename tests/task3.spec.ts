import { expect, test } from "@playwright/test";
import { TestData } from "../e2e/testData/taskTestData";
import { Task3PageLocators } from "../e2e/locators/task3PageLocators";


test("Handle Dynamic Element", async ({ page }) => {
    // Navigate to the login page
    const task3PageLocators = new Task3PageLocators(page);
    await page.goto(task3PageLocators.getTask3PageUrl, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Dynamically Loaded Page Elements" })).toBeVisible();
    // Perform click action on start button
    await task3PageLocators.clickStartButton();
    // verify Hello World text is visible after loading is complete
    await task3PageLocators.helloWorldText.waitFor({ state: "visible", timeout: 60000 });
    await expect(task3PageLocators.helloWorldText).toBeVisible();
    await expect(task3PageLocators.helloWorldText).toHaveText(
      TestData["dynamicLoading"].helloWorldText,
    );
});
