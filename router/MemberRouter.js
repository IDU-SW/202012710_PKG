const express = require('express');
const path = require("path")
const router = express.Router();
const member = require('../model/MemberModel');
const log4js = require('log4js');
var log = log4js.getLogger();
log.level = 'debug';
log.debug("MemberRouter");

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

router.use(express.static(__dirname + '/public'));

router.post('/member', upload.single('memberimage'), addMember);
router.get('/', (req, res)=>res.render('index'));
router.get('/login', (req, res)=>res.render('login'));
router.get('/about', (req, res)=>res.render('about'));
router.get('/episodes', (req, res)=>res.render('episodes'));
router.get('/blog', (req, res)=>res.render('blog'));

module.exports = router;



async function addMember(req, res){
    var image = {
        name: req.file.key,
        url: req.file.location
    }

    log.debug("addMember ", image);
    const name = req.body.name;
    const memberid = req.body.memberid;
    const password = req.body.password;

    if (!name && !memberid && !password) {
        res.status(400).send({error:'누락 ',name, memberid, password});
        return;
    }

    const memberinfo = req.body;
    try {
        await member.addMember(memberinfo, image.url);
        res.render('index');
    } catch (error) {
        res.status(500).send(error.msg);
    }
}

async function updateMusicForm(req, res){
    try {
        const musicId = req.params.musicId;
        const info = await music.getMusicDetail(musicId);
        res.render('updatemusicform',{result:info})
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

async function showMusicList(req, res) {
    const musicList = await  music.getMusicList();
    const result = { count:musicList.length, data:musicList};
    //res.send(result);
    res.render('getmusiclist', {result:result})
}

async function showMusicDetail(req, res) {
    try {
        const musicId = req.params.musicId;
        const data = await music.getMusicDetail(musicId);
        res.render('getmusic',{result:data})
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

async function addMusic(req, res) {
    const artist = req.body.artist;

    if (!artist) {
        res.status(400).send({error:'artist 누락'});
        return;
    }

    const addmusic =req.body;
    console.log("music : ", music);
    try {
        const data = await music.addMusic(addmusic);
        res.render('addmusic',{result:data});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

async function updateMusic(req, res) {
    
    const id = req.params.musicId;
    const updatemusic = req.body;

    if (!id) {
        res.status(400).send({error:'ERROR'});
        return;
    }

    try {
        await music.updateMusic(id, updatemusic);
        const result = await music.getMusicDetail(id);
        res.render('updatemusic',{msg:'success',music:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

async function deleteMusic(req, res) {
    try {
        const musicId = req.body.id;
        await music.deleteMusic(musicId);
        
        res.render('deletemusic',{msg:'음악 삭제 완료'})
    }
    catch ( error ) {
        res.status(500).send({msg:error.msg});
    }
}