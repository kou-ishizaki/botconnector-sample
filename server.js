var restify = require('restify');
var builder = require('botbuilder');
 
var port = process.env.PORT || 8080;
 
// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'dbab687a-7315-40f6-a71b-63b63e3f159a', appSecret: 'yyDzwKftgbNmzGsrYCP4GPV' });

var dialog = new builder.CommandDialog();

dialog.matches(['Hi', 'Hello', 'こんにちは'], function (session) {
session.send('こんにちは!! 今日はいい天気なもし♪');
});

//******因島観光とは

dialog.matches(['向島へ遊びに行きたいんだけど'], function (session) {
session.send('ほたら、どれぐらいの時間有るの〜\n 1.数時間だよ\n 2.しまなみ海道走りたい\n 3.よく分かんないや');
});

dialog.matches(['1'], function (session) {
session.send('じゃあ、尾道渡船フェリーのりばから「てくてくMAP」がオススメだよ!!');
});



/*
dialog.matches(['1'], function (session) {
session.send('ほしたら、何が食べたいの〜？？\n 1.普通\n 2.さっぱり\n 3.がっつり\n 4.ならでは\n 5.みきゃんのおススメ\n');
});

dialog.matches(['3'], function (session) {
session.send('ほなら、ここがおススメよ〜\n https://goo.gl/CquU3d');
});

dialog.matches(['2'], function (session) {
session.send('ほなら、この公園とかおススメよ〜\n https://goo.gl/FW8kM2');
});

dialog.matches(['6'], function (session) {
session.send('ほなら、湯めぐりサイクル　ゆっクル♪\n https://goo.gl/fEIQT0');
});

dialog.matches(['5'], function (session) {
session.send('向島町の天気ならコチラ\n https://goo.gl/VAjcD7');
});
*/

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