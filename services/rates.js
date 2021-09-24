const {getRates} = require ('./thinker')

module.exports = {
    ratesByTime: async (date,symbols) => {
        if (symbols && typeof symbols === 'string') symbols = [symbols]

        const {error, rates} = await getRates(date, symbols)

        return {error, rates}
    },
    ratesLast: async (symbols) =>{
        if (symbols && typeof symbols === 'string') symbols = [symbols]

        const {error, rates} = await getRates("latest", symbols)

        return {error, rates}

    }
};

