const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.post('/shorten', (req, res) => {
    const {url} = req.body;
    const lengthenedURL = new Date().getTime();
    res.json({lengthenedURL});
});


app.get('/:shortUrl', (req, res) => {
    const url = req.params.shortUrl;
    res.send('test');
})


const server = app.listen(port, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Listening on %s %s", host, port)
 })
