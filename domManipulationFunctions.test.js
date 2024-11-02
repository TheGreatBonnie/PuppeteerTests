const puppeteer = require("puppeteer");

describe("Example Puppeteer Test Suite", () => {
  let browser;
  let page;

  jest.setTimeout(80000);

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Fill out a form and submit", async () => {
    // Navigate to the page
    await page.goto(
      "https://www.lambdatest.com/selenium-playground/simple-form-demo"
    );

    // Fill out the form
    await page.type("#sum1", "4");
    await page.type("#sum2", "5");

    // Click the submit button
    await page.click("xpath///button[normalize-space()='Get Sum']");

    // Wait for the results to load
    await page.waitForSelector("#addmessage", { visible: true });

    // Evaluate the page and assert the results
    const sumText = await page.$eval("#addmessage", (el) => el.textContent);
    expect(sumText).toContain("9");
  });

  test("Hover over an element and assert the tooltip", async () => {
    // Navigate to the page
    await page.goto(
      "https://www.lambdatest.com/selenium-playground/hover-demo"
    );

    // Hover over the element
    await page.hover("xpath///div[@class='s__column m-15']//img[@alt='Image']");

    // Evaluate the page and assert the tooltip text
    const tooltipText = await page.$eval(
      "xpath///p[@class='text-center w-300 sp__text font-medium']",
      (el) => el.textContent
    );
    expect(tooltipText).toBe("Hover");
  });

  test("Select and focus on an input field", async () => {
    // Navigate to the page
    await page.goto(
      "https://www.lambdatest.com/selenium-playground/simple-form-demo"
    );

    // Select the input field
    const inputField = await page.$("#sum1");

    // Focus on the input field
    await inputField.focus();

    // Evaluate the page and assert the active element
    const activeElement = await page.evaluate(() => {
      return document.activeElement.id;
    });
    expect(activeElement).toBe("sum1");
  });
});
