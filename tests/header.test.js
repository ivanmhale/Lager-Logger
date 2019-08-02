const puppeteer = require("puppeteer");
let browser, page;
beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    await page.goto("localhost:3000");
});

test("Clicking the Facebook login button kicks Facebook oauth flow", async () => {
    await page.click(".account_circle");
    await page.click(".btn_login-fb");
    const url = await page.url();
    expect(url).toMatch(/facebook\.com/);
});

test("Clicking the Google login button kicks Google oauth flow", async () => {
    await page.click(".account_circle");
    await page.click(".btn_login-google");
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
});

afterEach( async ()=>{
   await browser.close();
});