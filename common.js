// import { logger } from "./logerror/logfile.js";
// import assert from "assert"
// import path from "path";
// import dotenv from 'dotenv';
const logger = require("./logerror/logfile.js");
const assert = require("assert");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const standard_timeout = 5000; // Define your standard timeout value
// const standard_timeout = process.env.TIMEOUT
// const standard_drag_and_drop_timeout = process.env.DELAY_DRAG_AND_DROP
// console.log(standard_timeout, standard_drag_and_drop_timeout);

class BasePage {

     /**
         * Asynchronously handles alert dialogs
         * @param {number} [timeout] - Optional. The timeout for waiting for the alert to appear (default is 10000 milliseconds)
         */
    async alertHandler(timeout=standard_timeout){
        try{
            await browser.waitUntil(async () => {
                return await browser.getAlertText() !== null;
            }, {
                timeout: timeout, // Adjust timeout as needed
                timeoutMsg: 'Alert did not appear'
            });
            const alertText = await browser.getAlertText()
            console.log('Alert text:', alertText);
            await browser.acceptAlert()
        }catch (err) {
            logger.error(err)
        }
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
         * Asynchronously waits for an element to be displayed and clicks on it
         * @param {string} Element elementToWaitForClickable - The element to wait for and click on
         * @param {string} [name] - Optional. The name of the element (default is "element")
         * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
         */
    // async waitForDisplayedAndClick(elementToWaitForClickable) {
    //     try {
    //         await elementToWaitForClickable.waitForExist({timeout:timeout})
    //         await elementToWaitForClickable.waitForDisplayed({ timeout: timeout });
    //         await elementToWaitForClickable.click();
    //     } catch (error) {
    //         logger.error(`Error occurred in ${name}, ${error}`);
    //         assert.fail(`Error occurred in ${name}, ${error}`);

    //     }
        
    // }
    async waitForDisplayedAndClick(elementToWaitForClickable, name = "element", timeout = standard_timeout) {
        try {
            await elementToWaitForClickable.waitForExist({ timeout: timeout });
            await elementToWaitForClickable.waitForDisplayed({ timeout: timeout });
            await elementToWaitForClickable.click();
        } catch (error) {
            // logger.error(`Error occurred in ${name}, ${error}`);
            assert.fail(`Error occurred in ${name}, ${error}`);
        }
    }
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
         * Asynchronously waits for an element to be displayed and clicks on it
         * @param {string} Element elementToWaitForDoubleClickable - The element to wait for and Double click on
         * @param {string} [name] - Optional. The name of the element (default is "element")
         * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
         */
async waitForDisplayedAndDoubleClick(elementToWaitForDoubleClickable, name="double click", timeout=standard_timeout) {
    try {
        await elementToWaitForDoubleClickable.waitForExist({timeout:timeout})
        await elementToWaitForDoubleClickable.waitForDisplayed({ timeout: timeout });
        await elementToWaitForDoubleClickable.doubleClick();
    } catch (error) {
        logger.error(`Error occurred in ${name}, ${error}`);
        assert.fail(`Error occurred in ${name}, ${error}`);

    }
    
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
    * Asynchronously waits for an element to be displayed and sets its value
    * @param {string} Element elementToWaitForSetValue - The element to wait for and set its value
    * @param {string} value - The value to set to the element
    * @param {string} [name] - Optional. The name of the element (default is "element")
    * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
    */
    async waitForDisplayedAndSetValue(elementToWaitForSetValue, value, name="element", timeout=standard_timeout) {
        try {
            await elementToWaitForSetValue.waitForExist({timeout:timeout})
            await elementToWaitForSetValue.waitForDisplayed({ timeout: timeout });
            await elementToWaitForSetValue.setValue(value);
        } catch (error) {
            logger.error(`Error occurred in ${name}, ${error}`);
            assert.fail(`Error occurred in ${name}, ${error}`);
        }
    }


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /**
        * Asynchronously selects checkboxes based on provided elements and comparison values
        * @param {string} Element elements - An array of checkbox elements to select from
        * @param compare - Comparison values to determine which checkboxes to select
    */

    async selectCheckBoxes(elements, ...compare){
        try{
            await elements.forEach(async(element)=>{
            
                await $(element).waitForExist({timeout:5000})
                await $(element).waitForDisplayed({ timeout: 5000 });
                const value = await $(element).isExisting() && await $(element).isDisplayed();
                const elementText = await $(element).getText()
                if(value){
                        if (compare.includes(elementText)){
                            await $(element).click()
                        }else{
                            return
                        }
                }   
            })
        }
        catch(error){
            logger.error(error)
        }
    }
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
/**
        * Asynchronously selects checkboxes based on provided elements and comparison values
        * @param {string} Element An array of elements to search through
        * @param compare -  Comparison values used to compare the text content of elements
    */

async findElementsContainingText(elements, ...compare){
    try{
        await elements.forEach(async(element)=>{
            await $(element).waitForExist({timeout:5000})
            await $(element).waitForDisplayed({ timeout: 5000 });
            const value = await $(element).isExisting() && await $(element).isDisplayed();
            const elementText = await $(element).getText()
            if(value){
                    if (compare.includes(elementText)){
                        logger.info(elementText)
                    }else{
                        return 
                        // logger.debug(`Element with text "${elementText}" does not match any comparison values.`)
                        
                    }
            }
            assert.notStrictEqual(elementText, "", 'Element does not contain any text')   
        })
    }
    catch(error){
        logger.error(error)
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    /**
         * Asynchronously selects a value from a dropdown element
         * @param {string} Element dropdownElement - The dropdown element to select a value from
         * @param value - The value to be selected in the dropdown
         * @param {string} [name] - Optional. The name of the dropdown element (default is "element")
         * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
         */
    async selectDropdown(dropdownElement, value, name="element", timeout=standard_timeout){
        try{
            await dropdownElement.waitForExist({timeout:timeout})
            await dropdownElement.waitForDisplayed({ timeout: timeout });
            await dropdownElement.selectByVisibleText(value)
        }catch(error){
            logger.error(`Error occurred in ${name}, ${error}`);
            assert.fail(`Error occurred in ${name}, ${error}`);
        }
    
    }

//-----------------------------------------------------------------------------------------------------------------------------------------
async  dayPick(day_element, day, timeout=standard_timeout, name="day") {
    try {
        const elementsDay = await (day_element);

        for (let i = 0; i < elementsDay.length; i++) {
            const element = await elementsDay[i];

            await $(element).waitForExist({ timeout: timeout });
            await $(element).waitForDisplayed({ timeout: timeout });

            const value = await $(element).isExisting() && await $(element).isDisplayed();
            const elementText = await $(element).getText();

            if (Number(elementText)===Number(day)) { 
                await $(element).click();
                break;
            }
        }
    } catch (error) {
        logger.error(`Error occurred in ${name}, ${error}`);
        assert.fail(`Error occurred in ${name}, ${error}`);
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async datePickerDropDown(elementMonth="", month, elementYear="", year, day_element, day, name = "day", timeout = standard_timeout) {
    try {
        await this.selectDropdown(elementMonth, month);
        await this.selectDropdown(elementYear, year);
        await this.dayPick(day_element, day, timeout);
    } catch (error) {
        logger.error(`Error occurred in ${name}, ${error}`);
        assert.fail(`Error occurred in ${name}, ${error}`);
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async navDate(elementclick, monthelement, month, yearelement, year, nextelement, backelement, day_element, day, timeout=standard_timeout) {
    
    try {
        await this.waitForDisplayedAndClick(elementclick);        
        if (Number(await yearelement.getText())>Number(year)){
            while (true) {
                let currentMonth = await monthelement.getText();
                let currentYear = await yearelement.getText();
                if (currentMonth === month && Number(currentYear) === Number(year)) {
                    this.dayPick(day_element, day, timeout)
                    break;
                }
                else {
                    await this.waitForDisplayedAndClick(backelement);
                }
            }
        }
        else if(Number(await yearelement.getText())<Number(year)){
            while (true) {
                let currentMonth = await monthelement.getText();
                let currentYear = await yearelement.getText();
                if (currentMonth === month && Number(currentYear) === Number(year)) {
                    await this.dayPick(day_element, day, timeout)
                    break;
                }
                else {
                    await this.nextelement(nextelement);
                }
            }
        }
        else{
            const month_name = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "august", "sep", "oct", "nov", "dec"];
            let currentMonth = await monthelement.getText();
            let element = ""
            const current = month_name.indexOf(await currentMonth.slice(0,3).toLowerCase())
            const actual = month_name.indexOf(await month.slice(0,3).toLowerCase())
            if (current>actual){
                element = await backelement
            }else element = await nextelement
            while (true) {
                let currentMonth = await monthelement.getText();
                let currentYear = await yearelement.getText();
                if (Number(currentYear) === Number(year) && await currentMonth.slice(0,3).toLowerCase()===await month.slice(0,3).toLowerCase()) {
                    await this.dayPick(day_element, day, timeout)
                    break;
                }else{
                    await this.waitForDisplayedAndClick(element)
                }
            }
        } 
    } catch (error) {
        console.error(error);
    }
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        /**
         * Asynchronously uploads a file to the specified element
         * @param  {string} Element - The element to which the file will be uploaded
         * @param pathofUploadFile - The path of the file to be uploaded
         * @param {string} [name] - Optional. The name of the upload action (default is "upload")
         * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
         */
    async upload(element, pathofUploadFile, name="upload", timeout = standard_timeout){ 
        try{
            await element.waitForExist({timeout:timeout})
            await element.waitForDisplayed({ timeout: timeout });
            // const filePath = path.join(__dirname, pathofUploadFile) 
            const upload = await browser.uploadFile(pathofUploadFile)
            await element.setValue(upload)
        }catch(error){
            logger.error(`Error occurred in ${name}, ${error}`);
            assert.fail(`Error occurred in ${name}, ${error}`);
        }
    }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

   /**
 * Perform drag and drop action from one element to another with optional delay.
 * @param  drag_element - The element to drag.
 * @param  drop_element - The element to drop onto.
 * @param {number} [delay_dragAndDrop] - Optional delay in milliseconds after dragging before dropping.
 * @param {string} [name] - Name of the action, used for logging purposes.
 * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
 */
   async performDragAndDrop(drag_element, drop_element, delay_dragAndDrop=standard_drag_and_drop_timeout, name="drag and drop", timeout=standard_timeout) {
    try {
        // Resolve elements
        const drag = await drag_element;
        const drop = await drop_element;

        // Wait for elements to exist and be displayed
        await drag.waitForExist({ timeout: timeout });
        await drag.waitForDisplayed({ timeout: timeout });
        await drop.waitForExist({ timeout: timeout });
        await drop.waitForDisplayed({ timeout: timeout });

        // Perform drag and drop action with optional delay
        await drag.dragAndDrop(drop, { duration: delay_dragAndDrop });

    } catch (error) {
        // Handle errors
        logger.error(`Error occurred in ${name}: ${error}`);
        assert.fail(`Error occurred in ${name}: ${error}`);
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            /**
     * Drags the slider element by the specified offsets.
     * 
     * @param {string} sliderElement - The WebDriverIO element representing the slider.
     * @param {number} xOffset - The horizontal offset by which to drag the slider.
     * @param {number} yOffset - The vertical offset by which to drag the slider.
     * @param {string} [name] - The name of the slider (for logging purposes).
     * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
     */

    async dragSlider(sliderElement, xOffset, yOffset, name="slider", timeout=standard_timeout) {
        try {
            await sliderElement.waitForExist({ timeout:timeout });
            await sliderElement.waitForDisplayed({ timeout:timeout });
            await sliderElement.dragAndDrop({ x: xOffset, y: yOffset });
        } catch (error) {
            logger.error(`In ${name},'Error dragging slider:${error}`);
            assert.fail(`In ${name},'Error dragging slider:${error}`);
        }
    }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
 * Asynchronously copies text from one input element and pastes it into another.
 * * Use the `ClearFieldValue` method if you want to remove the values inside the fields before pasting.
 * @param {string} copyInputelement - The selector of the input element from which to copy text.
 * @param {string} pasteInputeElement - The selector of the input element into which to paste text.
 * @param {string} [name="copy and paste"] - Optional name for logging and error handling.
 * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds).
 */
    async copyAndPaste(copyInputelement, pasteInputeElement, name="copy and paste", timeout=standard_timeout) {
        try {
            await this.waitForDisplayedAndClick(copyInputelement, "copyInputelement", timeout);
            await browser.keys([Key.Ctrl, 'a']); // Select all text
            await browser.keys([Key.Ctrl, 'c']); // Copy selected text
            await this.waitForDisplayedAndClick(pasteInputeElement, "pasteInputelement", timeout);
            await browser.keys([Key.Ctrl, 'v']); // Paste copied text
        } catch (error) {
            logger.error(`Error occurred in ${name} : ${error}`);
            assert.fail(`Error occurred in ${name} : ${error}`);
        }
    }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        /**
     * Switches the Selenium WebDriver focus to the specified iframe element.
     * @param {string} iframeElement - The iframe element to switch to.
     * @param {string} [name="iframe"] - Optional name for logging and error handling.
     * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds).
     */

    async switchToIframe(iframeElemet, name="iframe", timeout=standard_timeout) {
        try {
            await iframeElemet.waitForExist({ timeout:timeout });
            await iframeElemet.waitForDisplayed({ timeout:timeout });
            const frame = await iframeElemet
            await browser.switchToFrame(frame)
        } catch (error) {
            logger.error(`Error occurred in ${name} : ${error}`);
            assert.fail(`Error occurred in ${name} : ${error}`);
        }
    }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /**
         * Asynchronously converts the first letter of each word in a string to uppercase
         * @param {string} value - The string to be processed
         */

    async firstLettersUppercase(value) {
        let value_updated = value.split(" ").map(key=>{
            return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
        });
        value_updated = value_updated.join(" "); 
        return  value_updated
    }


}
module.exports = new BasePage;










