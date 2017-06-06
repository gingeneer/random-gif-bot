var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var variables = require('./variables');
var request = require('request');

var token = variables['token'];
var bot = new TelegramBot(token, { polling: true });
console.log("bot started");

bot.onText(/\/gif/, function (msg, match) {
    var url = "";
    if (msg.text === "/gif" || msg.text === "/gif@RandomGif_spamBot") {
        console.log("random gif");
        url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=r"
    } else {
        var searchTerm = msg.text.replace(/\/gif/g, "").replace(/@RandomGif_spamBot/g, "").trim().replace(/ /g, "+");
        console.log(searchTerm);
        url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=r&tag=" + searchTerm;
    }
    request({ url: url, json: true }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (body.data.length != 0) {
                var response = body.data.image_mp4_url;
                bot.sendVideo(msg.chat.id, response);
            } else {
                bot.sendMessage(msg.chat.id, "¯\\_(ツ)_/¯");

            }
        }
        else {
            console.error(error);
            bot.sendMessage(msg.chat.id, "¯\\_(ツ)_/¯");

        }
    });
});