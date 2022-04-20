require('dotenv').config();
const express = require('express')
const app = express()
const {send} = require('./service/send')
const PORT = process.env.DEV_PORT



app.use(express.json())

app.post('/send',(req, res) => {
    const msg = req.body
    const result = send(msg)
    res.json(result)
})



const start = () => {
    try {
        app.listen(PORT, () => console.log("Server started %s", PORT))
    }catch (e){
        throw new Error(e)
    }
}
start()

