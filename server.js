var restify = require('restify');
var builder = require('botbuilder');
 
var port = process.env.PORT || 8080;
 
// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'dbab687a-7315-40f6-a71b-63b63e3f159a', appSecret: 'yyDzwKftgbNmzGsrYCP4GPV' });

var dialog = new builder.CommandDialog();

//=========================================================
// IntentDialogオブジェクトの用意
//=========================================================

// 認識に指定するLUIS APIのURLを指定
var recognizer = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v2.0/apps/ed81de53-5293-4f9e-acbb-41f678f4633a?subscription-key=3111f6e1c29d4036b49841e765412611');

// IntentDialogオブジェクトを作成
var intents = new builder.IntentDialog({
  recognizers: [recognizer]
});


//=========================================================
// 会話の処理
//=========================================================

// 初期ダイアログを、intentDialogとして使用する
bot.dialog('/', intents);

// インテントと処理の結びつけ
/*intents
    .matches('intentA', function (session, args) {

        // インテントが 'intentA' だったときの処理をここに記述します。

    });
intents
    .matches('intentB', function (session, args) {

        // インテントが 'intentB' だったときの処理をここに記述します。

    });
*/

//******通常のやりとり

dialog.matches(['こんにちは'], function (session) {
session.send('こんにちは!! 今日はいい天気だね♪\n ようこそ尾道へ');
});

dialog.matches(['Hi'], function (session) {
session.send('Welcome to Onomichi');
});

dialog.matches(['ラーメン食べたいな'], function (session) {
session.send('太るよ');
});

dialog.matches(['I want to eat ramen'], function (session) {
session.send('fat....');
});

//******向島観光とは(JP)

dialog.matches(['今から遊びに行けるところある？'], function (session) {
session.send('ほたら、どれぐらいの時間有るの〜\n 1.数時間だよ\n 2.しまなみ海道走りたい\n 3.よく分かんないや');
});

dialog.matches(['1'], function (session) {
session.send('じゃあ、尾道渡船フェリーのりばから「てくてくMAP」がオススメだよ!!\n https://goo.gl/0SXCIM');
});

//******向島観光とは(EN)

dialog.matches(['Is there a place to go for fun from now?'], function (session) {
session.send('mmm、How much time do you have?\n a.Its a few hours.\n b.I want to run Shimanami Kaido\n c.Well, I do not know.');
});

dialog.matches(['a'], function (session) {
session.send('Well、Encounter MAP" is recommended from the ferry departure from Onomichi ferry!!\n https://goo.gl/ku9adP');
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