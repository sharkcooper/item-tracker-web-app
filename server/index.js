const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')
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

app.get("/", (req, res) => {
    const sqlInsert = "select * from cards"
    db.query(sqlInsert, (err, result) => {
        if (result) {
            res.send(result)
        } else if (err) {
            res.send(err)
        }
    })
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
        const sqlInsertCardItem = "insert into card_items (card_id, card_item_label, card_item_xpath) values (?, ?, ?)"
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

