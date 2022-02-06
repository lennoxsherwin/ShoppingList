const express = require('express');
const router = express.Router();

const Item = require('../models/item');
const User = require('../models/user');

const config = require('../config/auth.config');

var jwt = require("jsonwebtoken");

router.get('/', function (req, res) {
    res.send('API works!');
});

router.get('/items', async function (req, res) {
    const item = await Item.find({});
    res.json({item});

});

router.post('/items',async function(req,res){
    const item = await Item.create(req.body);
    res.send({item});
    // res.send(req.body.item);
});

router.put('/items/:id',function(req,res){
    Item.findOneAndUpdate({_id: req.params.id},req.body).then(function(item){
        Item.findOne({_id: req.params.id}).then(function(item){
            res.send(item);
        });
    });
});

router.delete('/items/:id',async function(req,res){
    const item = await Item.findOneAndDelete({_id: req.params.id});
    res.send(item);
});

router.post('/login',async function(req,res){
    // const item = await User.create(req.body);
    const email = req.body.email,
          password = req.body.password;

    const result = await User.findOne({email: email});
    if(!result){
        return res.json({"status": false});
    }
    else{
        if(result.password != password){
            return res.json({"status": false});
        }
        else{
            //create json web token and send
            var token = jwt.sign({id: result._id}, config.secret, {
                expiresIn: 86400 //24 hours
            });
            return res.json({"status": true, "name": result.name, "token": token});
        }
        
    }   

    
});

router.post('/signup',async function(req,res){
    const user = await User.create(req.body);
    var token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 86400 //24 hours
    });
    res.send({user,token});
});

module.exports = router;

