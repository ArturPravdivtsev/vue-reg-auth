const express = require('express')
const cors = require ('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./src/routes/')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:8080'
}))
app.use('/auth', router)

const start = async () => {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/users',
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()