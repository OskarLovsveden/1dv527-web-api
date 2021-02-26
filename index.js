require('dotenv').config()

const express = require('express')
const mongoose = require('./config/mongoose')
const app = express()

// mongoose.connect().catch(error => {
//     console.error(error)
//     process.exit(1)
// })

app.use(express.urlencoded({
    extended: false
}))

app.use('/', (req, res) => res.send('test'))

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
    console.log('Press Ctrl-C to terminate...')
})
