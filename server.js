const express = require('express');
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient
const app = express();
const connectionString = 'mongodb+srv://skohlcode:eou060Y6Ya3wpGTK@starwarscluster.kdrgp.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString,{ useUnifiedTopology: true })
.then(client => {
    console.log('Connected to database');
    const db = client.db('starwarscluster');
    const quotesCollection = db.collection('quotes');

    app.set('view engine', 'ejs');

    app.post('/quotes', (req,res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
        .then(results => {
            console.log(results);
            res.render('index.ejs', { quotes: results});
        })
        .catch(error => console.error(error))
    
        
    })


}).catch(error => console.error(error))


app.use(bodyParser.urlencoded({ extended: true}));


app.listen(3000, function(){
    console.log('Listening on 3000');
})



