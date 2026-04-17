import { Locator } from "@playwright/test";

export class Task2PageLocators {
  private readonly page: any;
  private readonly task2PageUrl: string = "https://www.saucedemo.com/";
  private readonly appTitleTextElement: Locator;
  private readonly productTitleElement: Locator;
  private readonly addToCartButtonElement: Locator;
  private readonly cartBadgeElement: Locator;
  private readonly cartLinkElement: Locator;
  private readonly checkoutButtonElement: Locator;
  private readonly firstNameInputElement: Locator;
  private readonly lastNameInputElement: Locator;
  private readonly zipCodeInputElement: Locator;
  private readonly continueButtonElement: Locator;
  private readonly finishButtonElement: Locator;
  private readonly orderConfirmationTextElement: Locator;

  constructor(page: any) {
    this.page = page;
    this.appTitleTextElement = page.locator(".app_logo");
    this.productTitleElement = page.locator(
      "//div[contains(@class, 'inventory_item_name ')]",
    );
    this.addToCartButtonElement = page.locator(
      "//button[contains(@data-test, 'add-to-cart')]",
    );
    this.cartBadgeElement = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLinkElement = page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButtonElement = page.locator('[data-test="checkout"]');
    this.firstNameInputElement = page.locator('[data-test="firstName"]');
    this.lastNameInputElement = page.locator('[data-test="lastName"]');
    this.zipCodeInputElement = page.locator('[data-test="postalCode"]');
    this.continueButtonElement = page.locator('[data-test="continue"]');
    this.finishButtonElement = page.locator('[data-test="finish"]');
    this.orderConfirmationTextElement = page.getByRole("heading", {
      name: /Thank you for your order/i,
    });
  }

  get getTask2PageUrl(): string {
    return this.task2PageUrl;
  }

  get getAppTitleTextElement(): Locator {
    return this.appTitleTextElement;
  }

  get getCartBadgeElement(): Locator {
    return this.cartBadgeElement;
  }

  get getOrderConfirmationTextElement(): Locator {
    return this.orderConfirmationTextElement;
  }

  async addTwoProductsToCart(...products: string[]): Promise<void> {
    for (const product of products) {
      await this.page
        .locator(".inventory_item")
        .filter({ has: this.page.getByText(product, { exact: true }) })
        .getByRole("button", { name: "Add to cart" })
        .click();
    }
  }

  async removeOneProductFromCart(productName: string): Promise<void> {
    await this.page
      .locator(".cart_item")
      .filter({ has: this.page.getByText(productName, { exact: true }) })
      .getByRole("button", { name: "Remove" })
      .click();
  }

  async openCartPage(): Promise<void> {
    await this.cartLinkElement.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButtonElement.click();
  }

  async fillCheckoutDetails(
    firstName: string,
    lastName: string,
    zipCode: string,
  ): Promise<void> {
    await this.firstNameInputElement.fill(firstName);
    await this.lastNameInputElement.fill(lastName);
    await this.zipCodeInputElement.fill(zipCode);
    await this.continueButtonElement.click();
  }

  async completeCheckout(): Promise<void> {
    await this.finishButtonElement.click();
  }
}
