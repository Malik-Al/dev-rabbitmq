require('dotenv').config();
const express = require('express')
const app = express()
const router = require('./routes/index')
const {DEV_PORT} = require('./config')


app.use(express.json())
app.use('/api', router);


const start = () => {
    try {
        app.listen(DEV_PORT, () => console.log("Server started %s", DEV_PORT))
    }catch (e){
        throw new Error(e)
    }
}
start()



