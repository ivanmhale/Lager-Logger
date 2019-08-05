const puppeteer = require("puppeteer");
const sessionFactory = require("../factories/session.factory");
const userFactory = require("../factories/user.factory");

class CustomPage {
    static async build (){
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === "ci",
            args: ["--no-sandbox"]
        });

        const page = await browser.newPage();
        const customPage = new CustomPage(page);

        return new Proxy(customPage, {
           get: function(target, property){
               return customPage[property] || browser[property] || page[property]
           }
        });
    }

    constructor(page){
        this.page = page;
    }

    async login(){
        const user = await userFactory();
        const {session, sig} = sessionFactory(user);

        await this.page.setCookie({name: "session", value: session});
        await this.page.setCookie({name: "session.sig", value: sig});

        await this.page.goto("http://localhost:3000");
        await this.page.waitFor("svg.user_panel_toolbar_icon");
    }

    async getContentsOf(selector){
        return this.page.$eval(selector, el => el.innerText);
    }

    async getElement(selector){
        return this.page.$eval(selector, el => el);
    }
}

module.exports = CustomPage;