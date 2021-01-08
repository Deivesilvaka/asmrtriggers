
const { load, save } = require("../database/editSupporters")

module.exports = {

    async getAllSupporters(req, res) {
        const supporters = await load()
        return res.json(supporters)
    },

    async saveSupporter(req, res) {
        let datas = req.body

        let existentPerson = false

        datas.instagram = datas.instagram.replace("https://www.instagram.com/", "")
        datas.instagram = datas.instagram.replace("https://instagram.com/", "")
        datas.instagram = datas.instagram.replace("instagram.com/", "")
        datas.instagram = datas.instagram.replace("/", "")
        datas.instagram = datas.instagram.replace("@", "")

        const newDatas = datas

        const persons = await load()

        for(let i in persons.datas){
            if(persons.datas[i].instagram === newDatas.instagram){
                existentPerson = true
                break
            }
        }

        if(!existentPerson){
            const loadedDatas = await save(newDatas)
            return res.json({message:`Adicionado! Muito Obrigado pela doação ${datas.name}.`})
        }

        return res.json({message:`Adicionado! Muito Obrigado pela doação ${datas.name}.`})

    }

}