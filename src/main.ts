"use strict";
const Telegraf = require("telegraf");
import rp from 'request-promise'
const tokens = require("../const.json");
import {requestOptions} from './cryptoRequest/cryptoRequest'
import { ContextMessageUpdate} from "telegraf";
import { Response } from "request";

const bot = new Telegraf(tokens.botToken);

bot.start((ctx:ContextMessageUpdate)=> {ctx.reply(`
Good day, sir!
You want know cryptocurrency? Just type one of the next commands:
/btc- BTC-USD
/eth- ETH-USD
/ltc- LTC-USD
`)});

function requestToCrypro(crypto: string, ctx: ContextMessageUpdate, customResponse:string = ''){
    let requestOptionsLocal = requestOptions
    requestOptionsLocal.qs.symbol = crypto

    rp(requestOptionsLocal).then((response:Response)=>{
        console.log(response.data)
        ctx.reply((customResponse|| crypto+":") + Math.round(response.data[crypto].quote.USD.price) + "$")
    }).catch((err)=>{
        console.log('Error, WTF???', err)
        if (err.statusCodeError == 400){
            throw err
        }


        ctx.reply(`
Oops, there was an error :(
I don't know what to do, try to write to my creator @meugenn
        `)
    })
}



bot.command('btc', (ctx:ContextMessageUpdate) => {
    requestToCrypro("BTC", ctx)
})
bot.command('ltc', (ctx:ContextMessageUpdate) => {
    requestToCrypro("LTC", ctx)
})
bot.command('eth', (ctx:ContextMessageUpdate) => {
    requestToCrypro("ETH", ctx)
})
bot.command('currency', (ctx:ContextMessageUpdate) => {
    try{
    requestToCrypro(ctx.message.text.slice(9).toUpperCase(), ctx)
    }
    catch (err) {
        console.log('You are in currency error. Как ты дожил до жизни такой?')
        ctx.reply('Sorry, i don\'t know this crypto')
    }
})
bot.launch();