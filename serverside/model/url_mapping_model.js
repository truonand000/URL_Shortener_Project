const mongoose = require('mongoose')
const urlMappingSchema = require('./url_mapping_schema').urlMappingSchema;

const urlMappingModel = mongoose.model('UrlMapping', urlMappingSchema);

function insertUrlMapping(urlMapping) {
    return urlMappingModel.create(urlMapping);
}

function getAllUrlMappings() {
    return urlMappingModel.find().exec();
}

function findUrlMappingByShortenedUrl(shortenedUrl) {
    return urlMappingModel.findOne({shortenedUrl}).exec();
}

function findUrlMappingById(id) {
    return urlMappingModel.findById(id).exec();
}

function deleteUrlMapping(id) {
    return urlMappingModel.findByIdAndDelete(id).exec();
}

function deleteUrlMappingByShortenedUrl(shortenedUrl) {
    return urlMappingModel.deleteOne({shortenedUrl}).exec();
}

function updateUrlMapping(urlMapping) {
    return urlMappingModel.findByIdAndUpdate(urlMapping._id, urlMapping).exec();
}


module.exports = {
    insertUrlMapping,
    getAllUrlMappings,
    findUrlMappingByShortenedUrl,
    findUrlMappingById,
    deleteUrlMapping,
    deleteUrlMappingByShortenedUrl,
    updateUrlMapping
};