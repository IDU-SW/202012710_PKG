const fs = require('fs');

class Music {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.music = JSON.parse(data)
    }

    // Promise 예제
    getMusicList() {
        if (this.music) {
            return this.music;
        }
        else {
            return [];
        }
    }

    addMusic(singer, song, genre) {
        return new Promise((resolve, reject) => {
            let last = this.music[this.music.length - 1];
            let id = last.id + 1;

            let newMusic = {id, singer, song, genre};
            this.music.push(newMusic);

            resolve(newMusic);
        });
    }

    // Promise - Reject
    getMusicDetail(MusicId) {
        return new Promise((resolve, reject) => {
            for (var song of this.music ) {
                if ( song.id == MusicId ) {
                    resolve(song);
                    return;
                }
            }
            reject({msg:'Can not find music', code:404});
        });
    }
}

module.exports = new Music();