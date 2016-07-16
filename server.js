var restify = require('restify');
var builder = require('botbuilder');
 
var port = process.env.PORT || 8080;
 
// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'ffdf8cfa-5648-4055-bf00-955852fcc088', appSecret: '50saqFgDmP7yR1a7sL9E0Vs' });

var dialog = new builder.CommandDialog();

dialog.matches(['Hi', 'Hello', 'こんにちは'], function (session) {
session.send('こんにちは');
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