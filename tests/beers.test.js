const Page = require("./helpers/page");

let page;
beforeEach(async () => {
    page = await Page.build();
    await page.goto("http://localhost:3000");
});

afterEach( async () => {
    await page.close();
});

test.only("User can add new beers", async () => {
    await page.login();
    await page.waitFor(".trow");
    await page.click(".trow");

    await page.waitFor(".beer_name");
    const title = await page.getContentsOf(".beer_name");

    await page.waitFor("#btn_save");
    await page.click("#btn_save");

    await page.waitFor(".btn_submit");
    await page.click(".btn_submit");

    await page.waitFor(".avatar");
    await page.click(".avatar");

    const expectedTitle = await page.getContentsOf(".table_cell p.name");
    expect(title).toEqual(expectedTitle)

});