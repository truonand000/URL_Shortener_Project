const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const mongoEndpoint = process.env.MONGODB_URI || 'mongodb://127.0.0.1/url_shortener_app';
mongoose.connect(mongoEndpoint, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Static file declaration
app.use(express.static(path.join(__dirname, 'client_url_shortener/build')));

// Production mode
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client_url_shortener/build')));
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname = 'client_url_shortener/build/index.html'));
    })
}

// Build mode
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client_url_shortener/public/index.html'));
});

app.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});
