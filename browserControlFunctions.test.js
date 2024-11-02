const puppeteer = require("puppeteer");

describe("Browser Control Functions", () => {
  let browser;
  let page;

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

  test("should launch a browser and open a new page", async () => {
    // Verify that the browser and page were created
    expect(browser).toBeTruthy();
    expect(page).toBeTruthy();
  });

  test("should return an array of all open pages", async () => {
    // Open an additional page
    const newPage = await browser.newPage();

    // Get the list of all open pages
    const pages = await browser.pages();

    // Verify that there are at least 2 pages open
    expect(pages.length).toBeGreaterThanOrEqual(2);

    // Close the additional page
    await newPage.close();
  });
});
