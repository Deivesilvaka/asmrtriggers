'use strict'

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const routes = require("./routes")

const findNewContentes = require("./src/controllers/crawler")

setInterval(async() => {
    await findNewContentes()
}, 40000)

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(routes)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})