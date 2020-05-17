const {prepareTable} = require('./prepareTable');
const pool = require('./dbConnection');
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const sequelize = new Sequelize('music', 'kyunggeun', 'cometrue', {
    dialect: 'mysql', host: '127.0.0.1'
});

class Musiclist extends Sequelize.Model {}
Musiclist.init({
    musicid:{
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    artist:{
        type: Sequelize.STRING,
        field: 'artist'
    },
    title:{
        type: Sequelize.STRING,
        field: 'title'
    },
    genre:{
        type: Sequelize.STRING,
        field: 'genre'
    }
},{tableName:'musiclist',sequelize,timestamps:false, sequelize });

class MusicAlbum extends Sequelize.Model {}
MusicAlbum.init({
    albumid:{
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    fk_musiclist_id:{
        type: Sequelize.INTEGER,
        field: 'fk_musiclist_id'
    },
    album:{
        type: Sequelize.STRING,
        field: 'album'
    }
},{tableName:'musicalbum',sequelize,timestamps:false, sequelize });

class Music {
    constructor(){
        try{
            this.prepareModel();
        } catch(error) {
            console.error("constructor error ", error);
        }
    }

    async prepareModel() {
        try {
            await Musiclist.sync({force:true});
            await MusicAlbum.sync({force:true});

            Musiclist.hasOne(MusicAlbum, {
                foreignKey:'fk_musiclist_id',
                onDelete:'cascade'
            });

            await this.allDataInsert();
        }
        catch (error) {
            console.log('prepareModel Error ', error);
        }
    }

    async allDataInsert() {
        const data = fs.readFileSync('./model/data.json');
        const musiclist = JSON.parse(data);
        for (var music of musiclist ) {
            await this.addMusic(music);
        }
    }

    getMusicList = async () => {
        let musiclist;
        await Musiclist.findAll({})
        .then( result => {
            musiclist = result;
        })
        .catch( error => {
            console.error('getMusicList error :', error);
        });
        return musiclist;
    }

    getMusicDetail = async (id) => {
        try {
            const row = await Musiclist.findAll({
                where:{musicid:id},
                include: [{model:MusicAlbum}]
            })
            if ( row ) {
                console.log("getMusicDetail row : " , row[0])
                return row[0];
            }
        }
        catch (error) {
            console.log('getMusicDetail error : ', error);
        }
    }

    addMusic = async (music) => {
        console.log("addmusic " , music);
        try {
            
            let addmusic = await Musiclist.create({ 
                            artist : music.artist,
                            title : music.title,
                            genre : music.genre,
                        }, {logging:false});
            let addalbum = await MusicAlbum.create({
                            album : music.album
                        }, {logging:false});
            const result = addmusic.dataValues;
            
            await addmusic.setMusicAlbum(addalbum);

            console.log('addmusic result : ', result);
            return result;
        } catch (error) {
            console.error('addMusic error ', error);
        }
    }

    updateMusic = async (id, music) => {
        try {
            let result = await Musiclist.update(
                {
                    artist: music.artist,
                    title: music.title,
                    genre: music.genre
                },
                { where: { musicid: { [Op.eq]:id } } }
            );
            console.log("updateMusic : " , result);
            return result;
        }
        catch (error) {
            console.log('updateMusic error : ', error);
        }
    }

    deleteMusic = async (musicid) => {
        try {
            let result = await Musiclist.destroy({ where: { musicid: { [Op.eq]: musicid } } });
            console.log('deleteMusic result : ', result);
        }
        catch (error) {
            console.log('deleteMusic error :', error);
        }
    }

}

module.exports = new Music();
