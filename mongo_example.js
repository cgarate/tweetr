
"use strict";

const MongoClient = require("mongoDB").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

//Connection starts here
console.log(`Connected to mongodb: ${MONGODB_URI}`);

// ==> In typical node-callback style, any program
//     logic that needs to use the connection needs
//     to be invoked from within here.
function getTweets(callback) {
  db.collection("tweets").find().toArray(callback);
};



db.close();
});
