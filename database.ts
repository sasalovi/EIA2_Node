/**
 * Simple database insertion and query for MongoDB
 * @author: Jirka Dell'Oro-Friedl
 */
import * as Mongo from "mongodb";
console.log("Database starting");

let databaseURL: string = "mongodb://localhost:27017";
let databaseName: string = "Test";
let db: Mongo.Db;
let students: Mongo.Collection;

if (process.env.NODE_ENV == "production") {
    //    databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://testuser:testpassword@ds129532.mlab.com:29532/eia2"; //hier an die eigene Datenbank bei mlab anpassen
    databaseName = "eia2";
}

Mongo.MongoClient.connect(databaseURL, handleConnect);  //adresse der datenbank und handler, der aufgerufen wird wenn connection zu stande kommt übergeben (ist asynchron) --> handler ist in diesem Fall die handleConnect funktion

function handleConnect(_e: Mongo.MongoError, _db: Mongo.Db): void {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        students = db.collection("students"); //neues objekt erzeugen mit dem gearbeitet werden kann, ist vom typ mongo.collection
    }
}

export function insert(_doc: StudentData): void {
    students.insertOne(_doc, handleInsert); //Zu datenbank hinzufügen und handleInsert aufrufen --> Diese gibt erfolgrreiche Speicherung alös Text aus
}

function handleInsert(_e: Mongo.MongoError): void { //Erfolgsmeldung ausgeben
    console.log("Database insertion returned -> " + _e);
}


export function findAll(_callback: Function): void { //Übergebe von Hauptprogramm funtkion die aufgerufen werden soll
    var cursor: Mongo.Cursor = students.find(); //zu kompliziert - Quote Delloro
    cursor.toArray(prepareAnswer); //in array umwandeln

    function prepareAnswer(_e: Mongo.MongoError, studentArray: StudentData[]): void { //funktion in der funktion damit nicht so viel übergeben werden muss. "Die Kennen sich"
        if (_e)
            _callback("Error" + _e); //Error wenn to array nicht funktioniert hat
        else
            _callback(JSON.stringify(studentArray)); //JSON Klasse, kann JSON daten umwandeln in Zeichenkette oder was weiß ich was alles. wird im switch bei "find" ausgegeben
    }
}