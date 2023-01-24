const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.post = require("./post.js")(mongoose)
db.comment = require("./comment.js")(mongoose);

module.exports = db;
