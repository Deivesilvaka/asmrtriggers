"use strict"

const { cluster, yts } = require("fetchyt")
const { load } = require("../keywords/keyswords")
const { loadDB } = require("../database/editDatabase")
const deleteDuplicateItems = require("./deleteDuplicate")
const loadBalancer = require('../functions/loadBalancer')

async function loadVideos(content, contentArray) {
    const newMap = []
    const indexArray = []

    for(let i = 0; i <= 20; i++){
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

        const contentData = await yts(`asmr ${content}`)

        //Load Balancer ( remove ilegal contents )
        const familyFriendlyContent = await loadBalancer(contentData)

        return res.json(familyFriendlyContent)
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