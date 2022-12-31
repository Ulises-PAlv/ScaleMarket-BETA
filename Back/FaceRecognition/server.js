// ?? Dependencias
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
var request = require("request");
const multer = require('multer');

app.use(cors());

// ?? Inicializar Server
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const port = process.env.PORT || 3002;
var jsonParser = bodyParser.json();

app.listen(port, () => {
    console.log('Running on port:', port);
});

app.get('/', (req, res) => {
    res.send({
        data: '200: Running...'
    });
});

app.get('/person/list', (req, res) => {
    console.log('hello')
    var options = {
        method: 'GET',
        url: "https://api.luxand.cloud/person",
        qs: {},
        headers: {
            'token': ""
        }
    };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        res.send(body);
    });
});

app.post('/person/create', jsonParser, (req, res) => {
    var options = {
        method: 'POST',
        url: "https://api.luxand.cloud/person",
        qs: {"name": req.body.name, "store":"1"},
        headers: {
            'token': ""
        },
        formData: { 
            photo: fs.createReadStream('./foto.jpg')
        }
    };

    console.log(options)

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    });

    res.send({
        data: 'Created...'
    });
});

app.post('/person/recognition', jsonParser, (req, res) => {
    var options = {
        method: 'POST',
        url: "https://api.luxand.cloud/photo/search",
        qs: {},
        headers: {
            'token': ""
        },
        formData: { 
            photo: fs.createReadStream('./foto.jpg')
        }
    };

    console.log(options);

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    });

    res.send({
        data: 'Created...'
    });
});