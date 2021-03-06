var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/beers');
var Beer = require("./models/BeerModel");

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/beers', function (req, res, next) {//this is ALL the beers
  Beer.find(function (error, beers) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(beers);
    }
  });
});

app.get('/beer/:id', function(req, res, next) {//this is the beers by IDs
  Beer.findById(req.params.id, function(error, beer) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(beer);
    }
  });
});


app.post('/beers', function(req, res, next) {
  Beer.create(req.body, function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.json(beer);
    }
  });
});


app.delete('/beers/:id', function(req, res, next) {

  console.log(req.params.id);
  Beer.remove({ _id: req.params.id }, function(err) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send("Done!!");
    }
  });
});


app.put('/beers/:id', function(req, res, next) {
  Beer.findByIdAndUpdate({ _id: req.params.id }, req.body, function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send(beer);
    }
  });
});

// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: err
  });
});

app.listen( process.env.PORT || '8000', function() {
  console.log("Yo YO, Listening on port "+ process.env.PORT||"8000");
})