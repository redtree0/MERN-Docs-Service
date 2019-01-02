import express from 'express';
import path from 'path';
import { ROOT_PATH } from '../../config';

module.exports = (function () {
    'use strict';
    var routes = express.Router();

    routes.get('/test', function (req, res) {
        res.send('Hello ExternalRoutes!');
    });
    routes.get('/someRoute', function (req, res) {
        res.send('Hello SomeRoute!');
    });
    routes.get('/file/:path', function (req, res) {
        const dirTree = require("directory-tree");

        const tree = dirTree(path.join(__dirname, ".."), {attributes:[ 'ino']});
        res.json(tree);
    });

    routes.post('/upload', function(req, res) {
        if (Object.keys(req.files).length == 0) {
          return res.status(400).send('No files were uploaded.');
        }
      
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        console.log(req.files);
        let sampleFile = req.files.file;
        console.log(sampleFile);
        console.log(ROOT_PATH);
        console.log(path.join(ROOT_PATH, sampleFile.name));

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(path.join(ROOT_PATH, sampleFile.name), function(err) {
          if (err)
            return res.status(500).send(err);
      
          res.send('File uploaded!');
        });
    });

    

    return routes;
})();