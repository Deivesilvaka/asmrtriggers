'use strict'

const fs = require("fs")

async function save(datas) {
    const keys = await load()
    
    keys["datas"].push({
        name:datas.name,
        instagram:datas.instagram
    })
    const newDatas = JSON.stringify(keys, null, 2)
    fs.writeFileSync(`${__dirname}/supporters.json`, newDatas)

    return JSON.parse(newDatas)

}

async function load() {
    const supporters = JSON.parse(fs.readFileSync(`${__dirname}/supporters.json`, "utf-8"))
    return supporters
}

module.exports = {
    save,
    load
}