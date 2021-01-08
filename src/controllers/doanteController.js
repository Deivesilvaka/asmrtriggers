
const paypal = require("paypal-rest-sdk")
const paypalConfig = require("../../config/paypal.json")

const { donates } = require('../../config/donates.json')

paypal.configure(paypalConfig)

const links = {
    dev:`http://192.168.100.45:${process.env.PORT || 3000}/`,
    production:"https://asmrtriggers.herokuapp.com/"
}

module.exports = {
    async Donate(req, res) {
        const { id, donate } = req.query

        if(Number(id) < 0 || !id || Number(id) > 7){
            res.json({message:"Nenhum id enviado"})
        }

        let donateSelected = {}

        let cart = []

        if(Number(id) === 7) {
            cart = [{
                "name": donates[6].title,
                "sku": donates[6].id,
                "price": Number(donate).toFixed(2),
                "currency": "BRL",
                "quantity": 1
            }]

            const valor = {
                "currency": "BRL",
                "total": Number(donate).toFixed(2)
            }
    
            const { description } = donates[6]

            const json_pagamento = {
                "intent":"sale",
                "payer": { "payment_method": "paypal" },
                "redirect_urls": {
                    "return_url": `${links.production}success`,
                    "cancel_url": `${links.production}cancel`
                },
                "transactions": [{
                    "item_list": { "items": cart },
                    "amount": valor,
                    "description": description
                }]
            }

            paypal.payment.create(json_pagamento, (err, payment) => {
                if(err) {
                    console.log(err)
                }else{
                    payment.links.forEach( (link) => {
                        if(link.rel === "approval_url"){
                            return res.redirect(link.href)
                        }
                    } )
                }
            })

        }else {
            donateSelected = donates.reduce((all, item) => item.id.toString() === id ? item : all, {})

            cart = [{
                "name": donateSelected.title,
                "sku": donateSelected.id,
                "price": Number(donateSelected.price).toFixed(2),
                "currency": "BRL",
                "quantity": 1
            }]

            const valor = {
                "currency": "BRL",
                "total": Number(donateSelected.price).toFixed(2)
            }
    
            const { description } = donateSelected

            const json_pagamento = {
                "intent":"sale",
                "payer": { "payment_method": "paypal" },
                "redirect_urls": {
                    "return_url": `http://192.168.100.45:${process.env.PORT || 3000}/success`,
                    "cancel_url": `http://192.168.100.45:${process.env.PORT || 3000}/cancel`
                },
                "transactions": [{
                    "item_list": { "items": cart },
                    "amount": valor,
                    "description": description
                }]
            }

            paypal.payment.create(json_pagamento, (err, payment) => {
                if(err) {
                    console.log(err)
                }else{
                    payment.links.forEach( (link) => {
                        if(link.rel === "approval_url"){
                            return res.redirect(link.href)
                        }
                    } )
                }
            })

        }

    }
}