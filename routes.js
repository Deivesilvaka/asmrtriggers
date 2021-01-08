'use strict'

const routes = require("express").Router()
const keywordsController = require("./src/controllers/keywordsController")
const catchController = require("./src/controllers/catcherController")
const supportersController = require("./src/controllers/supportersController")
const paypalController = require("./src/controllers/doanteController")
const { join } = require("path")

//VIDEOS

routes.get("/catch", catchController.catchVideos)

routes.get("/specific", catchController.catchSpecificVideo)

routes.get("/recomendacoes", catchController.recomendacoes)

//DATAS

routes.get("/", keywordsController.loadDatas)

routes.post("/savePreferences", keywordsController.savePreferences)

routes.get("/download", keywordsController.download)

routes.get("/supporters", supportersController.getAllSupporters)

routes.post("/addSupporter", supportersController.saveSupporter)


//DONATES

routes.get("/donate", paypalController.Donate)

routes.get("/success", (req, res) => {
    res.sendFile(join(__dirname, "src", "public", "index.html"))
})

routes.get("/cancel", (req, res) => {
    res.json({message:"que pena o processo de doação não pode continuar :(."})
})

module.exports = routes