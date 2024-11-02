const puppeteer = require("puppeteer");

describe("Form Input Test", () => {
  let browser;
  let page;

  // Extend timeout for async browser operations
  jest.setTimeout(30000);

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  it("should input values in a form and check their sum", async () => {
    // Navigate to the form page
    await page.goto(
      "https://www.lambdatest.com/selenium-playground/simple-form-demo"
    );

    // Input values into the form fields
    await page.type("#sum1", "2");
    await page.type("#sum2", "3");

    // Click the "Get Sum" button
    await page.click("xpath///button[normalize-space()='Get Sum']");

    // Wait for the result to appear and validate it
    await page.waitForSelector("#addmessage", { visible: true });
    const sumText = await page.$eval("#addmessage", (el) => el.textContent);
    expect(sumText).toContain("5");
  });

  afterAll(async () => {
    await browser.close();
  });
});
