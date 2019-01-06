const configUtils = require('./config_utils.js');
const config = require('./config.json');

configUtils.loadConfig(config);

const TeleBot = require('telebot');
let bot = new TeleBot(config.api_key);

// 처음 입장시
bot.on(['/start', '/hello'], (msg) => {
    config.subscriber_ids.add(msg.from.id);
    configUtils.saveConfig(config);
    return msg.reply.text(`어서오세요! 새로운 구독자를 추가했습니다.
    다음과 같은 명령어를 사용하실 수 있습니다.
    
    /naver_webtoon : 네이버 웹툰 유료화 알림
    /etc : 기타 등등`);
});

bot.start();