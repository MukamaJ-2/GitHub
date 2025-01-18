const express = require('express');

const app = express();

const port = 6000;

app.get(`/name`, (req, res)=>{
    res.send("Mukama Joseph ")
})

app.listen(port, ()=>{
  console.log(`the server is running on port ${port}`)
})