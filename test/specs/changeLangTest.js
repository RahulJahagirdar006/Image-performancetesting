describe('Change lang attribute to en', () => {
    it('should change the lang attribute of the html tag to en', async () => {
        await browser.url('http://example.com'); // Replace with your webpage URL

        // Execute script to change the lang attribute
        await browser.execute(() => {
            document.documentElement.lang = 'en';
        });

        // Verify the change
        const htmlElement = await $('html');
        const langAttribute = await htmlElement.getAttribute('lang');
        console.log(`Lang attribute after change: ${langAttribute}`);
        expect(langAttribute).toBe('en');
    });
});