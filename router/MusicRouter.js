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
        // 음악 상세 정보 Id
        const musicId = req.params.musicId;
        console.log('musicId : ', musicId);
        const info = await music.getMusicDetail(musicId);
        //res.send(info);
        res.render('updatemusicform',{music:info})
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

function showMusicList(req, res) {
    const musicList = music.getMusicList();
    //const result = { data:musicList, count:musicList.length };
    //res.send(result);
    res.render('getmusiclist', {musiclist:musicList, count:musicList.length})
}

async function showMusicDetail(req, res) {
    try {
        // 음악 상세 정보 Id
        const musicId = req.params.musicId;
        console.log('musicId : ', musicId);
        const info = await music.getMusicDetail(musicId);
        //res.send(info);
        res.render('getmusic',{music:info})
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}


// 새 음악 추가
// POST 요청 분석 -> 바디 파서
async function addMusic(req, res) {
    const singer = req.body.singer;

    if (!singer) {
        res.status(400).send({error:'singer 누락'});
        return;
    }

    const song = req.body.song;
    const genre = req.body.genre;

    try {
        const result = await music.addMusic(singer, song, genre);
        //res.send({msg:'success', data:result});
        res.render('addmusic',{music:result})
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

async function updateMusic(req, res) {
    
    const id = parseInt(req.params.musicId);
    const singer =  req.body.singer;
    const song = req.body.song;
    const genre = req.body.genre;

    if (!id) {
        res.status(400).send({error:'ERROR'});
        return;
    }

    try {
        const result = await music.updateMusic(id, singer, song, genre);
        //res.send({msg:'success', data:result});
        res.render('updatemusic',{msg:'success',music:result})
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

async function deleteMusic(req, res) {
    try {
        const musicId = parseInt(req.body.id);
        console.log('musicId : ', musicId);
        const result = await music.deleteMusic(musicId);
        //res.send({msg:'음악 삭제 완료', data:result});
        res.render('deletemusic',{msg:'음악 삭제 완료', music:result})
    }
    catch ( error ) {
        res.status(500).send({msg:error.msg});
    }
}