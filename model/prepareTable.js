const conn = require('./dbConnection');

exports.prepareTable = () => {
    const sql = 'drop table if exists musiclist; create table musiclist (id int primary key auto_increment, artist varchar(50), song varchar(50), genre varchar(50));';
    conn.query(sql).then(ret => {
        console.log('테이블 생성');
        conn.end();
    }).catch(err => {
        console.log('테이블 생성 실패 :', err);
        conn.end();
    });
}