import express from 'express';
import fs from 'fs';
import path from 'path';
import { ROOT_PATH } from '../../config';
import decompress from 'decompress';
import decompressTar from 'decompress-tar';
 
// module.exports = (function () {
//     'use strict';
    var routes = express.Router();

    routes.get('/test', function (req, res) {
        res.send('Hello ExternalRoutes!');
    });
    routes.get('/someRoute', function (req, res) {
        res.send('Hello SomeRoute!');
    });
    routes.get('/file/:path', function (req, res) {
        const dirTree = require("directory-tree");

        const tree = dirTree(path.join(ROOT_PATH), {attributes:[ 'ino']});
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

        function getFileExtension(filename){
            return filename.split('.').pop();
        }
        
        function cleanDecompressLocation(dir_path, callback){

            rimraf(dir_path);
            callback();
            function rimraf(dir_path) {
                if (fs.existsSync(dir_path)) {
                    fs.readdirSync(dir_path).forEach(function(entry) {
                        var entry_path = path.join(dir_path, entry);
                        if (fs.lstatSync(entry_path).isDirectory()) {
                            rimraf(entry_path);
                        } else {
                            fs.unlinkSync(entry_path);
                        }
                    });
                    fs.rmdirSync(dir_path);
                }
            }
        }

        function decompressZipAndTar (filepath, decompressedpath, extension){
            let options = extension === "tar" ? { plugins: [ decompressTar() ] } : {}
            return decompress(filepath, decompressedpath, 
                        options
                    );
        }

        
        let extension = getFileExtension( sampleFile.name) ;
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(path.join(ROOT_PATH, sampleFile.name), function(err) {
          if (err)
            return res.status(500).send(err);
          
            if(extension === "tar" || extension === "zip" ){
                cleanDecompressLocation(path.join(ROOT_PATH, "decompress"), ()=>{
                    decompressZipAndTar(path.join(ROOT_PATH, sampleFile.name), path.join(ROOT_PATH, "decompress"), extension)
                    .then(() => {
                                console.log('Files decompressed');
                               res.status(200).send({status : 200}); 
                    });
                })
            }else {
                res.status(200).send({status : 200}); 
            }
            
          
        });
    });

    export default routes; 

//     return routes;
// })();