const {prepareTable} = require('./prepareTable');
const pool = require('./dbConnection');
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const sequelize = new Sequelize('NodeProject', 'admin', 'cometrue', {
    dialect: 'mysql', host: 'idu-2020.cqve1sjxosi6.ap-northeast-2.rds.amazonaws.com'
});

class Musiclist extends Sequelize.Model {}
Musiclist.init({
    musicid:{
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: Sequelize.STRING,
        field: 'title'
    },
    artist:{
        type: Sequelize.STRING,
        field: 'artist'
    },
    soundcloudid:{
        type: Sequelize.INTEGER,
        field: 'soundcloudid'
    },
    genre:{
        type: Sequelize.STRING,
        field: 'genre'
    }
},{tableName:'musiclist',sequelize,timestamps:false, sequelize });

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

            await this.allDataInsert();
        }
        catch (error) {
            console.log('prepareModel Error ', error);
        }
    }

    async allDataInsert() {
        const data = fs.readFileSync('./model/data-music.json');
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

    getSearchMusicList = async (keyword) => {
        let musiclist;
        await Musiclist.findAll({
            where:{[Op.or]:[{title:{[Op.like]: "%" + keyword + "%"}},{artist:{[Op.like]: "%" + keyword + "%"}}]},
        })
        .then( result => {
            musiclist = result;
        })
        .catch( error => {
            console.error('getSearchMusicList error :', error);
        });
        return musiclist;
    }

    getMusicDetail = async (id) => {
        try {
            const row = await Musiclist.findAll({
                where:{musicid:id},
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
                            title : music.title,
                            artist : music.artist,
                            soundcloudid:music.soundcloudid,
                            genre : music.genre,
                        }, {logging:false});
            const result = addmusic.dataValues;

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
                    soundcloudid:music.soundcloudid,
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