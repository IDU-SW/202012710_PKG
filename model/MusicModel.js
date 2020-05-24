const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/example';
var ObjectID = require('mongodb').ObjectID;
var db;
MongoClient.connect(url,{useNewUrlParser:true}, (err,client)=>{
    if (err){
        console.error('mongo db connect error ', err);
        return;
    }
    console.log('connect success ');
    db = client.db('example');
});

class Music {
    
    getMusicList = async () => {
        let musiclist;
        await db.collection('musiclist').find({}).toArray()
        .then( result =>{
            musiclist = result;
        })
        .catch(error => {
            console.error('getMusicList error :', error);
        });
        return musiclist;
    }

    getMusicDetail = async (id) => {
        try {
            const row = await db.collection('musiclist').findOne({ _id: new ObjectID(id) });
            if ( row ) {
                console.log("getMusicDetail row : " , row);
                return row;
            }
        }
        catch (error) {
            console.log('getMusicDetail error : ', error);
        }
        
    }

    addMusic = async (addmusic) => {
        try {
            let addrow = await db.collection('musiclist').insertOne({
                artist: addmusic.artist,
                title: addmusic.title,
                genre: addmusic.genre
            }, { logging: false });
            return addrow.ops[0];
        } catch (error) {
            console.log(error);
        }
    }

    updateMusic = async (id, music) => {
        try {
            let ret = await db.collection('musiclist').updateOne({_id: new ObjectID(id)}, {
                $set : {artist: music.artist, title: music.title, genre: music.genre
                }
            });
            return ret;
        } catch (err) {
            console.error(err);
        }
    }

    deleteMusic = async (musicid) => {
        try {
            let result = await db.collection('musiclist').deleteOne({ _id: new ObjectID(musicid) });
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new Music();
