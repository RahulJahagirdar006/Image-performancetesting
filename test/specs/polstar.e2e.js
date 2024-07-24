const { expect } = require('@wdio/globals')
const LandingPage = require('../pageobjects/login.page')
const SecurePage = require('../pageobjects/secure.page')
const configData = require('../Data/Polstar/Landingpage.json')
const Element = require('../pageobjects/ElementIdentifier/Polstar/Landingpage.json')
const basepage = require('../../common.js')
const assert = require('assert');


describe('My Login application', () => {
    before(async() => {
        await browser.reloadSession();
        await browser.url(configData.baseURL); // Replace with your webpage URL
        await browser.maximizeWindow();
        // Validate the policy text
        const policyTitle = await $(Element.placeorder);
        const policyText = await $(Element.policyText);

        let titleText = '';
        let descriptionText = '';

        if (policyTitle.isDisplayed()){
            titleText = await policyTitle.getText();
        }
        
        
        if (policyText.isDisplayed()){
            descriptionText = await policyText.getText();
        }
       
        
        console.log(titleText, descriptionText)

        expect(titleText).toHaveText(configData.title);
        expect(descriptionText).toHaveText(configData.description);

        // Click the "Accept All Cookies" button
        const acceptButton = await $(Element.Acceptbutton);
        if(acceptButton.isDisplayed()){
            console.log('Click button is dislpaying');
            await acceptButton.click();
        }        

        // Optional: Add an assertion to verify that the banner is no longer visible after clicking accept
        const banner = await $(Element.banner);
        await expect(banner).not.toBeDisplayed();
    })
    
    it.skip('TC001 - Change the Language bu passing throught the URL', async() => {

        // Navigate to home page
        await LandingPage.open();
         // Execute script to change the lang attribute
         await browser.execute(() => {
            document.documentElement.lang = 'en';
        });

        // Verify the change
        await browser.pause(5000);
        
    })

    it.skip('TC002 - should validate the policy text and click the accept button', async () => {
       // Reload the page
        await browser.refresh();
        
        // Validate the policy text
        await browser.pause(5000);
        
        await browser.url(configData.baseURL); // Replace with your webpage URL

        // Validate the policy text
        const policyTitle = await $(Element.placeorder);
        const policyText = await $(Element.policyText);

        let titleText = '';
        let descriptionText = '';

        if (policyTitle.isDisplayed()){
            titleText = await policyTitle.getText();
        }
        
        
        if (policyText.isDisplayed()){
            descriptionText = await policyText.getText();
        }
       
        
        console.log(titleText, descriptionText)

        expect(titleText).toHaveText(configData.title);
        expect(descriptionText).toHaveText(configData.description);

        // Click the "Accept All Cookies" button
        const acceptButton = await $(Element.Acceptbutton);
        if(acceptButton.isDisplayed()){
            console.log('Click button is dislpaying');
            await acceptButton.click();
        }        

        // Optional: Add an assertion to verify that the banner is no longer visible after clicking accept
        const banner = await $(Element.banner);
        await expect(banner).not.toBeDisplayed();
    });

    it('TC003 - should find and verify all links on the page', async () => {
        // Reload the page
        await browser.refresh();
  
        // Validate the policy text
        await browser.pause(5000);
        // Navigate to the URL
        await browser.url(configData.baseURL);
    
        // Get all links on the page
        const links = await $$('a');
    
        // Iterate through each link
        for (const link of links) {
          // Get the href attribute of the link
          const href = await link.getAttribute('href');
    
          if (href) {
            // Send HTTP request to the link
            try {
              const response = await axios.head(href);
              // Check response status
              if (response.status >= 400) {
                console.log(`Broken link found: ${href}`);
              }
            } catch (error) {
              console.error(`Error fetching ${href}: ${error.message}`);
            }
          }
        }
      });


      it('TC004- should validate all menu items and URLs', async () => {
        // Reload the page
        await browser.refresh();

        // Validate the policy text
        await browser.pause(5000);
        // Maximaize screen
        
        // Wait for the page to load and the menu button to become clickable
        await browser.pause(3000); // Adjust the wait time as necessary

        // Click on the menu button to open the menu
        const menuButton = await $(Element.menu); // Assuming this is the menu button selector
        await menuButton.click();

        // Await the menu button
        await browser.pause(10000);

            // Locate the ul element containing the menu items
        // Find all <li> elements within the <ul> with role="menu"
        const menuItems = await $$(Element.menulist);

        // Iterate over each menu item
        for (let i = 0; i < menuItems.length; i++) {
          const menuItem = menuItems[i];
    
          // Validate attributes and properties of the menu item
          const id = await menuItem.$('a').getAttribute('id');
          const href = await menuItem.$('a').getAttribute('href');
        //   const text = await menuItem.$('a span font').getText();
    
          // Print details to console
          console.log(`Menu Item ${i + 1}:`);
          console.log(`  ID: ${id}`);
          console.log(`  Href: ${href}`);
        //   console.log(`  Text: ${text}`);
    
          // Assert conditions if needed (example assertions)
          expect(id).not.toBe(undefined);
        //   expect(href).toContain('/se/');
        //   expect(text.length).toBeGreaterThan(0);
        }

      })

      it('should scroll the page and click on the Polestar 3 link', async () => {
     

        // Corrected selector
        const link = await $("//div/a[@href='/se/polestar-3/']");

        // Scroll the element into view
        await link.scrollIntoView();

       // Wait for the element to be clickable
       await link.waitForClickable();

       // Click the element
       await link.click();

      //wait for loading to complete
       await browser.pause(3000);  
        
    });


    it('should pause the video element', async () => {
      await browser.url('https://www.polestar.com/se');

      // Execute JavaScript to select the video element by its data-testid attribute
      const videoElement = await $('[data-testid="video-element"]');

      // Pause the video using JavaScript in the browser context
      await browser.execute((video) => {
          // Check if the video is currently playing
          if (!video.paused) {
              video.pause();
          }
      }, videoElement);

      // Optionally, you can add assertions here to verify the video state
    });


    it('should scroll to the Explore button, click it, and validate URL and title', async () => {
     // Locate the "Explore" button using a suitable selector
      const exploreButton = await $('a[href="/se/precept/"]');

      // Scroll to the "Explore" button to ensure it's in view
      await exploreButton.scrollIntoView();

      // Click on the "Explore" button
      await exploreButton.click();

      // Wait for the next page to load
      await browser.pause(2000); // Adjust as needed or use waitFor commands

      // Validate the current URL
      const currentUrl = await browser.getUrl();
      assert.strictEqual(currentUrl, 'https://www.polestar.com/se/precept/', 'Expected URL does not match actual URL');

      // Wait for the next page to load
      await browser.pause(5000);

      // Validate the current page title
      const title = await browser.getTitle();
      console.log(title)
      assert.strictEqual(title, 'Polestar Precept – Bilbranschens framtid | Polestar Sverige', 'Expected title does not match actual title');

      // Optionally, add more assertions to validate content or elements on the next page
  });

  it("Navigate through images of cars.", async()=>{
    const elemnets = await $$('//*[@id="4513618-142443266"]/div[1]/div[8]/div/div/div/button')
   for (let i=0; i<elemnets.length; i++) {
    await basepage.waitForDisplayedAndClick(elemnets[i])
    await browser.pause(1000);
   }
  })

  // it.only("Navigate through different meny sections", async()=>{
  //     await basepage.waitForDisplayedAndClick($('//*[@id="gatsby-focus-wrapper"]/div[1]/header/section/div/div[2]/div/button/div/span'))
  //     await basepage.waitForDisplayedAndClick($('//*[@id="165013927"]'))
  //     await browser.pause(5000)
  //     await basepage.waitForDisplayedAndClick($('//*[@id="aHcGD0vNTNyjB4HDYuK_HQ"]'))
  //     await basepage.waitForDisplayedAndClick($('/html/body/div[1]/header/div[4]/div/div[2]/div/section/ul/li[1]/a'))
  //     const menu = await $$('//*[@id="gatsby-focus-wrapper"]/div[1]/header/div[2]/nav/div[2]/section/div/ul/li/a')
  //     for (let i=0; i<menu.length; i++){
  //         await basepage.waitForDisplayedAndClick(menu[i])
  //         await browser.pause(2000);
  //     }
  //   })

})