"use strict"


const { saveDB, loadDB } = require("../database/editDatabase")
const { load } = require("../keywords/keyswords")
const { cluster } = require("fetchyt")
const deleteDuplicateItems = require("../controllers/deleteDuplicate")


async function findNewContentes() {

  async function loadVideos(content, contentArray) {
    const newMap = []
    const indexArray = []

    for(let i = 0; i <= 11; i++){
        indexArray.push(Math.floor(Math.random() * contentArray.length))
    }

    const newIndexArray = [... new Set(indexArray)]

    for(let i = 0; i < newIndexArray.length; i++){
        newMap.push(await cluster([`asmr ${content} ${contentArray[newIndexArray[i]]}`]))
    }

    return newMap
}

  const database = await loadDB()
  const Array = await load()

  const values = Object.keys(database)
  const content = values[Math.floor(Math.random() * values.length)]

  const newMap = await loadVideos(content, Array[content])

  const withouDuplicateideos = deleteDuplicateItems(newMap)
  
  await saveDB({ key:content, value:withouDuplicateideos })

}

module.exports = findNewContentes