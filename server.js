const express = require('express');
const path = require('path')

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
})

app.listen(port, () => {
    console.log(`Starting server on port ${port}`);
})
