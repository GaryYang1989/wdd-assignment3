const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://Gravion:Yr1zOVJK0vy600LF@cluster0.quvkpqz.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')

        app.use(express.static('public'))
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
              .then(result => {
                res.redirect('/')
              })
              .catch(error => console.error(error))
          })

          app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
              .then(results => {
                res.render('index.ejs', { quotes: results })
              })
              .catch(error => console.error(error))
          })

          app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                { name: 'Mr.Hello' },
                {
                  $set: {
                    name: req.body.name,
                    quote: req.body.quote
                  }
                },
                {
                  upsert: true
                }
              )
                .then(result => {res.json('Success')})
                .catch(error => console.error(error))
          })

          app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
                { name: 'Mr.Hello' },
              )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No membership to delete')
                      }
                      res.json(`Deleted Membership`)
                })
                .catch(error => console.error(error))
          })
    })

app.listen(3000, function(){
    console.log('Listening on 3000')
})