// https://www.npmjs.com/package/telebot 참조
// ** 중요
// config.json이라는 이름의 파일에 다음 내용이 들어있도록 파일을 새로 만들어주세요.
//
// {"api_key":"YOUR_TOKEN","subscriber_ids":[]}
// YOUR_TOKEN이 있는 부분에는 발급받은 API키를 입력해주세요.

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
    
    /exit 구독 취소
    /info 봇 정보`);
});

// 구독 취소시
bot.on(['/exit'], (msg) => {
    config.subscriber_ids.delete(msg.from.id);
    configUtils.saveConfig(config);
    return msg.reply.text(`구독을 취소했습니다.
    다시 구독하려면 /start 를 눌러주세요.`);
});

// 봇 정보 요청시
bot.on(['/info'], (msg) => {
    return msg.reply.text(`봇 정보입니다.
    소스코드는 다음 주소로 가시면 확인하실 수 있습니다.
    https://github.com/lleellee0/crawlAndNotify`);
});

setTimeout(() => {
    // 10초 후 진행할 작업을 넣어주세요.
    // 모든 구독자에게 메시지 보내기 : config.subscriber_ids.forEach(v=>bot.sendMessage(v, `${v}에게 메시지 보냅니당~~`));
}, 10000);

const request = require('request');
const cheerio = require('cheerio');

let isFirstRequest = true;
const topLink = '';

const requestNaverWebtoonNoti = () => {
    request('https://comic.naver.com/notice/list.nhn?searchWord=%EC%9C%A0%EB%A3%8C%ED%99%94', (err, res, body) => {
    if(err) throw err;
    const $ = cheerio.load(body);
    let targetElement = $('table.tbl_notice tr a')[0];
    if(isFirstRequest)
            topLink = targetElement.attribs.href;
        else
            if(topLink != targetElement.attribs.href) {  // 두번째 실행부터 비교를 했을 때 서로 다르다면 구독자에게 알려주기 + topLink 갱신
                config.subscriber_ids.forEach(v=>bot.sendMessage(v, `새로운 글이 감지되었습니다.
                https://comic.naver.com${targetElement.attribs.href}`));
                topLink = targetElement.attribs.href;
            }
    if(isFirstRequest)  // 첫번째 실행이 종료되었음.
        isFirstRequest = false;

});
}

requestNaverWebtoonNoti();
setInterval(() => {
    // 하루에 한번마다 진행할 작업을 넣어주세요.
   requestNaverWebtoonNoti(); 
}, 1000 * 60 * 60 * 24);

bot.start();