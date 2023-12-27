'use strict';
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const puppeteer = require('puppeteer');
const { Builder, Capabilities } = require('selenium-webdriver');
//const chrome = require('selenium-webdriver/chrome');
const chrome = require('selenium-webdriver/chrome');
let proxy = require('selenium-webdriver/proxy');
const cheerio = require('cheerio');

// Translator API endpoint and keys
let endpoint = process.env.ENDPOINT;
let key = process.env.TRANSLATOR_KEY;
let location = process.env.RESOURCE_LOCATION;

// Telegram Bot setup
const token = process.env.API_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Proxy and user agent configuration for web scraping
const proxyArray = process.env.PROXY_ARRAY;
const userAgentsArray = process.env.USER_AGENTS_ARRAY;

let chuckNorrisJokes = null;

// Function to set up Selenium WebDriver for web scraping
async function setupBrowser() {
    const proxyServer = getRandomEntry(proxyArray);// "212.56.139.253:80";
    const userAgent = getRandomEntry(userAgentsArray);
    const capabilities = Capabilities.chrome();
    capabilities.set('chromeOptions', {
        args: [
            `--proxy-server=${proxyServer}`,
            `--user-agent=${userAgent}`,
            '--ignore-certificate-errors',
            // Add other Chrome options as needed
        ],
    });

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().setUserPreferences({ credential_enable_service: false }))
        .withCapabilities(capabilities)
        .build();

    return driver;
}
    /*
    const browser = await puppeteer.launch({ headless: "false" },{
        args: [
            `--proxy-server=${proxyServer}`,
            `--user-agent=${userAgent}`,
        ],
    });

    return browser
}
*/
// Function to get a random entry from an array
function getRandomEntry(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

/*

async function setupBrowser() {
    const proxyServer = getRandomEntry(proxyArray);// "212.56.139.253:80";
    const userAgent = getRandomEntry(userAgentsArray);
    const browser = await puppeteer.launch({ headless: "false" }, {
        args: [
            `--proxy-server=${proxyServer}`,
            `--user-agent=${userAgent}`,
        ],
    });

    return browser
}
async function scrapeJokes() {
    const browser = await setupBrowser();
    const page = await browser.newPage();
    const jokes = [];
    try {
        await page.goto('https://parade.com/968666/parade/chuck-norris-jokes/');
        const html = await page.content();
        console.log(html);
        const $ = cheerio.load(html);
        $('li:contains("Chuck")').each((index, element) => {
            jokes.push($(element).text());
        });
       
        //console.log('Chuck Norris Jokes:', jokes.length, jokes);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
    return jokes;
}



async function setupBrowser() {
    const proxyServer = getRandomEntry(proxyArray);// "212.56.139.253:80";
    const userAgent = getRandomEntry(userAgentsArray);
    const capabilities = Capabilities.chrome();
    capabilities.set('chromeOptions', {
        args: [
            `--proxy-server=${proxyServer}`,
            `--user-agent=${userAgent}`,
            '--ignore-certificate-errors',
            // Add other Chrome options as needed
        ],
    });

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().setUserPreferences({ credential_enable_service: false }))
        .withCapabilities(capabilities)
        .build();

    return driver;
}
async function scrapeJokes() {
    const driver = await setupBrowser();
    //const page = await browser.newPage();
    const jokes = [];
    try {
        await driver.get('https://parade.com/968666/parade/chuck-norris-jokes/');
        const html = await driver.getPageSource();
        //console.log(html);
        const $ = cheerio.load(html);
        $('li:contains("Chuck")').each((index, element) => {
            jokes.push($(element).text());
        });
       
        //console.log('Chuck Norris Jokes:', jokes.length, jokes);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await driver.quit();
    }
    return jokes;
}
        await page.goto('https://www.google.com/travel/flights/search?tfs=CBwQAhooEgoyMDI0LTAzLTA4agwIAhIIL20vMDdxenZyDAgCEggvbS8wNGpwbBooEgoyMDI0LTAzLTE3agwIAhIIL20vMDRqcGxyDAgCEggvbS8wN3F6dkABSAFwAYIBCwj___________8BmAEB&tfu=CmRDalJJYmpRd1UzbzVSVVYyWW1kQlJsOVplRkZDUnkwdExTMHRMUzB0ZDJWaWVtTXhNMEZCUVVGQlIxZExiVzVKU0V4Sk1EWkJFZ0V4R2dvSWtBSVFBQm9EU1V4VE9DbHc0am89');
        const html = await page.content();
        //await driver.sleep(2000);
        //console.log(html);
        const $ = cheerio.load(html);
        $('li.pIav2d').each((index, element) => {
            jokes.push($(element).text());
        });
      
 */
// Function to scrape Chuck Norris jokes from the parade.com website
async function scrapeJokes() {
    const driver = await setupBrowser();
    //const page = await browser.newPage();
    const jokes = [];
    try {
        await driver.get('https://parade.com/968666/parade/chuck-norris-jokes/');
        const html = await driver.getPageSource();
        //console.log(html);
        const $ = cheerio.load(html);
        $('li:contains("Chuck")').each((index, element) => {
            jokes.push($(element).text());
        });

        //console.log('Chuck Norris Jokes:', jokes.length, jokes);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await driver.quit();
    }
    return jokes;
}

// start scraping
scrapeJokes()
    .then(jokes => {
        // Do something with the jokes
        chuckNorrisJokes = jokes
        //console.log('Jokes:', chuckNorrisJokes);

        // Wait for 5 seconds before proceeding
        //return new Promise(resolve => setTimeout(resolve, 5000));
    })

    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });



// Bot command to start and set language
bot.onText(/\/start/, (msg) => {

    const welcome = "Welcome to the Chuck Norris jokes bot! \nGet ready for 101 wild jokes in any language you like!";
    const languageInstructions = "To kick things off, choose your language with the command: set language <your_language> (e.g., set language english)";

    bot.sendMessage(msg.chat.id, welcome);
    bot.sendMessage(msg.chat.id, languageInstructions);

});

// Variables to store user language and selected joke number
let userLanguage = null;
let jokeNumber = null;
let languageCode = null;

// Bot message event handling for different typs of messages
bot.on('message', async (msg) => {
    //console.log(msg.text);

    if (msg.text.includes("set language")) {
        handleSetLanguageMessage(msg);
    }
    else {
    // Check if the received message is a number between 1 and 101
        const userNum = parseInt(msg.text, 10);
        if (!isNaN(userNum)) {
            if (userNum >= 1 && userNum <= 101) {
                //console.log("languageCode:", languageCode);
                if (languageCode !== null) {
                    handleNumberMessage(msg, userNum);
                } else {
                    bot.sendMessage(msg.chat.id, "set language first");
                }
            }
            else {
                bot.sendMessage(msg.chat.id, "please Select a number between 1-101");
            }
        }
        else if (!msg.text.includes("start")){
            bot.sendMessage(msg.chat.id, "either set language or choose a joke");
        }
    }
    
    
});

// Function to handle setting the language
async function handleSetLanguageMessage(msg) {
    userLanguage = msg.text.split(" ")[2];

    try {
        languageCode = await getLanguageCode(userLanguage);

        if (languageCode !== null) {
            const noProblem = "No problem \nplease Select a number between 1-101 to get a joke";
            const translationResult = await translateText(endpoint, key, location, noProblem, languageCode);

            if (translationResult !== null) {
                bot.sendMessage(msg.chat.id, translationResult);
            } else {
                console.log("Translation is null");
            }
        } else {
            const errorMessage = `${userLanguage} is not supported for translation.\nPlease choose a different language.`;
            //console.error(errorMessage);
            bot.sendMessage(msg.chat.id, errorMessage);
        }
    } catch (error) {
        handleError(error, msg.chat.id);
    }
}

// Function to handle processing a number message
async function handleNumberMessage(msg, userNum) {
    jokeNumber = userNum;

    const translationResult = await translateText(endpoint, key, location, chuckNorrisJokes[jokeNumber - 1], languageCode);

    if (translationResult !== null) {
        const sendJoke = `${jokeNumber}. ${translationResult}`;
        bot.sendMessage(msg.chat.id, sendJoke);
    } else {
        console.log("Translation is null");
    }
}

// Function to detect the language and get its two-letter code
async function getLanguageCode(inputLanguage) {
    try {
        const response = await axios.get(`${endpoint}/languages?api-version=3.0&scope=translation`);
        const supportedLanguages = response.data.translation;

        for (const code in supportedLanguages) {
            if (supportedLanguages[code].name.toLowerCase() === inputLanguage.toLowerCase()) {
                return code;
            }
        }

        return null;
    } catch (error) {
        handleError(error);
        throw error;
    }
}

// Function to perform translation
async function translateText(endpoint, key, location, text, languageCode) {
    try {
        const response = await axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'from': 'en',
                'to': languageCode
            },
            data: [{
                'text': text
            }],
            responseType: 'json'
        });

        const translations = response.data[0].translations;

        if (translations && translations.length > 0) {
            const textValue = translations[0].text;
            return textValue;
        } else {
            console.error('No translations found.');
            return null;
        }
    } catch (error) {
        handleError(error);
        throw error;
    }
}


function handleError(error, chatId) {
    console.error('Error:', error);

    // Log additional details if available
    if (error.message) {
        console.error('Error Message:', error.message);
    }
    if (error.stack) {
        console.error('Error Stack:', error.stack);
    }
    if (error.name) {
        console.error('Error Name:', error.name);
    }

    bot.sendMessage(chatId, 'An error occurred. Please try again.');
}












