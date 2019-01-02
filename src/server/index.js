import express from 'express';
import utils from "./helpers/utils";
import path from "path";
import dotenv from "dotenv";
import { SUCCESS } from "../common/Events";

global.path = path;
global.dotenv = dotenv;

utils.loadENV();
const app = express();

app.use(express.json()) // bodyparser;
app.use(express.static(path.resolve(process.cwd(), 'public')))

app.get('/api', (req, res) => {
    
    res.send('Express to the rescue!');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    let userId = req.body.userId;

    res.json({ msg : SUCCESS  });
});

app.listen(process.env.port, () => {
    utils.log(`Server has started and is listening on port ${process.env.port}!`)
});