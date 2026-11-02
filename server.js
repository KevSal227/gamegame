require('dotenv').config() 
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const objectId = require('mongodb').ObjectId
var db, collection;

//const url = "mongodb+srv://kaaronsalazar_db_user:Pokemon123@cluster0.0fd91rk.mongodb.net/gamegame?retrywrites=true&w=majority"
const dbName = "gamegame";

const PORT = process.env.PORT || 3000;

MongoClient.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1);
    }

    db = client.db(dbName);
    console.log("Connected to MongoDB!");

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
);
// app.listen(3000, () => {
//   MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
//     if (error) {
//       throw error;
//     }
//     db = client.db(dbName);
//     console.log("Connected to `" + dbName + "`!");
//   });
// });

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { messages: result })
  })
})
//
app.post('/messages', (req, res) => {
  console.log(req.body)
  db.collection('messages').insertOne({ ...req.body }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
//message for Up
app.put('/messagesUp', (req, res) => {
  db.collection('messages')
    .findOneAndUpdate({ name: req.body.name, msg: req.body.msg }, {
      $inc: {
        thumbUp: 1
      }
    }, {
      sort: { _id: -1 },
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})
//message for down
app.put('/messagesDown', (req, res) => {
  db.collection('messages')
    .findOneAndUpdate({ name: req.body.name, msg: req.body.msg }, {
      $inc: {
        thumbUp: -1
      }
    }, {
      sort: { _id: -1 },
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})


app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({ _id: new objectId(req.body.id) }, (err, result) => {
    //db.collection('messages').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

//lets add some space

// route for review, finds the game by its id and saves the new review
// this is important so the info gets logged so our new user can go ahead and keep adding and updatin, this will be seen below too

app.put('/review', (req, res) => {
  db.collection('messages').findOneAndUpdate(
    //we are going to look one game with this id
    { _id: new objectId(req.body.id) },
    // $set only changes the review, everything else stays the same
    { $set: { Review: req.body.Review } },
    (err, result) => {
      // if something is broken itll send it back to error and wont work, well thats the plan 
      if (err) return res.send(err)
      //if it works itll send the result back to our main.js 
      res.send(result)
    })
})

// route for status, same thing as review just saves the status
// we dont have to create a new skeleton since we can use what we have for review for status
// by recycling the code from above to here it does the same thig 
app.put('/status', (req, res) => {
  db.collection('messages').findOneAndUpdate(
    { _id: new objectId(req.body.id) },
    { $set: { status: req.body.status } },
    (err, result) => {
      // if something is broken itll send it back to error and wont work, well thats the plan 
      if (err) return res.send(err)
      //if it works itll send the result back to our main.js 
      res.send(result)
    })
})
