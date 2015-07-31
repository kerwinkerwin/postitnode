var express = require('express');
var router = express.Router();
var app = express();

/* GET Create note route */
router.get('/note/new',function(req,res,next){
  res.render('create');
})
/* POST create route */
router.post('/note/new', function(req,res,next){
  var title = req.body.title;
  var content = req.body.content;
  var db = req.db;
  var collection = db.get('notescollection');
  collection.insert({
    "title":title,
    "content":content
  }, function(err){
    if(err){
      res.error("sorry issue");
    }else{
      res.redirect('/');
    }
  });
});

/*Update note */
router.get('/note/:id', function(req,res,next){
  var db = req.db;
  var idToUser = req.params.id
  var collection = db.get('notescollection');
  collection.findOne({
    "_id": idToUser
  },function(err,doc){
    if(err){
      res.error("Unavailable to find");
    }else{
      res.render('note',{
        "note":doc
      });
    };
  });
});

/* POST to delete note middleware */
router.post('/note/:id', function(req,res,next){
  console.log("hiz");
  var idToDelete = req.params.id
  var db = req.db;
  var collection = db.get('notescollection');
  collection.remove({
    "_id":idToDelete
  },function(err,doc){
    if(err){
      res.error("theres a problem");
      next();
    }else{
    next();
    }
  });
});

/* POST to route */
router.post('/note/:id', function(req,res,next){
  if(res.error){
    res.render(res.error)
  }else{
    res.redirect('/notes');
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/notes');
});
router.get('/notes', function(req,res,next){
  console.log("hi");
  var db = req.db;
  var collection = db.get('notescollection');
  collection.find({},{},function(e,docs){
    res.render('index',{
      "notes":docs
    });
  });
});





module.exports = router;
