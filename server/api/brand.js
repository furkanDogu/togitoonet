const express = require('express');
const router = express.Router();

const auth = require('../util/auth');
const verifications = require('../util/verifications');
const { verifyToken } = verifications;

// this endpoint will return all brands saved in database
// requirements in header: token 
router.get('/', verifyToken, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'SELECT * FROM tbl_marka ORDER BY markaAdi';
        global.db.query(queryString, (error, result) => {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ result });
        });
    });
});

// this endpoint will add new brand to the database
// requirements in header: token 
// requirements in body: brandName
router.post('/', verifyToken, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'INSERT INTO ?? (??) values(?)';
        global.db.query(queryString, ['tbl_marka','markaAdi',req.body.brandName], (error, result) => {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ message: 'Brand was successfully added'});
        });
    });
});

module.exports = router;

