const express = require('express');
const router = express.Router();
const multer = require('multer'); // helps us to handle form data.
const upload = multer(); 

const auth = require('../util/auth');
const verifications = require('../util/verifications');
const { verifyToken, verifyQuantity } = verifications;

// adding a product (either a component or an all in one pc)
router.post('/add/:type', verifyToken, upload.none() ,(req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        // if coming request wants to save a new component
        let queryString = null;
        if (req.params.type === 'component') {
            console.log(req.body);
            queryString = 'CALL sp_bilesen_ekle(?, ?, ?, ?, ?, ?, ?, ?);';
            global.db.query(queryString, 
            [
                req.body.bilesenAdi,
                parseInt(req.body.kategoriID),
                parseInt(req.body.markaID),
                parseInt(req.body.tedarikciID),
                parseInt(req.body.satinAlinanAdet),
                parseFloat(req.body.fiyat),
                parseInt(req.userID),
                -1 // means that we don't want to attach this 'bilesen' to any all in one pc
            ], 
            (err) => {
                if (err) {
                    return res.status(501).json({
                        error: err,
                        message: "Couldn't add the 'bilesen'",
                    });
                }
                res.status(200).json({
                    message: "Added the 'bilesen' successfuly" 
                });
            });
            
        } else if (req.params.type === 'allOne') {
            // if coming requres want to save a new all in one
            
            queryString = 'CALL sp_hazir_pc_ekle(?, ?, ?, ?, ?, ?, ?);';
            global.db.query(queryString,
                [
                    parseInt(req.body.pcMarkaID),
                    req.body.pcRenk,
                    parseFloat(req.body.pcFiyat),
                    req.body.pcAdi,
                    parseInt(req.body.pcSatinAlinanAdet),
                    parseInt(req.body.pcTedarikciID),
                    parseInt(req.userID)
                ], (err, pcID) => {
                    if (err) {
                        return res.status(501).json({
                            message: "Couldn't add the hazir_pc",
                            error: err
                        });
                    }
                    // if the hazir_pc is succesfuly added to the db, we get the ID returned from hazir_pc_ekle procedure  
                    queryString = 'INSERT INTO ?? (bilesenAdi, kategoriID, markaID, tedarikciID, satinAlinanAdet, stokMiktari, fiyat, pcID, satinAlmaTarihi, satinAlanID) VALUES ?'
                    // creating copy of the bilesenler
                    var copyOfBilesenler = req.body.bilesenler.map(function(arr) {
                        return arr.slice();
                    });
                    tempAddPCInfo(copyOfBilesenler, parseInt(req.body.pcSatinAlinanAdet), parseInt(pcID[0][0]['id']), parseInt(req.body.pcTedarikciID), parseInt(req.userID),(addedOne) => {
                        global.db.query(queryString, ['tbl_bilesen',addedOne], (err) => {
                            if (err) { 
                                return res.status(501).json({ error: err }); 
                            }
                            res.status(200).json({ basarili: 'sonunda'});
                        }); 
                    });
                }); 
        } else {
            // invalid type entered
            res.status(500).json({ message: 'Invalid type entered' });
        }
    });
});

// we need this method because we need to attach pc info to its components.
function tempAddPCInfo(components, satinAlinanAdet, pcID, tedarikciID, satinAlanID, callback) {
    const queryString = 'SELECT NOW() AS now'
    global.db.query(queryString, (err, result) => {
        let newArr = [];
        for (let i = 0; i < components.length; i++) {
        let temp = [];
            for (let j = 0; j < components[i].length; j++) {
                //this loop helps type casting operations of components array.
                if (j) {
                    temp.push(parseInt(components[i][j]));
                } else {
                    temp.push(components[i][j]);
                }
            }
            //here we attach pc information to its components.
            temp = temp.concat([tedarikciID, satinAlinanAdet, satinAlinanAdet, 0, pcID, result[0]['now'], satinAlanID]);
            newArr.push([...temp]);
        }
        callback(newArr);
    });
}

// registering a product to a person
// takes; - id wiht URL param  -personelID with body
//pcID for allOne and bilesenID for components
router.post('/register/:type/:id', verifyToken, verifyQuantity, (req, res, next) => {
    console.log(req);
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = null;
        if (req.params.type === 'component') {
            queryString = 'CALL sp_bilesen_zimmetle(?, ?)';
            global.db.query(queryString, [req.params.id, parseInt(req.body.personelID)], (error, result)=> {
                if (error) return res.status(500).json({ error: error });
                res.status(200).json({ ok: ' component successfully registered '});
            });
        } else if(req.params.type === 'allOne') {
            queryString = 'CALL sp_hazir_pc_zimmetle(?, ?)';
            global.db.query(queryString, [req.params.id, parseInt(req.body.personelID)], (error, result) => {
                if (error) return res.status(500).json({ error: error });
                res.status(200).json({ ok: 'All in one pc is successfully registered '});
            });
        } else {
            // invalid type entered
            res.status(500).json({
                message: 'Invalid type entered'
            });
        }
    });
});


// removing a registeration from a person
// takes zimmetID for components and takes zimmetID too for all in one pcS as id parameter
router.post('/removereg/:type/:id', verifyToken, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = null;
        if (req.params.type === 'component') {
            // removing a component registeration from a person
            queryString = 'CALL sp_bilesen_zimmet_kaldir(?)';
            global.db.query(queryString, [req.params.id], (error) => {
                if (error) return res.status(500).json({ error: error });
                res.status(200).json({ message: 'Successfully removed registeration from component' });
            });
        } else if (req.params.type === 'allOne') {
            queryString = 'CALL sp_hazir_pc_zimmet_kaldir(?)';
            global.db.query(queryString, [req.params.id], (error) => {
                if(error) return res.status(500).json({ error });
                res.status(200).json({ message: 'Succesfully removed registeration from all in one pc '});
            });
        } else {
            return res.status(400).json({
                message: 'Bad removing registeration request'
            });
        }
    });
});

// adding broken product
// takes zimmetID for components and  takes zimmetID for allOne pc part
router.post('/broken/:type/:id', verifyToken, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = null;
        if (req.params.type === 'component') {
            queryString = 'CALL sp_arizali_bilesen_ekle(?, ?)';
            global.db.query(queryString, [parseInt(req.params.id), req.body.desc], (error, result) => {
                if (error) return res.status(400).json({ error });
                res.status(200).json({ message: 'added broken product successfully' });
            });
        } else if (req.params.type === 'allOne') {
            queryString = 'CALL sp_arizali_hazir_pc_bileseni_ekle(?, ?)';
            global.db.query(queryString, [parseInt(req.params.id), req.body.desc], (error, result) => {
                if (error) return res.status(400).json({ error });
                res.status(200).json({ message: 'added broken computer part successfully'});
            });
        } else {
            return res.status(400).json({ message: 'Invalid type entered' });
        }
    });
});


router.get('/unregistered', verifyToken, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'SELECT * FROM view_zimmetsiz_bilesenler';
        global.db.query(queryString, (err, b_result) => {
            if (err) return res.status(500).json({ err });
            queryString = 'SELECT * FROM view_zimmetsiz_pcler';
            global.db.query(queryString, (error, h_result) => {
                if (error) return res.status(500).json({ error });
                const result = [...b_result, ...h_result];
                queryString = 'SELECT * FROM view_zimmetsiz_pc_parcalari';
                global.db.query(queryString, (error, response) => {
                    if (error) return res.status(500).json({ error });
                    res.status(200).json({ 
                        result,
                        'parcalar': response 
                     });
                });
            });
        });
    });
});

router.get('/registered', verifyToken, (req, res, next) => {
    return auth.doOnlyWith(['admin','sales'], req, res, () => {
        let queryString = 'SELECT * from view_zimmetli_bilesenler';
        global.db.query(queryString, (error, b_result) => {
            if (error) return res.status(500).json({ error });
            //res.status(200).json({ result });
            queryString = 'SELECT * FROM view_zimmetli_hazir_pcler';
            global.db.query(queryString, (error, h_result) => {
                if (error) return res.status(500).json({ error });
                const result = [...h_result, ...b_result];
                queryString = 'SELECT * FROM view_zimmetli_pc_parcalari';
                global.db.query(queryString, (error, response) => {
                    if (error) return res.status(500).json({ error });
                    res.status(200).json({
                        result,
                        'parcalar': response
                    });
                });
            });
        });
    });
});
router.get('/broken', verifyToken, (req,res,next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = 'SELECT * from view_arizali_bilesenler';
        global.db.query(queryString, (error, result) => {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ result });
        });
    });
});
module.exports = router;