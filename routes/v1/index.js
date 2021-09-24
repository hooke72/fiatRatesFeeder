const express = require('express')

const router = express()

router.use('/rates', require('./rates.routes'))

router.get('/', async (req, res) => {
    try {
        res.json({ message: 'API V1 is running' })
    } catch (e) {
        res.status(500).json({ message: 'Something wrong, let\'s try again', error : e  })
    }
})

module.exports = router
