const {Router} = require('express')
const {ratesByTime,ratesLast} = require ('../../services/rates')
const router = Router()

router.get('/:date', async (req, res) => {
    const symbols = req.query.symbols? req.query.symbols.split(','): []
    const date = req.params.date && Date.parse(req.params.date)? req.params.date : ""
    try {
        const rates = await ratesByTime(date,symbols)
        res.json(rates)
    } catch (e) {
        res.status(500).json({ message: 'Something wrong, let\'s try again', error : e  })
    }
})

router.get('/', async (req, res) => {
    const symbols = req.query.symbols? req.query.symbols.split(','): []
    try {
        const rates = await ratesLast(symbols)
        res.json(rates)
    } catch (e) {
        res.status(500).json({ message: 'Something wrong, let\'s try again', error : e })
    }
})

module.exports = router


