var restify = require('restify');
var builder = require('botbuilder');
 
var port = process.env.PORT || 8080;
 
// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'ffdf8cfa-5648-4055-bf00-955852fcc088', appSecret: '50saqFgDmP7yR1a7sL9E0Vs' });
bot.add('/', function (session) {
   session.send('Hello World'); 
});
 
// Setup Restify Server
var server = restify.createServer();
server.post('/v1/messages', bot.verifyBotFramework(), bot.listen());
server.listen(port, function () {
   console.log('%s listening to %s', server.name, server.url); 
});