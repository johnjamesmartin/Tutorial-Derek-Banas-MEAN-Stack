var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');


/* Root route: */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* List route: */

router.get('/thelist', function(req, res) {
  var MongoClient = mongodb.MongoClient;
  var url = 'mongod://localhost:27017/sampsite';

  MongoClient.connect(url, function(err, data) {
    if (err) {
      console.log('Unable to connect to database: ' + err);
    } else {
      console.log('Connection established with: ' + url);
      var collection = db.collection('students');
      collection.find([]).toArray(function(err, results) {
        if (err) {
          res.send(err);
        } else if (result.length) {
          res.render('studentlist', {
            'studentlist': result
          });
        } else {
          res.send('No documents found');
        }
        db.close();
      });
    }
  })
});

module.exports = router;
