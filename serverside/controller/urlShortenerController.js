const express = require('express');
const router = express.Router();
const Axios = require('axios');

const urlMappingAccessor = require('../model/url_mapping_model');

router.get('/', (req, res) => {
   return urlMappingAccessor.getAllUrlMappings()
       .then((urlMappings) => {
           console.log(urlMappings);
           res.send(urlMappings);
       })
       .catch(err => res.status(403).send(err));
});

router.get("/:shortenedUrl", (req, res) => {
    urlMappingAccessor.findUrlMappingByShortenedUrl(req.params.shortenedUrl)
        .then((entry) => {
            console.log(entry.actualUrl);
            res.writeHead(301, { "Location": entry.actualUrl });
            res.end();
        })
        .catch(err => res.status(403).send("Error in retrieving this URL"));
});

router.put('/:shortenedUrl', (req, res) => {
    const urlMappingReplacement = req.body.actualUrl;
    return urlMappingAccessor.findUrlMappingByShortenedUrl(req.params.shortenedUrl)
        .then((entry) => {
            entry.actualUrl = urlMappingReplacement;
            return entry;
        })
        .then((newEntry) => {
            return urlMappingAccessor.updateUrlMapping(newEntry);
        })
        .then((response) => {
            res.send("Successful update");
        })
        .catch(err => res.status(403).send("Error, could not update the given URL. Please Try again"));
});

router.post('/', (req, res) => {
    const urlMappingToBeInserted = req.body;
    return urlMappingAccessor.insertUrlMapping(urlMappingToBeInserted)
        .then((entry) => {
            res.status(200);
            res.send("Successfully generated shortened URL")
        })
        .catch((err) => {
            console.log(err);
            res.status(403);
            res.send("An error has occurred. Please try again");
        })
});

router.delete('/:shortenedUrl', (req, res) => {
    const urlMappingShortenedUrl = req.params.shortenedUrl;
    return urlMappingAccessor.deleteUrlMappingByShortenedUrl(urlMappingShortenedUrl)
        .then((entry) => {
            res.status(200);
            res.send("Url has successfully been deleted")
        })
        .catch((err) => {
            res.status(403).send("An error has occurred. Please try again")
        })
});

module.exports = router;
