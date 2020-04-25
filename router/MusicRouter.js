const express = require('express');
const router = express.Router();
const music = require('../model/MusicModel');

router.get('/music', showMusicList);
router.get('/music/:musicId', showMusicDetail);
router.post('/music', addMusic);

module.exports = router;

function showMusicList(req, res) {
    const musicList = music.getMusicList();
    const result = { data:musicList, count:musicList.length };
    res.send(result);
}


// Async-await를 이용하기
async function showMusicDetail(req, res) {
    try {
        // 음악 상세 정보 Id
        const musicId = req.params.musicId;
        console.log('musicId : ', musicId);
        const info = await music.getMusicDetail(musicId);
        res.send(info);
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
        res.send({msg:'success', data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}