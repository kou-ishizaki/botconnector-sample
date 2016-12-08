var restify = require('restify');
var builder = require('botbuilder');
 
var port = process.env.PORT || 8080;
 
// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'dbab687a-7315-40f6-a71b-63b63e3f159a', appSecret: 'yyDzwKftgbNmzGsrYCP4GPV' });

var dialog = new builder.CommandDialog();

dialog.matches(['Hi', 'Hello', 'こんにちは'], function (session) {
session.send('こんにちは');
});

dialog.matches(['あなた誰？'], function (session) {
session.send('見てのとおり みきゃんだよ〜!!!');
});

dialog.matches(['困ってるんだけど'], function (session) {
session.send('何についてにゃん？');
});

dialog.matches(['お腹すいた'], function (session) {
session.send('八昌のお好み焼きをどうぞ!!　http://tabelog.com/hiroshima/A3401/A340101/34000100/');
});

dialog.matches(['オリンピック会場について教えて', '会場について'], function (session) {
session.send('こちらをご覧ください http://2020tokyo2020.com/jp/olympic/stadium.html');
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