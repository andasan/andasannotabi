const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

exports.mongoConnect = (callback) => {
    MongoClient.connect(process.env.MONGODB_URL)
        .then(client => {
            db = client.db(process.env.MONGODB_DBNAME)
            callback();
        }).catch(err => {
            console.log("Error in mongoConnect: ", err);
        });
};

exports.getDB = () =>{
    if(db) {
        return db;
    }else{
        throw err;
    }
}