const Page = require("./helpers/page");

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto("http://localhost:3000");
});

afterEach( async () => {
    await page.close();
});

test("Clicking the Facebook login button kicks Facebook oauth flow", async () => {
    await page.waitFor(".account_circle");
    await page.click(".account_circle");
    await page.waitFor(".btn_login-fb");
    await page.click(".btn_login-fb");
    const url = await page.url();
    expect(url).toMatch(/facebook\.com/);
});

test("Clicking the Google login button kicks Google oauth flow", async () => {
    await page.waitFor(".account_circle");
    await page.click(".account_circle");
    await page.waitFor(".btn_login-google");
    await page.click(".btn_login-google");
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
});