const EXCHANGE_RATE_URL = "https://api.1exchangerate.host/"
const axios = require('axios');

module.exports = {
    exchangeRates: async (date) =>{
        const params = {}
        const dataReq = date? date: "latest"
        try {
            const response = await axios.get(EXCHANGE_RATE_URL+dataReq, {
                params
            })
            return {error: null, rates: response.data.rates}
        } catch (e) {
            return {error: e.code+" "+e.hostname, rates: {}}
        }
    }
};


