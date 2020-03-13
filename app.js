const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const chalk = require('chalk'); 

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const app = express();
const port = process.env.PORT || 8080;

const host = `${process.env.REG_HOST}` || 'http://localhost:8080';

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
        console.log('Shortening URL %s', data.originalUrl);
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
        console.log('Redirecting User to: ', data.originalUrl);
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
 });