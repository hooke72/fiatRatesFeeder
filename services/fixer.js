const FIXER_APIKEY = "9be301da3739174282b9ee8c5ef378c0"
const FIXER_URL = "http://data.fixer.io/api/"
const axios = require('axios');

module.exports = {
    fixerRates: async (date) =>{
        const params = {
            access_key: FIXER_APIKEY
        }
        const dataReq = date? date: "latest"
        try {
            const response = await axios.get(FIXER_URL+dataReq, {
                params
            })
            return {error: null, rates: response.data.rates}
        } catch (e) {
            return {error: e.code+" "+e.hostname, rates: {}}
        }
    }
};



