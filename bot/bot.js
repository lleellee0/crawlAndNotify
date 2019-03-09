// https://www.npmjs.com/package/telebot 참조

const configUtils = require('../conf/config_utils.js');
const config = require('../conf/config.json');

configUtils.loadConfig(config);

const TeleBot = require('telebot');
let bot = new TeleBot(config.api_key);

// 처음 입장시
bot.on(['/start', '/hello'], (msg) => {
    config.subscriber_ids.add(msg.from.id);
    configUtils.saveConfig(config);
    return msg.reply.text(`
    어서오세요! 새로운 구독자를 추가했습니다.
    다음과 같은 명령어를 사용하실 수 있습니다.
    
    /exit 구독 취소
    /info 봇 정보
    `);
});

// 구독 취소시
bot.on(['/exit'], (msg) => {
    config.subscriber_ids.delete(msg.from.id);
    configUtils.saveConfig(config);
    return msg.reply.text(`구독을 취소했습니다.
    다시 구독하려면 /start 를 눌러주세요.`);
});

bot.start();
module.exports = {
    bot: bot
}