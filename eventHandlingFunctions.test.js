const puppeteer = require("puppeteer");

describe("Event Handling Test Suite", () => {
  let browser;
  let page;

  // Extend timeout for async browser operations
  jest.setTimeout(80000);

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Handle dialog boxes", async () => {
    // Set up a dialog event listener to accept the dialog
    page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    // Navigate to the page and trigger a dialog box
    await page.goto("https://www.lambdatest.com/selenium-playground/");
    await page.evaluate(() => {
      window.alert("This is a test dialog");
    });

    // Assert that the page continues to load after accepting the dialog
    await page.waitForNavigation();
    expect(page.url()).toContain("www.lambdatest.com/selenium-playground/");
  });

  test("Wait for a network response", async () => {
    // Wait for a specific network response

    const responsePromise = page.waitForResponse((response) =>
      response.url().includes("https://jsonplaceholder.typicode.com/todos/1")
    );

    // Navigate to the page and trigger the network request
    await page.goto("https://www.lambdatest.com/selenium-playground/");
    const response = await responsePromise;

    // Assert that the response was received
    expect(response.status()).toBe(200);
  });
});
