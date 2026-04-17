import { Locator } from "playwright";
import { TestData } from "../testData/taskTestData";

export class Task1PageLocators {
  private readonly page: any;
  private readonly task1PageUrl: string =
    "https://practicetestautomation.com/practice-test-login/";
  private readonly usernameInputElement: Locator;
  private readonly passwordInputElement: Locator;
  private readonly submitButtonElement: Locator;
  private readonly loginSuccessTextElement: Locator;
  private readonly logoutButtonElement: Locator;

  constructor(page: any) {
    this.page = page;
    this.usernameInputElement = page.getByRole("textbox", { name: "Username" });
    this.passwordInputElement = page.getByRole("textbox", { name: "Password" });
    this.submitButtonElement = page.getByRole("button", { name: /Submit|Login/ });
    this.loginSuccessTextElement = page.getByRole("heading", {
      name: "Logged in successfully",
    });
    this.logoutButtonElement = page.getByRole("link", { name: "Log out" });
  }

  get getTask1PageUrl(): string {
    return this.task1PageUrl;
  }

  get getLoginSuccessTextElement(): Locator {
    return this.loginSuccessTextElement;
  }

  get getLogoutButtonElement(): Locator {
    return this.logoutButtonElement;
  }

  async loginToApplication(username: string, password: string) {
    await this.usernameInputElement.waitFor({ state: "visible" });
    await this.usernameInputElement.fill(username);
    await this.passwordInputElement.fill(password);

    await Promise.all([
      await this.submitButtonElement.waitFor({ state: "visible" }),
      await this.submitButtonElement.click(),
    ]);
  }

  async verifyLoggedInUrl(): Promise<void> {
    await this.page.waitForURL(/logged-in-successfully/, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    }); //failing into firefox browser hence need to add this
  }
}
