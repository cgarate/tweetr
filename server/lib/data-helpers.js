"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
    },

    // Add one more like to the like counter
    likeTweets: function(id, callback) {
      db.collection("tweets").updateOne({ "myID" : id }, { $inc: { likes: 1 } }, (err, result) => {
              callback(err);
            });
    },

    // Substract one like to the like counter
    dislikeTweets: function(id, callback) {
      db.collection("tweets").updateOne({ "myID" : id }, { $inc: { likes: -1 } }, (err, result) => {
              callback(err);
            });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {

        db.collection("tweets").find().toArray((err, tweets) => {
          if (err) {
            return callback(err);
          }
          callback(null, tweets);
        });
    }

  };
}
