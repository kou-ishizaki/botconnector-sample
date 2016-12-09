var restify = require('restify');
var builder = require('botbuilder');
 
var port = process.env.PORT || 8080;
 
// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'dbab687a-7315-40f6-a71b-63b63e3f159a', appSecret: 'yyDzwKftgbNmzGsrYCP4GPV' });

var dialog = new builder.CommandDialog();

dialog.matches(['Hi', 'Hello', 'こんにちは'], function (session) {
session.send('こんにちは!! 今日はいい天気なもし♪');
});

dialog.matches(['この近くの情報を教えてみきゃん!!','もう1回教えてみきゃん!!'], function (session) {
session.send('ほたら、何について知りたいの〜\n 1.お腹すいた\n 2.休憩したい\n 3.遊びたい\n 4.トイレに行きたい\n 5.この後の天気');
});

dialog.matches(['1'], function (session) {
session.send('ほしたら、何が食べたいの〜？？\n 1.普通\n 2.さっぱり\n 3.がっつり\n 4.ならでは\n 5.みきゃんのおススメ\n');
});

dialog.matches(['3'], function (session) {
session.send('ほなら、ここがおススメよ〜\n https://goo.gl/CquU3d');
});

dialog.matches(['2'], function (session) {
session.send('ほなら、この公園とかおススメよ〜\n https://goo.gl/FW8kM2');
});


bot.add('/', dialog);

//bot.add('/', function (session) {

//   session.send('Hello World'); 

//});
 
// Setup Restify Server
var server = restify.createServer();
server.post('/v1/messages', bot.verifyBotFramework(), bot.listen());
server.listen(port, function () {
   console.log('%s listening to %s', server.name, server.url); 
});