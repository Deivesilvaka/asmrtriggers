"use strict"

const keywords = {
    load:require("../keywords/keyswords").load,
    save:require("../keywords/keyswords").save
}

const supporters = {
    load:require("../database/editSupporters").load,
    save:require("../database/editSupporters").save
}

const { save } = require("../backup/editBackup")


module.exports = {

    async loadDatas(req, res) {
        const jsonDts = await keywords.load()
        return res.json(jsonDts)
    },

    async savePreferences(req, res) {
        const datas = req.body
        const jsonDts = await keywords.save(datas)
        return res.json(jsonDts)
    },

    async download(req, res) {

        const keys = await keywords.load()
        const supp = await supporters.load()

        await save(keys, supp)

        const BACKUP = `${__dirname}/../backup/backup.json`
        res.download(BACKUP)
    }

}