const express = require ('express')
const PORT =  5000

const app = express()
app.use(express.json({ extended: true }))
app.use('/api/', require('./routes/index'))
app.listen(PORT, () => console.log(`Started on port ${PORT}...`))


