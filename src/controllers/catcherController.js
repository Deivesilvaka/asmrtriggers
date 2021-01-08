"use strict"

const { cluster } = require("fetchyt")
const { load } = require("../keywords/keyswords")
const { loadDB } = require("../database/editDatabase")
const deleteDuplicateItems = require("./deleteDuplicate")

async function loadVideos(content, contentArray) {
    const newMap = []
    const indexArray = []

    for(let i = 0; i <= 15; i++){
        indexArray.push(Math.floor(Math.random() * contentArray.length))
    }

    const newIndexArray = [... new Set(indexArray)]

    for(let i = 0; i < newIndexArray.length; i++){
        newMap.push(await cluster([`asmr ${content} ${contentArray[newIndexArray[i]]}`]))
    }

    return newMap
}

module.exports = {

    async catchVideos(req, res) {
        const {content} = req.query

        const Array = await loadDB()
        const contentArray = Array[content]

        return res.json(contentArray)
    },

    async catchSpecificVideo(req, res) {
        const {content} = req.query

        const Array = await load()
        const contentArray = Array["specific"]
        const newMap = await loadVideos(content, contentArray)

        const withouDuplicateideos = deleteDuplicateItems(newMap)

        return res.json(withouDuplicateideos)
    },

    async recomendacoes(req, res) {

        const content = ""

        const Array = await load()
        const contentArray = Array["recomendacoes"]
        const newMap = await loadVideos(content, contentArray)

        const withouDuplicateideos = deleteDuplicateItems(newMap)

        return res.json(withouDuplicateideos)
    }

}