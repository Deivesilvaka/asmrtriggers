'use strict'

const fs = require("fs")

async function save(keywords, supporters) {
    const backup = await load()
    backup.datas[0] = keywords
    backup.datas[1] = supporters
    
    const newDatas = JSON.stringify(backup, null, 2)
    fs.writeFileSync(`${__dirname}/backup.json`, newDatas)

    return JSON.parse(newDatas)
}

async function load() {
    const backup = JSON.parse(fs.readFileSync(`${__dirname}/backup.json`, "utf-8"))
    return backup
}

module.exports = {
    save,
    load
}