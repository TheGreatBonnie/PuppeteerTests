const puppeteer = require("puppeteer");

describe("Page Navigation Functions", () => {
  let browser;
  let page;

  jest.setTimeout(30000);

  beforeAll(async () => {
    // Launch a new browser instance
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    // Close the browser instance
    await browser.close();
  });

  beforeEach(async () => {
    // Open a new page for each test
    page = await browser.newPage();
  });

  afterEach(async () => {
    // Close the page after each test
    await page.close();
  });

  test("should navigate to a URL and wait for the page to load", async () => {
    // Navigate to a test URL
    const testUrl = "https://ecommerce-playground.lambdatest.io/";
    await page.goto(testUrl, { waitUntil: "networkidle0" });

    // Verify that the page has loaded
    const currentUrl = await page.url();
    expect(currentUrl).toBe(testUrl);
  });

  test("should reload the current page", async () => {
    // Navigate to a test URL
    const testUrl = "https://ecommerce-playground.lambdatest.io/";
    await page.goto(testUrl, { waitUntil: "networkidle0" });

    // Reload the page
    await page.reload({ waitUntil: "networkidle0" });

    // Verify that the page has reloaded
    const currentUrl = await page.url();
    expect(currentUrl).toBe(testUrl);
  });

  test("should navigate back and forward in history", async () => {
    // Navigate to the first test URL
    const firstUrl = "https://ecommerce-playground.lambdatest.io/";
    await page.goto(firstUrl, { waitUntil: "networkidle0" });

    // Navigate to the second test URL
    const secondUrl = "https://www.google.com/";
    await page.goto(secondUrl, { waitUntil: "networkidle0" });

    // Navigate back to the first URL
    await page.goBack({ waitUntil: "networkidle0" });
    let currentUrl = await page.url();
    expect(currentUrl).toBe(firstUrl);

    // Navigate forward to the second URL
    await page.goForward({ waitUntil: "networkidle0" });
    currentUrl = await page.url();
    expect(currentUrl).toBe(secondUrl);
  });
});
