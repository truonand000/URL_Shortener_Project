const mongoose = require('mongoose');

const Schema = mongoose.Schema;

exports.urlMappingSchema = new Schema({
    shortenedUrl: {
        type: String,
        require: true,
        index: true,
        unique: true },
    actualUrl: {type: String, required: true}
}, {collection: 'url_mappings'});