const mongoose = require('mongoose');
const dbConnection = require('../db/connection');

const Schema = mongoose.Schema;

// Create schema model
const RecordSchema = new Schema({
    key: String,
    value: String,
    createdAt: Date,
    counts: Array
});

const RecordModel = dbConnection.model('Records', RecordSchema, 'records');
module.exports = RecordModel;