"use strict";
/**
 * Simple database insertion and query for MongoDB
 * @author: Jirka Dell'Oro-Friedl
 */
const Mongo = require("mongodb");
console.log("Database starting");
let databaseURL = "mongodb://localhost:27017";
let databaseName = "Test";
let db;
let students;
if (process.env.NODE_ENV == "production") {
    //    databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://testuser:test@ds113738.mlab.com:13738/eia2_sasalovi"; //hier an die eigene Datenbank bei mlab anpassen
    databaseName = "eia2";
}
Mongo.MongoClient.connect(databaseURL, handleConnect); //adresse der datenbank und handler, der aufgerufen wird wenn connection zu stande kommt �bergeben (ist asynchron) --> handler ist in diesem Fall die handleConnect funktion
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        students = db.collection("students"); //neues objekt erzeugen mit dem gearbeitet werden kann, ist vom typ mongo.collection
    }
}
function insert(_doc) {
    students.insertOne(_doc, handleInsert); //Zu datenbank hinzuf�gen und handleInsert aufrufen --> Diese gibt erfolgrreiche Speicherung al�s Text aus
}
exports.insert = insert;
function handleInsert(_e) {
    console.log("Database insertion returned -> " + _e);
}
function findAll(_callback) {
    var cursor = students.find(); //zu kompliziert - Quote Delloro
    cursor.toArray(prepareAnswer); //in array umwandeln
    function prepareAnswer(_e, studentArray) {
        if (_e)
            _callback("Error" + _e); //Error wenn to array nicht funktioniert hat
        else
            _callback(JSON.stringify(studentArray)); //JSON Klasse, kann JSON daten umwandeln in Zeichenkette oder was wei� ich was alles. wird im switch bei "find" ausgegeben
    }
}
exports.findAll = findAll;
//# sourceMappingURL=Database.js.map