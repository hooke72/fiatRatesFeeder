const {exchangeRates} = require ( './exchangerate')
const {fixerRates} = require('./fixer')
const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

const externalApis = [
    exchangeRates,
    fixerRates
]

client.on("error", function (err) {
    console.log("Error " + err);
});

function filterRates(symbols,allRates, error) {
    if (symbols.length===0){
        return {error: null, rates: allRates}
    }
    let rates = {}
    symbols.forEach(symbol => {
        if (allRates[symbol.toUpperCase()]){
            rates[symbol.toUpperCase()] = allRates[symbol.toUpperCase()]
        } else {
            error = `Missed one or more rates. ${error || ""}`
        }
    })
    return {error, rates}
}

module.exports = {
    getRates: async (date,symbols) => {
        if (symbols && typeof symbols === 'string') symbols = [symbols]
        let error = null
        const indexDate = date==="latest"? (new Date()).toISOString().split('T')[0]: date
        let rates = await client.get(indexDate);
        if (rates && rates !== "null" && Object.keys(rates).length > 0){
            const filtered = filterRates(symbols, JSON.parse(rates))
            return {...filtered}
        }
        for (let externalApi of externalApis){
            const externalData = await externalApi(date)
            if (!externalData.error) {
                rates = externalData.rates
                break
            }  else {
                rates = {}
                error = error? `${error}, ${externalData.error}` : externalData.error
            }
        }
        await client.set(indexDate,JSON.stringify(rates))
        const filteredRaw = filterRates(symbols, rates, error)
        return {...filteredRaw}
    }
};
