const express = require('express');
const admin = require('firebase-admin')
const serviceAccount = require('./config/serviceAccountKey.json')
const cors = require('cors');
const bodyParser= require('body-parser')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const apis = require('./api/order.js')(app,admin);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://construyo-coding-challenge.firebaseio.com'
})


module.exports = app