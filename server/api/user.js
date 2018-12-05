const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../util/auth');
const { verifyTitle, verifyToken } = require('../util/verifications');


router.post('/login', (req, res, next) => {
    const failedMessage = {
        auth: false 
    };
    global.db.query("SELECT * FROM ?? where ?? = ?", ['tbl_user', 'email', req.body.email], (err, user, fields) => {
        // check if there is a mistake 
        if (err) return res.status(404).json(failedMessage); 
        if (user.length === 0) {
            return res.status(404).json(failedMessage);
        }
        bcrypt.compare(req.body.password, user[0].userPassword, (err, result) => {
            // if there is an error while comparing the passwords
            if (err) {
                return res.status(401).json(failedMessage);
            }
            // if passwords are matched 
            const email = user[0].email,
            name = user[0].personelAdi,
            userID = user[0].userID,
            role = auth.giveFirstAuthority(user[0].rolID);
            
            if (result) {
                // create token that expires in 1 hour
                // add the email and role of the logged user to the
                // payload of token
                const token = jwt.sign({
                    email,
                    name,
                    userID,
                    role,

                },
                process.env.JWT_KEY,
                {
                    "expiresIn": "1h"
                });

                return res.status(200).json({
                    auth: true,
                    token: token,
                    email,
                    name,
                    userID,
                    role
                });
            }
            // if passwords aren't matched
            res.status(401).json(failedMessage);
        });
    });
});

router.post('/register/:id',verifyToken, verifyTitle, (req, res, next) => {
    return auth.doOnlyWith(['admin'], req, res, () => {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
            if (error) return res.status(400).json({ error });
            let queryString = 'CALL user_ekle(?, ?, ?)';
            global.db.query(queryString, [parseInt(req.params.id), hash, req.newUserRole], (error, result) => {
                if (error) return res.status(400).json({ error });
                res.status(200).json({ message: 'User succesfully added' });
            });

        });
    });
});
// helps us check if user's token is stil valid and user just refreshed the page. 
// to check client passes us the token if it's valid, we return corresponding data in token (after decoding the token)
router.post('/check', (req, res, next) => {
    console.log(req.body);
    jwt.verify(req.body.token, process.env.JWT_KEY, (error, decoded) => {
        if (error) return res.status(400).json({ error });
        res.status(200).json({
            token: req.body.token,
            email: decoded.email,
            name: decoded.name,
            userID: decoded.userID,
            role: decoded.role
        });
    });
});

router.get('/', verifyToken, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'SELECT * FROM view_personeller';
        global.db.query(queryString, (error, result) => {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ result });
        });
    });
});

module.exports = router;

