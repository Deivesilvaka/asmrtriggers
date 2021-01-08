'use strict'

const fs = require("fs")

async function saveDB(datas) {
    const keys = await loadDB()
    if(keys[datas.key].indexOf(datas.value) > -1){
        return keys
    }else{
        keys[datas.key] = datas.value
        const newDatas = JSON.stringify(keys, null, 2)
        fs.writeFileSync(`${__dirname}/database.json`, newDatas)

        return JSON.parse(newDatas)
    }
}

async function loadDB() {
    const database = JSON.parse(fs.readFileSync(`${__dirname}/database.json`, "utf-8"))
    return database
}

module.exports = {
    saveDB,
    loadDB
}