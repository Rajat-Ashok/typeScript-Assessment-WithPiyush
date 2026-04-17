import { expect, test } from "@playwright/test";
import { Task2PageLocators } from "../e2e/locators/task2PageLocators";
import { TestData } from "../e2e/testData/taskTestData";
import { Task1PageLocators } from "../e2e/locators/task1PageLocators";


test("Add Item to Cart, Verify Checkout", async ({ page }) => {
  // Navigate to the login page
  const task2PageLocators = new Task2PageLocators(page);
  const task1PageLocators = new Task1PageLocators(page);
  await page.goto(task2PageLocators.getTask2PageUrl, {
    waitUntil: "domcontentloaded",
  });
  await task1PageLocators.loginToApplication(
    TestData["addItemToCartVerifyCheckout"].username,
    TestData["addItemToCartVerifyCheckout"].password,
  );
  await expect(task2PageLocators.getAppTitleTextElement).toHaveText(
    TestData["addItemToCartVerifyCheckout"].appTitleText,
  );
  await task2PageLocators.addTwoProductsToCart(
    TestData["addItemToCartVerifyCheckout"].productsToAdd[0],
    TestData["addItemToCartVerifyCheckout"].productsToAdd[1],
  );
  await expect(task2PageLocators.getCartBadgeElement).toHaveText("2");

  await task2PageLocators.openCartPage();

  await task2PageLocators.removeOneProductFromCart(
    TestData["addItemToCartVerifyCheckout"].productsToAdd[1],
  );
  await expect(task2PageLocators.getCartBadgeElement).toHaveText("1");

  await task2PageLocators.proceedToCheckout();
  await task2PageLocators.fillCheckoutDetails(
    TestData["addItemToCartVerifyCheckout"].firstName,
    TestData["addItemToCartVerifyCheckout"].lastName,
    TestData["addItemToCartVerifyCheckout"].zipCode,
  );

  await task2PageLocators.completeCheckout();
  await expect(task2PageLocators.getOrderConfirmationTextElement).toContainText(
    "Thank you for your order",
  );
});
