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
            if (err) reject(err)
            resolve(result)
        })
    })
}

function getAllCardItems(cardTitlesAndUrls) {
    return new Promise(async (resolve, reject) => {
        let cardItems = []
        for (const element of cardTitlesAndUrls) {
            const items = await getCardItems(element)
            cardItems.push(items)
        }
        resolve(cardItems)
    })
}

function makeCards(cardTitlesAndUrls, cardItems) {
    let cards = []
    for (let i = 0; i < cardTitlesAndUrls.length; i++) {
        let card = {
            id: cardTitlesAndUrls[i].card_id,
            title: cardTitlesAndUrls[i].title,
            url: cardTitlesAndUrls[i].url,
            entries: []
        }

        for (const element of cardItems[i]) {
            card.entries.push({
                id: element.item_id,
                labelText: element.label,
                inputText: element.xpath,
            })
        }

        cards.push(card)
    }
    return cards
}

app.get("/api/getAllCards", async (req, res) => {
    const cardTitlesAndUrls = await getCardTitlesAndUrls()
    const cardItems = await getAllCardItems(cardTitlesAndUrls)
    const cards = makeCards(cardTitlesAndUrls, cardItems)
    res.send({cards: cards})  
            
})

app.post("/api/insertCard", async (req, res) => {
    const card = req.body.card

    await new Promise((resolve, reject) => {
        const sqlInsertCard = "insert into cards (title, url) values (?, ?)"
        // Insert card title and url
        db.query(sqlInsertCard, [card.title, card.url], (err, result) => {
            if (err) reject(err); 
            resolve(result);
        })
    }).then(async result => {
        let ids = {
            card_id: result.insertId,
            item_ids: [],
        }

        const sqlInsertCardItem = "insert into card_items (card_id, label, xpath) values (?, ?, ?)"
        // Insert each card item into database
        for (const element of card.entries) {
            // Insert card item
            let item = await new Promise((resolve, reject) => {
                db.query(sqlInsertCardItem, [result.insertId, element.labelText, element.inputText], (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            })
            ids.item_ids.push(item.insertId)
        }

        return ids
    }).then(result => {
        res.send(result)
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

