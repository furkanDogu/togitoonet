const express = require('express');
const router = express.Router();


const auth = require('../util/auth');
const verifications = require('../util/verifications');
const { verifyToken, verifyIfCategoryExists } = verifications;

router.get('/', verifyToken, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'SELECT * FROM tbl_kategori';
        global.db.query(queryString, (error, result) => {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ result });
        });
    });
});

router.post('/', verifyToken, verifyIfCategoryExists, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'INSERT INTO ?? (??) values(?)';
        global.db.query(queryString, ['tbl_kategori', 'kategoriAdi',req.body.categoryName], (error, result) => {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ message: 'Category was successfully added'});
        });
    });
});

module.exports = router;


