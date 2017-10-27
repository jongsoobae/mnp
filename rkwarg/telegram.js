const TelegramBot = require('node-telegram-bot-api');

const token = '451117040:AAHmBDqJhZkWLU4cthzb6QkeIPpwXKkpYbk';

const bot = new TelegramBot(token, {polling: false});

exports.bot = bot;

