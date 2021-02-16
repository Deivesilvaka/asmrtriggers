
async function loadBalancer(videos) {
    const newObject = videos.all
    const datasFamilyFriendly = []

    const words = require('../database/ilegalWords.json').words

    let count = 0
    
    newObject.map(item => {
        for(let i in words) {
            if(item.title.toLowerCase().indexOf(words[i]) > -1) {
                count++
            }
        }
        if(count < 1){
            datasFamilyFriendly.push(item)
            count = 0
        }else{
            count = 0
        }
    })

    const Object = {
        all: datasFamilyFriendly
    }

    return Object
}

module.exports = loadBalancer