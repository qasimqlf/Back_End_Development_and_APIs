require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dns = require('dns');
const mySecret = process.env['MONGO_URI'];

// Basic Configuration
try {
  mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
    console.log(err);
}

const port = process.env.PORT || 3000;

// Model
const schema = new mongoose.Schema({
  original: { 
    type: String, 
    required: true 
  },
  short: { 
    type: Number, 
    required: true 
  }
});
const Url = mongoose.model('Url', schema);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/shorturl/:input", (req, res) => {
    let input = parseInt(req.params.input);

    Url.findOne({ short: input }, function (err, data) {
        if (err || data === null) {
          return res.json("URL NOT FOUND");
        }
        return res.redirect(data.original);
    });
})

app.post("/api/shorturl", async (req, res) => {
    let bodyUrl = req.body.url;
   // let urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/);

  // Call to lookup function of dns
  dns.lookup(bodyUrl, (err, address, family) => {
    if(!err) {
      return res.json({ error: 'invalid url' });
    }
     let index = 1;

    Url.findOne({})
        .sort({ short: 'desc' })
        .exec((err, data) => {
            if (err) return res.json({ error: "No url found." })

            index = data !== null ? data.short + 1 : index;

            Url.findOneAndUpdate(
                { original: bodyUrl },
                { original: bodyUrl, short: index },
                { new: true, upsert: true },
                (err, newUrl) => {
                    if (!err) {
                        res.json({ original_url: bodyUrl, short_url: newUrl.short })
                    }
                }
            )
        });
    
  });
  
  /* if (!bodyUrl.match(urlRegex)) {
    return res.json({ error: "Invalid URL" });
  }*/
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
