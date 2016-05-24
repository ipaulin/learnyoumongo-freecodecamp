var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
var size = process.argv[2];

mongo.connect(url, function(err, db) {

    if(err)
        throw err;
    
    var prices =  db.collection('prices');
    
    prices.aggregate([
        {$match: {size: size}},
        {$group: { _id: "total", total : {$avg: "$price"} } }
        ]).toArray(function(err, data) {
            if(err)
                throw err;
                
            
            data.forEach(function(result){
                 console.log(Number(result.total).toFixed(2) );
            });
            
            db.close();
        });
    
    
});

