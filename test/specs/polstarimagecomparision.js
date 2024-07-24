describe('Polestar 3 Visual Regression Test', () => {
    let expect;

    before(async () => {
        // Dynamically import chai
        const chai = await import('chai');
        expect = chai.expect;

        await browser.url('https://www.polestar.com/se/polestar-3/');
    });

    it('should compare the entire page screenshot with the baseline', async () => {
        // Capture and compare the screenshot of the entire page
        const screenshot = await browser.checkFullPageScreen('polestar-3-full-page', {});
        expect(screenshot).to.equal(0, 'The full-page screenshot does not match the baseline');
    });

    it('should compare the hero section screenshot with the baseline', async () => {
        const heroSection = await $('section.hero');
        
        // Capture and compare the screenshot of the hero section
        const screenshot = await browser.checkElement(heroSection, 'polestar-3-hero-section');
        expect(screenshot).to.equal(0, 'The hero section screenshot does not match the baseline');
    });

    // Add more test cases for other elements if needed
});
