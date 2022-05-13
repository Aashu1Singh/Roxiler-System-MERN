const express = require('express')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const app = express()


app.get("/todos", async (req, res) => {

    url = 'https://jsonplaceholder.typicode.com/todos'
    const data = await fetch(url)
    const JsonData = await data.json()
    JsonData.forEach((data) => { delete data.userId });
    res.json(JsonData)

})

app.get("/user/:id", async (req, res) => {

    url1 = `https://jsonplaceholder.typicode.com/users/${req.params.id}`
    const data1 = await fetch(url1)
    const JsonData = await data1.json()

    url2 = 'https://jsonplaceholder.typicode.com/todos'
    const data2 = await fetch(url2)
    const JsonData2 = await data2.json()
    JsonData2.filter((item) => {
        return item.userId = req.params.id
    })

    JsonData["todos"] = JsonData2
    res.json(JsonData)

})





app.listen(3000, () => {
    console.log("App is listening on port 3000")
})