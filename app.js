const express = require('express')
const app = express()
const path = require('path')
const port = 8080

app.get('/', (req, res) => {
 // res.send('Hello World!');
  res.sendFile(path.join(__dirname + '/hello-world.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
