import { Locator } from "playwright";
import { TestData } from "../testData/taskTestData";

export class Task3PageLocators {
  private readonly page: any;
  private readonly task3PageUrl: string =
    "https://the-internet.herokuapp.com/dynamic_loading/1";
  private readonly startButtonElement: Locator;
  private readonly loadingElement: Locator;
  private readonly helloWorldTextElement: Locator;

  constructor(page: any) {
    this.page = page;
    this.startButtonElement = page.getByRole("button", { name: "Start" });
    this.loadingElement = page.locator("#loading");
    this.helloWorldTextElement = page.getByText("Hello World!");
  }

  async clickStartButton(): Promise<void> {
    await this.startButtonElement.click();
    await this.loadingElement.waitFor({ state: "hidden", timeout: 60000 });
  }

  get getTask3PageUrl(): string {
    return this.task3PageUrl;
  }
  get helloWorldText(): Locator {
    return this.helloWorldTextElement;
  }
  // await this.helloWprldTextElement.waitFor({ state: "visible", timeout: 60000 });
  //   await expect(this.helloWprldTextElement).toHaveText(
  //     TestData["dynamicLoading"].helloWorldText,
  //   );
}
