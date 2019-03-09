# simple-telegram-notify

텔레그램 채널의 구독자를 추가/제거 할 수 있습니다. 그리고 구독자들에게 당신이 원하는 작업을 하여 알림을 줄 수 있습니다.

```
git clone https://github.com/lleellee0/simple-telegram-notify.git

conf/config.json 파일을 열고 BOT ACCESS TOKEN을 입력하고 저장해주세요.

your_job_here.js에 하고싶은 작업을 코드로 입력해주세요.

node your_job_here.js  라고 터미널에서 입력하면 당신의 봇이 실행됩니다.
```

기본 명령어
/start, /hello : 구독자 추가
/exit : 구독자 제거

다른 명령어는 추가할 수 있습니다.
다음과 같은 코드로 추가할 수 있습니다.
```
bot.on([/yourcommand], (msg) => {
  YOUR CODE
}
```


Add and subtract telegram channel subscribers. You can specify the actions that you want to repeat.

```
git clone https://github.com/lleellee0/simple-telegram-notify.git

Open conf/config.json And input your BOT ACCESS TOKEN

In your_job_here.js, write in code what you want to do.

node your_job_here.js  Type at terminal, you can run your bot.
```

basic command
/start, /hello : add subscriber
/exit : subtract subscriber

Otherwise you can add commands.
With the following code.
```
bot.on([/yourcommand], (msg) => {
  YOUR CODE
}
```
