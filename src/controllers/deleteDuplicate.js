"use strict"

function deleteDuplicateItems(array) {

    const allArray = []

    const verifyArray = async (item) => {

        if(allArray.length === 0){
            allArray.push(item)
        }else{
            let cont = 0

            for(let arrayItem in allArray) {
                //Object.keys(item)[0]
                const item1 = Object.keys(allArray[arrayItem])[0]
                const item2 = Object.keys(item)[0]

                if(allArray[arrayItem][item1].href === item[item2].href){
                    cont ++
                }
            }

            if(cont === 0){
                allArray.push(item)
            }
        }
    }

    const newArray = array.map(async (item) => {
        await verifyArray(item).catch(err => {
            console.log("Array não possui href")
        })
    })

    return allArray
}

module.exports = deleteDuplicateItems