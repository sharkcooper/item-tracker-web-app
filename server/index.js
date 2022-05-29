const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')
const { resolve } = require('path')
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, '.env')
})

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const {
    db_host,
    db_username,
    db_password,
    db_database
} = process.env

const db = mysql.createPool({
    host: db_host,
    user: db_username,
    password: db_password,
    database: db_database
})

function getCardTitlesAndUrls() {
    return new Promise((resolve, reject) => {
        const sqlGetCards = "select * from cards"
        // Get all card ids, titles, and urls
        db.query(sqlGetCards, (err, result) => {
            if (err) reject(err); 
            resolve(result);
        })
    })
}

function getCardItems(card) {
    return new Promise((resolve, reject) => {
        const sqlGetCardItems = "select * from card_items where card_id=?"
        db.query(sqlGetCardItems, [card.card_id], (err, result) => {
            if (err)
                reject(err)
            
            // Create card
            let newCard = {
                title: card.title,
                url: card.url,
                entries: [],
            }

            for (const item of result) {
                newCard.entries.push({
                    labelText: item.label,
                    inputText: item.xpath,
                })
            }
            resolve(newCard)
        })
    })
}

function makeCards(cardTitlesAndUrls) {
    return new Promise(async (resolve, reject) => {
        let cards = []
        for (const element of cardTitlesAndUrls) {
            const card = await getCardItems(element)
            cards.push(card)
        }
        console.log(cards)
        resolve(cards)
    })
}

app.get("/api/getCards", async (req, res) => {
    const cardTitlesandUrls = await getCardTitlesAndUrls()
    const cards = await makeCards(cardTitlesandUrls)
    res.send({cards: cards})  
            
})

app.post("/api/insertCard", (req, res) => {
    const card = req.body.card
    console.log(card)

    new Promise((resolve, reject) => {
        const sqlInsertCard = "insert into cards (title, url) values (?, ?)"
        // Insert card title and url
        db.query(sqlInsertCard, [card.title, card.url], (err, result) => {
            if (err) reject(err); 
            resolve(result);
        })
    }).then(result => {
        const sqlInsertCardItem = "insert into card_items (card_id, label, xpath) values (?, ?, ?)"
        // Insert each card item into database
        for (const element of card.entries) {
            // Insert card item
            db.query(sqlInsertCardItem, [result.insertId, element.labelText, element.inputText], (err, result) => {
                if (err) 
                    console.log(err)
                else
                    console.log(result)
            })
        }
    }).then(result => {
        res.send(result)
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

