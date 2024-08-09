const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {  
        pool.query(
            'INSERT INTO USERS (first_name, last_name, mail, password, address, state, city) VALUES (?,?,?,?,?,?,?)',
            [data.first_name, data.last_name, data.mail, data.password, data.address, data.state, data.city],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getUsers: (callback) => {  
        pool.query( 'SELECT * FROM USERS', [], (error, results, fields) => {
            if(error){
                return callback(error, null);
            }
            return callback(null, results);
        })
    },

    getUsersById: (id, callback) => {  
        pool.query( 'SELECT * FROM USERS WHERE id = ?', [id], (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results[0]);
        })
    },

    updateUser: (data, callback) => {    
        pool.query(
            'UPDATE USERS SET first_name = ?, last_name = ?, mail = ?, password = ?, address = ?, state = ?, city = ? WHERE id = ?',
            [data.first_name, data.last_name, data.mail, data.password, data.address, data.state, data.city, data.id],
            (error, results, fields) => { 
                if(error){
                    return callback(error, null);
                }
                return callback(null, results);
            }
        )
    },

    deleteUser: (data, callback) => {  
        pool.query( 'DELETE FROM USERS WHERE id = ?', [data.id], (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results[0]);
        })
    },

    getUserByMail :(mail, callback) =>{  
        pool.query(" SELECT * FROM USERS WHERE mail = ?", [mail], (error, results, fields) => { 
            if(error){
                return callback(error, null)
            }
            return callback(null, results[0]);
        })
    }
}