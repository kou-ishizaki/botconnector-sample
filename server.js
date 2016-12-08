var restify = require('restify');
var builder = require('botbuilder');
 
var port = process.env.PORT || 8080;
 
// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'dbab687a-7315-40f6-a71b-63b63e3f159a', appSecret: 'yyDzwKftgbNmzGsrYCP4GPV' });

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


// 起動時のハンドリング
dialog.matches('名前おしえるね', function (session) {
  if (! session.userData.firstName) {
    session.beginDialog('/profile/first');
  } else if(! session.userData.lastName) {
    session.beginDialog('/profile/last');
  } else {
    session.send(session.userData.lastName + session.userData.firstName + '・・・');
    session.send('覚えたぞ！！！');
  }
});

// ファーストネームを聞く処理
slackBot.add('/profile/first', [
    function (session) {
        builder.Prompts.text(session, 'ファーストネーム教えて！！！');
    },
    function (session, results) {
        session.userData.firstName = results.response;
        session.endDialog();
    }
]);

// ラストネームを聞く処理
slackBot.add('/profile/last', [
    function (session) {
        builder.Prompts.text(session, 'ラストネーム教えて！！！');
    },
    function (session, results) {
        session.userData.lastName = results.response;
        session.endDialog();
    }
]);



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