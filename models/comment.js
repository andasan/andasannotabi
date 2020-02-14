const database = require('../util/database');
const mongodb = require('mongodb');

class Comment {
    constructor(id, author, content) {
        this.articleId = id;
        this.author = author;
        this.content = content;
    }

    saveComment() {
        database.getDB().collection('comment').insertOne(this)
            .then( (result) => {
                // console.log("saveArticle: ", result);
            }).catch((err) => {
                console.log("saveArticle Error: ", err);
            })
    }

    static getAll() {
        let db = database.getDB();
        return db.collection("comment").find().toArray()
            .then( result => {
                return result;
            })
            .catch( error => {
                console.log("getAll Error: ", error);
            });
        }
    
    static getById(id) {
        let db = database.getDB();
        return db.collection('comment').find( { articleId: id } ).toArray()
            .then( result => {
                return result;
            })
            .catch( error => {
                console.log("getAll Error: ", error);
            });
    }
    
}

module.exports = Comment;