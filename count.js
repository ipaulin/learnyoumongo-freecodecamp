var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
var age = process.argv[2];

mongo.connect(url, function(err, db) {

    if(err)
    throw err;
    
    var parrots =  db.collection('parrots');
    
    parrots.count({
        age: {$gt : parseInt(age)}
    },function(err, count) {
        if(err)
        throw err;
        
        console.log(count);
        db.close();
    });
    
    
});

