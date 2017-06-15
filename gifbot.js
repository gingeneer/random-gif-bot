var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var variables = require('./variables');
var request = require('request');

var token = variables['token'];
var bot = new TelegramBot(token, { polling: true });
console.log("bot started");

bot.onText(/\/nomnom/, function (msg, match) {sendGif("food", msg);});

bot.onText(/\/food/, function (msg, match) {sendGif("food", msg);});

bot.onText(/\/drink/, function (msg, match) {sendGif("drink", msg);});

bot.onText(/\/drunk/, function (msg, match) {sendGif("drunk", msg);});

bot.onText(/\/pivo/, function (msg, match) {sendGif("beer", msg);});

bot.onText(/\/beer/, function (msg, match) {sendGif("beer", msg);});

bot.onText(/\/coffee/, function (msg, match) {sendGif("coffee", msg);});

bot.onText(/\/chill/, function (msg, match) {sendGif("chill", msg);});

bot.onText(/\/gif/, function (msg, match) {
    if (msg.text === "/gif" || msg.text === "/gif@RandomGif_spamBot") {
        sendGif("", msg);
    } else {
        var searchTerm = msg.text.replace(/\/gif/g, "").replace(/@RandomGif_spamBot/g, "").trim().replace(/ /g, "+");
        sendGif(searchTerm, msg);
    }
});

function sendGif(tag, msg) {
    url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=r&tag=" + tag;
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
}