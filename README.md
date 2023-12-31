# Project Name
ChuckBot

## Description
Chuck Norris Jokes Telegram Bot<br>
A Telegram bot that fetches Chuck Norris jokes and translates them into different languages using Azure Cognitive Services.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Web Scraping and Overcoming CAPTCHA Challenges](#web-scraping-and-overcoming-captcha-challenges)
- [Installation](#installation)
- [Usage](#usage)
- [Acknowledgments](#acknowledgments)

## Features

- This Telegram bot utilizes web scraping to fetch Chuck Norris jokes from the parade.com website.
- Fetches Chuck Norris jokes in multiple languages.
- Translates jokes into the language of your choice.
- Serves a collection of 101 hilarious jokes.

## Prerequisites

- Node.js installed
- Azure Cognitive Services Translator Text API key
- Telegram Bot API token
- Selenium WebDriver and Chrome installed on the machine

## Web Scraping and Overcoming CAPTCHA Challenges

The web scraping process is designed to overcome common challenges, including CAPTCHAs. Here's how it works:

1. **Selenium WebDriver Setup:** We use Selenium WebDriver to automate the browser interaction.
2. **Proxy and User-Agent Rotation:** To avoid detection and blocking, we rotate proxies and user agents, making the scraping process more resilient.
3. **Headless Browser:** The browser runs in headless mode to simulate user behavior without displaying the browser window.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Talikap/ChuckBot.git
   cd ChuckBot


Install dependencies using the npm install bash command:

# Project Dependencies

- dotenv
- node-telegram-bot-api
- axios
- uuid
- selenium-webdriver
- chrome
- cheerio

## Set up environment variables:

Create a `.env` file in the project root with the following content:

```env
ENDPOINT=<Your-Translator-Endpoint>
TRANSLATOR_KEY=<Your-Translator-API-Key>
RESOURCE_LOCATION=<Your-Resource-Location>
API_TOKEN=<Your-Telegram-Bot-API-Token>
PROXY_ARRAY=<Array-of-Proxies>
USER_AGENTS_ARRAY=<Array-of-User-Agents>
```
## Usage

Start the bot:

```bash
node app.js
```
Interact with the bot on Telegram: 

1.Go to telegram app and search tali_chuck_bot<br>
2.Start chatting by sending: /start<br>
3.Choose a language by sending: set language <your-language><br>
4.Get a joke: Enter a number between 1 and 101<br>

![demonstration](https://github.com/Talikap/ChuckBot/blob/master/ChuckBot.gif?raw=true)

## Acknowledgments

This project utilizes the Node.js Telegram Bot API library for interacting with the Telegram Bot API. Special thanks to the contributors of the Node.js Telegram Bot API for their work.

- [Node.js Telegram Bot API](https://github.com/yagop/node-telegram-bot-api)


