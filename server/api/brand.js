const express = require('express');
const router = express.Router();

const auth = require('../util/auth');
const verifications = require('../util/verifications');
const { verifyToken, verifyIfBrandExists } = verifications;

// this endpoint will return all brands saved in database
// requirements in header: token 
router.get('/', verifyToken, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'SELECT * FROM tbl_marka';
        global.db.query(queryString, (error, result) => {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ result });
        });
    });
});

// this endpoint will add new brand to the database
// requirements in header: token 
// requirements in body: brandName
// Given brand name will also be check by verifyIfBrandExists middlleware. If brand exists, it won't be added.
router.post('/', verifyToken, verifyIfBrandExists, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'INSERT INTO ?? (??) values(?)';
        global.db.query(queryString, ['tbl_marka','markaAdi',req.body.brandName], (error, result) => {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ message: 'Brand was successfully added'});
        });
    });
});

module.exports = router;

