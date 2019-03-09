const bot = require('./bot/bot.js').bot;

// 봇 정보 요청시
bot.on(['/info'], (msg) => {
    return msg.reply.text(`
    봇 정보입니다.
    소스코드는 다음 주소로 가시면 확인하실 수 있습니다.
    https://github.com/lleellee0/simple-telegram-notify

    /start 구독 확인
    /exit 구독 취소
    /info 봇 정보
    `);
});

const your_function = () => {
    // TODO
}

your_function();
setInterval(() => {
   your_function(); 
}, 1000 * 5);    // 5 seconds interval

bot.start();