import { expect, test } from "@playwright/test";
import { Task1PageLocators } from "../e2e/locators/task1PageLocators";
import { TestData } from "../e2e/testData/taskTestData";


test("Login Automation", async ({ page }) => {
    // Navigate to the login page
    const task1PageLocators = new Task1PageLocators(page);
    await page.goto(task1PageLocators.getTask1PageUrl, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Test login" })).toBeVisible();
    // Perform login action
    await task1PageLocators.loginToApplication(TestData["loginAutomation"].username, TestData["loginAutomation"].password);
    await task1PageLocators.verifyLoggedInUrl();
    // verify login success
    await expect(task1PageLocators.getLoginSuccessTextElement).toHaveText(
      TestData["loginAutomation"].loginSuccessText,
    );
    await task1PageLocators.getLogoutButtonElement.waitFor({ state: "visible" });
    await expect(task1PageLocators.getLogoutButtonElement).toBeVisible();

});
