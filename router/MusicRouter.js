const express = require('express');
const router = express.Router();
const music = require('../model/MusicModel');
const session = require('express-session');
router.use(express.static(__dirname + '/public'));

router.use(session({
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
    }
}));

router.get('/',index);
router.get('/music', showMusicList);
router.get('/music-add', addMusicForm);
router.get('/music-update', updateMusicForm);
router.get('/music/:musicId', showMusicDetail);
router.post('/music', addMusic);
router.get('/music-delete/:musicId', deleteMusic);
router.post('/music-update/', updateMusic);

module.exports = router;

async function index (req, res){
    var date = new Date();
    var day =date.getFullYear() +"년 "+ (date.getMonth()+1)+"월 "+ date.getDate() +"일";
    var result = await music.getMusicDetail(date.getDay());
    res.render('index',{session:req.session.name, day:day,result:result})
}

function addMusicForm(req, res){
    res.render('music-add',{session:req.session.name});
}

async function updateMusicForm(req, res){
    try {
        const musicId = req.query.musicid;
        const info = await music.getMusicDetail(musicId);
        res.render('music-update',{result:info,session:req.session.name})
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

async function showMusicList(req, res) {
    const musicList = await  music.getMusicList();
    const result = { count:musicList.length, data:musicList};
    res.render('music-readlist', {result:result,session:req.session.name});
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
    const addmusic =req.body;
    console.log("music : ", music);
    try {
        const data = await music.addMusic(addmusic);
        res.redirect("/music");
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

async function updateMusic(req, res) {
    
    const id = req.body.musicid;
    const updatemusic = req.body;

    if (!id) {
        res.status(400).send({error:'ERROR'});
        return;
    }

    try {
        await music.updateMusic(id, updatemusic);
        res.redirect("/music");
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

async function deleteMusic(req, res) {
    try {
        const musicId = req.params.musicId;
        await music.deleteMusic(musicId);
        res.redirect("/music");
    }
    catch ( error ) {
        res.status(500).send({msg:error.msg});
    }
}