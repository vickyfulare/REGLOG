const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/e-comm")
    .then(() => {
        console.log("Connected to database")
    })
    .catch(() => {
        console.log("Failed to connect database")
    })

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = mongoose.model('Logincollection', LoginSchema)

module.exports = collection;