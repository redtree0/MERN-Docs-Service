import express from 'express';
import User from '../models/user.js';
import withAuth from '../helpers/middleware.js';
import { SUCCESS, FAIL } from '../../common/Events.js';
import jwt from 'jsonwebtoken';

let routes = express.Router();

// 로그인
routes.post('/login', (req, res) => {
    console.log(req.body);
    let userId = req.body.userId;
    User.findOne({ id: userId }, function(err, user){
        console.log(err);
        console.log(user);
        if(err || user === null) return res.json({ msg : FAIL  });
        // req.session.user = {
        //     username: userId
        // };
        res.json({ msg : SUCCESS  });
        // res.redirect('/');

    });
    
});

// 회원가입
routes.post('/addUser', (req, res) => { 
    console.log(req.body);
    let userId = req.body.userId;
    let password = req.body.passwd;
    let user = new User({
        'id' : userId,
        'password' : password
    });
    User.countDocuments({ id: userId }, function (err, count){ 
        if(count>0){
            //document exists });
        }else {
            user.save((err)=>{
                if(err){
                    res.json({ msg: FAIL });
                    return;
                }
                res.json({ msg : SUCCESS  });
                // res.redirect("/");
            })
        }
    }); 
    
    
});

// 로그아웃
routes.post('/logout', (req, res) => {
    
    delete req.session.user;
    res.redirect('/');
});


// checkToken
routes.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});
const secret = '@#@$MYSIGN#@$#$';
// authenticate
routes.post('/authenticate', function(req, res) {
    let userId = req.body.userId;
    let password = req.body.passwd;
    User.findOne({ id: userId}, function(err, user){
        
        if(err || user === null) return res.status(500).json({ msg : FAIL  });
        else {
            user.isCorrectPassword(password, function(err, same) {
                if(err || !same){
                    res.status(500)
                    .json({
                        error: 'Internal error please try again'
                    });
                }else {
                    const payload = { userId };
                    const token = jwt.sign(payload, secret, {
                      expiresIn: '1h'
                    });
                    res.cookie('token', token, { httpOnly: true })
                      .sendStatus(200);
                }
            });
        }
    });
})

export default routes;

