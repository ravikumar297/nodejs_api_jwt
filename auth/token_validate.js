const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken : (req, res, next) => {
        let token = req.get('authorization');
        if(token){
            token = token.slice(7);
            verify(token, "rk2971999", (err, decoded) => {
                if(err){
                    res.json({
                        success : 0,
                        message : "Invaid Token"
                    });
                }else{
                    next();
                }
            });
        }else{
            res.json({
                success : 0,
                message : "Access Denied"
            });
        }
    }
}