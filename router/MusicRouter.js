const express = require('express');
const router = express.Router();
const music = require('../model/MusicModel');

router.get('/music', showMusicList);
router.get('/music/add', addMusicForm);
router.get('/music/update/:musicId', updateMusicForm);
router.get('/music/:musicId', showMusicDetail);
router.post('/music', addMusic);
router.post('/music/delete', deleteMusic);
router.post('/music/:musicId', updateMusic);

module.exports = router;

function addMusicForm(req, res){
    res.render('addmusicform')
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