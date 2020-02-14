const database = require('../util/database');
const mongodb = require('mongodb');

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    static getAll() {
        let db = database.getDB();
        return db.collection("user").find().toArray()
            .then( result => {
                return result;
            })
            .catch( error => {
                console.log("getAll Error: ", error);
            });
        }
    
}

module.exports = User;