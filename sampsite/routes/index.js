var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');


/* Root route: */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 

/* List route: */

router.get('/thelist', function(req, res){
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/sampsite';

  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
    console.log('Connection established to', url);
    var collection = db.collection('students');
 
    /* Find all students: */

    collection.find({}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else if (result.length) {
        res.render('studentlist',{
 
          /* Pass returned database documents to Jade: */

          "studentlist" : result
        });
      } else {
        res.send('No documents found');
      }

      /* Close connection: */

      db.close();
    });
  }
  });
});

module.exports = router;
