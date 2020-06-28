const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const log4js = require('log4js');
var log = log4js.getLogger();
log.level = 'debug';
log.debug("MemberRouter");

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

            await this.allDataInsert();
        }
        catch (error) {
            console.log('prepareModel Error ', error);
        }
    }

    async allDataInsert() {
        const data = fs.readFileSync('./model/data-member.json');
        const memberlist = JSON.parse(data);
        for (var member of memberlist ) {
            await this.addMember1(member);
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

    addMember1 = async (memberinfo) => {
        try {
            
            let addmember = await MemberInfo.create({ 
                            memberid : memberinfo.memberid,
                            name : memberinfo.name,
                            password : memberinfo.password,
                            memberimage : memberinfo.memberimage
                        }, {logging:false});
            
            const result = addmember.dataValues;

            return result;
        } catch (error) {
            console.error('add Member error ', error);
        }
    }

    login = async (id, pw) => {
        try {
            let loginMember = await MemberInfo.findOne({
                where:{memberid:id, password:pw}
            })
            log.debug("로그인 정보2 : " + loginMember);
            if (loginMember == null) 
                return null;
            else
                return loginMember.get(0);
        } catch (error) {
            console.error('login Member error ', error);
        }
    }

    readMember = async (id) => {
        try {
            let readMember = await MemberInfo.findOne({
                where:{memberid:id}
            })
            return readMember.get(0);
        } catch (error) {
            console.error('read Member error ', error);
        }
    }

    updateMember = async (nid, memberinfo) => {
        try {
            log.debug("updateMember 11" , nid, "  ", memberinfo);
            let result = await MemberInfo.update(
                {
                    name: memberinfo.name,
                    memberid: memberinfo.memberid,
                    password: memberinfo.password
                },
                { where: { id: { [Op.eq]:nid } } }
            );
            return result;
        }
        catch (error) {
            console.log('update Member error : ', error);
        }
    }
}

module.exports = new Member();