const express = require('express')
const app = express()
const path = require('path')
const databaseApi = require('./server/routes/databaseApi')
const externalApi = require('./server/routes/externalApi')


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', databaseApi)
app.use('/', externalApi)


const port = 3000
app.listen((process.env.PORT || port), function() {
    console.log(`Server running on port ${port}`)
})