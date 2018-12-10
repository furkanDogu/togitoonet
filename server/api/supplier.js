const express = require('express');
const router = express.Router();


const auth = require('../util/auth');
const verifications = require('../util/verifications');
const { verifyToken, verifyIfSupplierExists } = verifications;

router.get('/', verifyToken ,(req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'SELECT * FROM view_tedarikciler';
        global.db.query(queryString, (error, result) => {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ result });
        });
    });
});

router.post('/', verifyToken, verifyIfSupplierExists, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'INSERT INTO ?? (tedarikciAdi, ilceID, ilID, telNo) VALUES(?, ?, ?, ?)';
        global.db.query(queryString, [
            'tbl_tedarikci', 
            req.body.supplierName, 
            parseInt(req.body.ilceID), 
            parseInt(req.body.ilID), 
            req.body.telNo
        ], (error, result) => {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ message: 'Supplier was successfully added' });
        });
    });
});

router.get('/cities', verifyToken, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'SELECT * FROM tbl_il';
        global.db.query(queryString, (error, result) => {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ result });
        });
    });
});

router.get('/towns/:id', verifyToken ,(req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'SELECT * FROM ?? WHERE ?? = ?';
        global.db.query(queryString, ['tbl_ilce', 'ilID', parseInt(req.params.id)], (error, result) =>{
            if (error) return res.status(500).json({ error });
            res.status(200).json({ result });
        });
    });
});


module.exports = router;