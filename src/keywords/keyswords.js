'use strict'

const fs = require("fs")

async function save(datas) {
    const keys = await load()
    if(keys[datas.key].indexOf(datas.value) > -1){
        return keys
    }else{
        keys[datas.key].push(datas.value)
        const newDatas = JSON.stringify(keys, null, 2)
        fs.writeFileSync(`${__dirname}/keywords.json`, newDatas)

        return JSON.parse(newDatas)
    }
}

async function load() {
    const keyWords = JSON.parse(fs.readFileSync(`${__dirname}/keywords.json`, "utf-8"))
    return keyWords
}

module.exports = {
    save,
    load
}