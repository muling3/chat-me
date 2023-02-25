const express = require("express")

const app = express()
const PORT = 4000

app.get("/", (req, res) => {
    res.json({ message: "Connected Succesfully"})
})

app.listen(PORT,() => console.log(`Server listening port ${PORT}`))