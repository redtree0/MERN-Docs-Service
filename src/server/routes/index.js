import express from 'express';
import path from 'path';

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
    return routes;
})();