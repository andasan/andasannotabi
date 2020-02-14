const database = require('../util/database');
const mongodb = require('mongodb');

let options = {
    year: "numeric",
    month: "long",
    day: "numeric"
};

class Article {
    constructor(title, coverImage, content) {
        this.title = title;
        this.coverImage = coverImage;
        this.content = content;
        this.published = new Date();
    }

    saveArticle() {
        database.getDB().collection('post').insertOne(this)
            .then( (result) => {
                // console.log("saveArticle: ", result);
            }).catch((err) => {
                console.log("saveArticle Error: ", err);
            })
    }

    static getAll() {
        let db = database.getDB();
        return db.collection("post").find().toArray()
            .then( result => {
                return result;
            })
            .catch( error => {
                console.log("getAll Error: ", error);
            });
        }

    static deleteArticle(id) {
        let db = database.getDB();
        console.log("Deleting: ", id);
        return db.collection('post').deleteOne({_id: new mongodb.ObjectId(id)})
    }

    static updateArticle(id, title, coverImage, content) {
        console.log("id: ", id);
        let db = database.getDB();
        return db.collection('post').updateOne({_id: new mongodb.ObjectId(id)}, {$set: {title: title, coverImage: coverImage, content: content}})
    }

    
}

module.exports = Article;