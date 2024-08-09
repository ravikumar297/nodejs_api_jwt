const { create, getUsersById, updateUser, deleteUser, getUsers, getUserByMail } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {sign} = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) =>{
        const body = req.body;
        console.log("body 1 : ", body)
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        console.log("body 2 :", body)
        create(body, (err, results) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    success : 0,
                    message : "Databse connection error",
                    date : []
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Success",
                data : results
            });
        }) 
    },

    getUsersById: (req, res) =>{
        const id = req.params.id;
        getUsersById(id, (err, results) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    success : 0,
                    message : err,
                    date : []
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Success",
                data : results
            });
        })
    },

    getUsers: (req, res) =>{ 
        getUsers((err, results) => { 
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    success : 0,
                    message : err,
                    date : []
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Success",
                data : results
            });
        })
    },

    updateUser: (req, res) =>{  
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt); 

        updateUser(body, (err, results) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    success : 0,
                    message : err,
                    date : []
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Success",
                data : results
            });
        })
    },

    deleteUser: (req, res) =>{
        const id = req.params.id;
        deleteUser(id, (err, results) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    success : 0,
                    message : err,
                    date : []
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Success",
                data : results
            });
        })
    },

    login: (req, res) => {
        const body = req.body; 
        getUserByMail(body.mail, (err, results) => { 
            if(err){
                console.log(err);
            }
            if(!results){
                return res.status(200).json({ success : 1, message : "Invlid email or password", data : results });
            }
            const result = compareSync(body.password, results.password);
            console.log(body.password, results.password, result)

            if(result){
                results.password = undefined;
                const jsonWT = sign({ result: results }, "rk2971999", { expiresIn: "1hr" });
                return res.status(200).json({ success : 1, message : "Success", data : jsonWT });
            }else{
                return res.status(200).json({ success : 1, message : "Invlid email or password", data : results });
            }
        })
    }
}