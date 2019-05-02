const cmmToken = require("../../const.json").cmmToken
import { OptionsWithUri } from "request-promise";

export const requestOptions:OptionsWithUri = {
    method: "GET",
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    qs:{
        symbol:'',
        convert:'USD'
    },
    headers: {
      'X-CMC_PRO_API_KEY': cmmToken
    },
    json: true,
    gzip: true
};
