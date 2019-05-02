"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Telegraf = require("telegraf");
var request_promise_1 = __importDefault(require("request-promise"));
var tokens = require("../const.json");
var cryptoRequest_1 = require("./cryptoRequest/cryptoRequest");
var bot = new Telegraf(tokens.botToken);
bot.start(function (ctx) {
    ctx.reply("\nGood day, sir!\nYou want know cryptocurrency? Just type one of the next commands:\n/btc- BTC-USD\n/eth- ETH-USD\n/ltc- LTC-USD\n");
});
function requestToCrypro(crypto, ctx, customResponse) {
    if (customResponse === void 0) { customResponse = ''; }
    var requestOptionsLocal = cryptoRequest_1.requestOptions;
    requestOptionsLocal.qs.symbol = crypto;
    request_promise_1.default(requestOptionsLocal).then(function (response) {
        console.log(response.data);
        ctx.reply((customResponse || crypto + ":") + Math.round(response.data[crypto].quote.USD.price) + "$");
    }).catch(function (err) {
        console.log('Error, WTF???', err);
        if (err.statusCodeError == 400) {
            throw err;
        }
        ctx.reply("\nOops, there was an error :(\nI don't know what to do, try to write to my creator @meugenn\n        ");
    });
}
bot.command('btc', function (ctx) {
    requestToCrypro("BTC", ctx);
});
bot.command('ltc', function (ctx) {
    requestToCrypro("LTC", ctx);
});
bot.command('eth', function (ctx) {
    requestToCrypro("ETH", ctx);
});
bot.command('currency', function (ctx) {
    try {
        requestToCrypro(ctx.message.text.slice(9).toUpperCase(), ctx);
    }
    catch (err) {
        console.log('You are in currency error. Как ты дожил до жизни такой?');
        ctx.reply('Sorry, i don\'t know this crypto');
    }
});
bot.launch();
