"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cmmToken = require("../../const.json").cmmToken;
exports.requestOptions = {
    method: "GET",
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    qs: {
        symbol: '',
        convert: 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': cmmToken
    },
    json: true,
    gzip: true
};
