const path = require('path')
const express = require('express')
const app = express()
const mysql = require('mysql')
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, '.env')
})

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

const port = 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

