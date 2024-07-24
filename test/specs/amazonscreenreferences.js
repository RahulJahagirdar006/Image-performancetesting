
describe.only("visual regression test", async () => {
    beforeEach(async() => {
        await browser.url('https://www.flipkart.com/')
        // browser.maximizeWindow()
    })

    it("should be able to perform visual test on home page", async()=>{
        // await browser.pause(5000)
        expect(await browser.checkScreen('flipkart-homepage', {})).toEqual(0)
    })

    it("should be able to perform visual test on search suggestions", async()=>{
        // await browser.pause(5000)
        await browser.maximizeWindow();
        await $("//input[@title='Search for Products, Brands and More']").setValue("tshirts");
        // await Base.hoverOverElement(await $('//*[@id="nav-flyout-searchAjax"]/div[2]/div/div[1]'))
        await browser.pause(5000)
        expect(await browser.checkElement(await $('//*[@id="container"]/div/div[1]/div/div/div/div/div[1]/div/div/div/div[1]/div[1]/header/div[1]/div[2]/form/ul'), 'searchbar-suggestions', {})).toEqual(0)
    })
})