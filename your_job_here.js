const bot = require('./bot/bot.js').bot;

// 봇 정보 요청시
bot.on(['/info'], (msg) => {
    return msg.reply.text(`
    봇 정보입니다.
    소스코드는 다음 주소로 가시면 확인하실 수 있습니다.
    https://github.com/lleellee0/crawlAndNotify
    `);
});

const your_function = () => {
    // TODO
}

your_function();
setInterval(() => {
   your_function(); 
}, 1000 * 60 * 60 * 24);    // 1 day interval

bot.start();