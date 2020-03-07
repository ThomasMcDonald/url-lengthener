const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const crypto = require('crypto');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const chalk = require('chalk'); 
const host = process.env.HOST || 'http://localhost:8080';
// add to enviro variables eventually
const { getUrl, createUrl } = require('./server/url_controller');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/urlLengthy',{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
require(__dirname + '/server/database.js')(chalk, db);


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.post('/shorten', async (req, res) => {
    const { url } = req.body;  
    try{
        const initialHash = crypto.createHash('sha256').update(url).digest('hex') + new Date().getTime();
        const lengthenedUrl = initialHash.split('').join(`_${initialHash}_`).slice(0,2048);
        const data = await createUrl({hostName: 'google', lengthenedUrl, originalUrl: url});
        
        res.json({lengthenedUrl: `${host}/u/${data.lengthenedUrl}`});
    }catch(err){
        console.error(err);
        res.json({err});
    }
});


app.get('/u/:shortUrl', async(req, res) => {
    const { shortUrl } = req.params;
    try{
        const data = await getUrl(shortUrl);
        console.log(data.originalUrl);
        if(data) res.redirect(data.originalUrl);
        else res.redirect('/');
    }catch(err){
        console.log(err);
        res.redirect('/')
    }
})


const server = app.listen(port, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Listening on %s %s", host, port)
 })
