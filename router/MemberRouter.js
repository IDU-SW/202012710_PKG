const express = require('express');
const path = require("path")
const router = express.Router();
const member = require('../model/MemberModel');
const session = require('express-session');
const crypto = require('crypto');
var salt = "salt";
const log4js = require('log4js');
var log = log4js.getLogger();
log.level = 'debug';

const multer = require('multer');
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + "/aws_config.json");
const s3 = new AWS.S3();
const contentType = 'image/jpeg';
const now = new Date();
let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "idu-2020-0710/upload",
        key: function (req, file, callback) {
            callback(null, now.getHours() + now.getMinutes + now.getSeconds() + Math.floor(Math.random()*1000)+ file.originalname)
        },
        acl:'public-read',
        ContentType:contentType
    })
});

router.use(session({
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
    }
}));

router.use(express.static(__dirname + '/public'));

router.post('/member', upload.single('memberimage'), addMember);
router.get('/member-edit-form', memberEditForm);
router.post('/member-edit', memberEdit);
router.get('/login', loginForm);
router.get('/logout', logout);
router.get('/about', (req, res)=>res.render('about'));
router.get('/blog', (req, res)=>res.render('blog'));
router.post('/login', login);

module.exports = router;

function loginForm(req, res) {
    res.render('login', {loginState:2})
}

async function memberEditForm(req, res){
    result = await member.readMember(req.session.name.memberid);
    res.render('member-edit', {memberinfo:result, session:req.session.name})
}

async function memberEdit(req, res){
    var name = req.body.name;
    var memberid = req.body.memberid;
    var password = req.body.password;

    const memberinfo = {name, memberid, password};
    await member.updateMember(req.session.name.id,memberinfo);
    res.redirect("/logout");
}

async function addMember(req, res){
    var image = {
        name: req.file.key,
        url: req.file.location
    }

    var name = req.body.name;
    var memberid = req.body.memberid;
    var password = req.body.password;

    if (!name && !memberid && !password) {
        res.status(400).send({error:'누락 ',name, memberid, password});
        return;
    }

    var cipher = crypto.createHash('sha256');
    cipher.update(password + salt);
    password = cipher.digest('hex');

    const memberinfo = {name, memberid, password};
    try {
        await member.addMember(memberinfo, image.url);
        res.render('login',{loginState:3});
    } catch (error) {
        res.status(500).send(error.msg);
    }
}

async function login(req, res){
    var memberid = req.body.id;
    var password = req.body.pw;
    var cipher = crypto.createHash('sha256');
    cipher.update(password + salt);
    password = cipher.digest('hex');

    try{
        result = await member.login(memberid, password);
        if (result != null) {
            req.session.name = result;
            log.debug("login ", result);
            //res.render('index', {session:result});
            res.redirect("/");
        } else {
            res.render('login',{loginState:1});
        }
    } catch (error) {
        res.status(500).send(error.msg);
    }
}

function logout(req, res){
    req.session.destroy();

    res.redirect("/");
}