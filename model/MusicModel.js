const {prepareTable} = require('./prepareTable');
const pool = require('./dbConnection');

class Music {

    getMusicList = async () => {
        const sql = 'SELECT * FROM musiclist;';
        let conn;
        try {
            conn = await pool.getConnection();
            const [rows, metadata] = await conn.query(sql);
            return rows;
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    }

    getMusicDetail = async (musicid) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const sql = 'SELECT * FROM musiclist WHERE musicid = ?;';
            const [rows, metadata] = await conn.query(sql,musicid);
            return rows;
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    }

    addMusic = async (artist, title, genre) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const sql1 = 'INSERT INTO musiclist(artist, title, genre) values(?,?,?);';
            const data = [artist, title, genre];
            const result1 = await conn.query(sql1, data);
            const sql2 = 'SELECT * FROM musiclist WHERE musicid = ?;';
            const result2 = await conn.query(sql2,result1[0].insertId);
            return result2[0];
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) {
                conn.release();
            }
        }
        
    }

    updateMusic = async (musicid, artist, title, genre) => {
        const sql = 'UPDATE musiclist SET artist = ?, title = ?, genre =? WHERE musicid = ?;';

        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(sql, [artist,title,genre,musicid] );

            return this.getMusicDetail(musicid);
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    }

    deleteMusic = async (musicid) => {
        const sql = 'DELETE FROM musiclist WHERE musicid = ?;';

        let conn;
        try {
            conn = await pool.getConnection();
            const result = await conn.query(sql, [musicid]);

            return null;
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    }
}

module.exports = new Music();
