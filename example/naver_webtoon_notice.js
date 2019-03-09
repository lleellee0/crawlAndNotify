// 네이버 웹툰 공지사항 알림에 대한 예제입니다.

const bot = require('../bot/bot.js').bot;
const config = require('../conf/config.json');

// 봇 정보 요청시
bot.on(['/info'], (msg) => {
    return msg.reply.text(`
    봇 정보입니다.
    소스코드는 다음 주소로 가시면 확인하실 수 있습니다.
    https://github.com/lleellee0/crawlAndNotify
    `);
});

const request = require('request');
const cheerio = require('cheerio');

let isFirstRequest = true;
let topLink = '';

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