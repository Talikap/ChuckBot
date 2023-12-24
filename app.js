'use strict';
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.API_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
let endpoint = "https://api-apc.cognitive.microsofttranslator.com";
let key = process.env.TRANSLATOR_KEY;
let location = process.env.RESOURCE_LOCATION;
//let chatId = null;

bot.onText(/\/start/, (msg) => {

    //chatId = msg.chat.id

    const welcome = "Welcome to the Chuck Norris jokes bot! \nGet ready for 101 wild jokes in any language you like!";
    const languageInstructions = "To kick things off, choose your language with the command: set language <your_language> (e.g., set language english)";

    bot.sendMessage(msg.chat.id, welcome);
    bot.sendMessage(msg.chat.id, languageInstructions);

});

let userLanguage = null;
let jokeNumber = null;
let languageCode = null;

bot.on('message', async (msg) => {
    console.log(msg.text);

    if (msg.text.includes("set language")) {
        handleSetLanguageMessage(msg);
    }

    // Check if the received message is a number between 1 and 101
    const userNum = parseInt(msg.text, 10);
    if (!isNaN(userNum) && userNum >= 1 && userNum <= 101) {
        console.log("languageCode:", languageCode);
        if (languageCode !== null) {
            handleNumberMessage(msg, userNum);
        } else {
            bot.sendMessage(msg.chat.id, "set language first");
        }
    }
});

const jokes = [
    "Chuck Norris doesn't read books. He stares them down until he gets the information he wants.",
    "Time waits for no man. Unless that man is Chuck Norris.",
    "If you spell Chuck Norris in Scrabble, you win. Forever.",
    "Chuck Norris breathes air ... five times a day.",
    "In the Beginning there was nothing ... then Chuck Norris roundhouse kicked nothing and told it to get a job."
];

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
            console.error(errorMessage);
            bot.sendMessage(msg.chat.id, errorMessage);
        }
    } catch (error) {
        handleError(error, msg.chat.id);
    }
}

async function handleNumberMessage(msg, userNum) {
    jokeNumber = userNum;
    const translationResult = await translateText(endpoint, key, location, jokes[jokeNumber - 1], languageCode);

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










