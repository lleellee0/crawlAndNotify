const config = require('./config.json');

console.log(config);

const TeleBot = require('telebot');
let bot = new TeleBot(config.api_key);

bot.on(['/start', '/hello'], (msg) => msg.reply.text('Welcome!'));
bot.start();