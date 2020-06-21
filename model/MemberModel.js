const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const log4js = require('log4js');

const sequelize = new Sequelize('NodeProject', 'admin', 'cometrue', {
    dialect: 'mysql', host: 'idu-2020.cqve1sjxosi6.ap-northeast-2.rds.amazonaws.com'
});

class MemberInfo extends Sequelize.Model {}
MemberInfo.init({
    id:{
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    memberid :{
        type: Sequelize.STRING,
        field: 'memberid'
    },
    name :{
        type: Sequelize.STRING,
        field: 'name'
    },
    password :{
        type: Sequelize.STRING,
        field: 'password'
    },
    memberimage :{
        type: Sequelize.STRING,
        field: 'memberimage'
    }
},{tableName:'memberinfo',sequelize,timestamps:false, sequelize });

class Member {
    constructor(){
        try{
            this.prepareModel();
        } catch(error) {
            console.error("constructor error ", error);
        }
    }

    async prepareModel() {
        try {
            await MemberInfo.sync({force:true});
        }
        catch (error) {
            console.log('prepareModel Error ', error);
        }
    }

    addMember = async (memberinfo, imageurl) => {
        try {
            
            let addmember = await MemberInfo.create({ 
                            memberid : memberinfo.memberid,
                            name : memberinfo.name,
                            password : memberinfo.password,
                            memberimage : imageurl
                        }, {logging:false});
            
            const result = addmember.dataValues;

            return result;
        } catch (error) {
            console.error('add Member error ', error);
        }
    }
}

module.exports = new Member();