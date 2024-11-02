const puppeteer = require("puppeteer");
const fs = require("fs");

describe("Screenshot and PDF Generation Test Suite", () => {
  let browser;
  let page;

  // Extend timeout for async browser operations
  jest.setTimeout(30000);

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Take a screenshot of the page", async () => {
    // Navigate to the page
    await page.goto("https://www.lambdatest.com/selenium-playground/");

    // Take a screenshot of the entire page
    await page.screenshot({
      path: "page.png",
      fullPage: true,
    });

    // Check if the screenshot file was generated
    expect(fs.existsSync("page.png")).toBe(true);
  });

  test("Generate a PDF of the page", async () => {
    // Navigate to the page
    await page.goto("https://www.lambdatest.com/selenium-playground/");

    // Generate a PDF of the page
    await page.pdf({
      path: "page.pdf",
      format: "A4",
      orientation: "portrait",
      margin: {
        top: "1cm",
        right: "1cm",
        bottom: "1cm",
        left: "1cm",
      },
    });

    // Check if the PDF file was generated
    expect(fs.existsSync("page.pdf")).toBe(true);
  });

  test("Take a screenshot of a specific area of the page", async () => {
    // Navigate to the page
    await page.goto("https://www.lambdatest.com/selenium-playground/");

    // Take a screenshot of a specific area of the page
    await page.screenshot({
      path: "area.png",
      clip: {
        x: 100,
        y: 100,
        width: 800,
        height: 600,
      },
    });

    // Check if the screenshot file was generated
    expect(fs.existsSync("area.png")).toBe(true);
  });
});
