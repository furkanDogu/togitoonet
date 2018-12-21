const express = require('express');
const router = express.Router();


const auth = require('../util/auth');
const verifications = require('../util/verifications');
const { verifyToken, verifyIfSupplierExists } = verifications;


// this endpoint will return all suppliers saved in database
// requirements in header: token 
router.get('/', verifyToken ,(req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'SELECT * FROM view_tedarikciler';
        global.db.query(queryString, (error, result) => {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ result });
        });
    });
});

// this endpoint will add new supplier to the database
// requirements in header: token 
// requirements in body: supplierName, ilID, ilceID, telNo
// Given supplier name and ilID will also be check by verifyIfSupplierExists middlleware. There can't be same named suppliers in same city.
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

// this endpoint will get all cities from the database. 
// requirements in header: token
router.get('/cities', verifyToken, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'SELECT * FROM tbl_il';
        global.db.query(queryString, (error, result) => {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ result });
        });
    });
});

// this endpoint will get all towns according to given city id from the database.
// requirements in header: token
// requirements in URL: id (belongs to the city)
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