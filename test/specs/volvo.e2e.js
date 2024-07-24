describe.only("visual regression test", async () => {
    before(async() => {
        await browser.url('https://www.volvocars.com/intl/v/car-safety/a-million-more')
        // await Base.waitForDisplayedAndClick($('//*[@id="onetrust-reject-all-handler"]'))
        browser.maximizeWindow()
    })

    it("TC001:should be able to perform visual test on home page", async()=>{
        // await browser.pause(5000)
        // await Base.waitForDisplayedAndClick($('//*[@id="onetrust-reject-all-handler"]'))
        expect(await browser.checkScreen('volvocars-screen', {})).toEqual(0)
    })

    it("TC002:should be able to perform visual test on Full home page", async()=>{
        // await browser.pause(5000)
        // await Base.waitForDisplayedAndClick($('//*[@id="onetrust-reject-all-handler"]'))
        expect(await browser.checkFullPageScreen('volvocars-fullscreen', {})).toEqual(0)
    })

    it("TC003:should be able to perform visual test on element", async()=>{
        // await Base.waitForDisplayedAndClick($('//*[@id="onetrust-reject-all-handler"]'))
        expect(await browser.checkElement(await $('//*[@id="Hero-1"]/section/div/picture/img'), 'element', {})).toEqual(0)

    })

    it("TC004:should be able to perform visual test on text", async()=>{
        await expect( $('//*[@id="ModelIntro-2"]/section/div/div/p')).toMatchSnapshot()
    })

    it("TC005:should be able to display the text on terminal", async()=>{
        await expect( $('//*[@id="ModelIntro-2"]/section/div/div/p').getText()).toMatchSnapshot() 
    })
})