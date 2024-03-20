const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
const collection = require('./mongodb')
const templatePath = path.join(__dirname, 'templates')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', templatePath)



app.get('/', (req, resp) => {
    resp.render("login")
})


app.get('/signup', (req, resp) => {
    resp.render("signup")
})


app.post('/signup', async(req, resp) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }
    await collection.insertMany([data])
    resp.render("login")
})


app.post('/login', async(req, resp) => {
    try {

        const check = await collection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            resp.render("home")
        } else {
            resp.send("Wrong password")
        }
    } catch {
        resp.send("Name or password is wrong")
    }
})




app.listen(3000, () => {
    console.log("Port connected")
})