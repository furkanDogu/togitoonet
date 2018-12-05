const express = require('express');
const router = express.Router();
const multer = require('multer'); // helps us to handle form data.
const upload = multer(); 

const queryHelper = require('../util/queryHelper');
const auth = require('../util/auth');
const verifications = require('../util/verifications');
const { verifyToken, verifyQuantity, verifyIfRegistered } = verifications;
const { createEscapeStr, convertIdToIntArray, findAttrCount } = queryHelper;

// adding a product (either a component or an all in one pc)
router.post('/add/:type', verifyToken, upload.none() ,(req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        // if coming request wants to save a new component
        let queryString = null;
        if (req.params.type === 'component') {
            queryString = 'CALL bilesen_ekle(?, ?, ?, ?, ?, ?, ?, ?);';
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
            queryString = 'CALL hazir_pc_ekle(?, ?, ?, ?, ?, ?, ?);';
            global.db.query(queryString,
                [
                    parseInt(req.body.pcMarkaID),
                    req.body.pcRenk,
                    parseFloat(req.body.pcFiyat),
                    req.body.pcAdi,
                    parseInt(req.body.pcSatinAlinanAdet),
                    parseInt(req.body.pcTedarikciID),
                    parseInt(req.body.pcSatinAlanID)
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
                    tempAddPCInfo(copyOfBilesenler, parseInt(req.body.pcSatinAlinanAdet), parseInt(pcID[0][0]['id']), parseInt(req.body.pcTedarikciID), parseInt(req.body.pcSatinAlanID),(addedOne) => {
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
router.post('/register/:type/:id', verifyToken, verifyQuantity, (req, res, next) => {

    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = null;
        if (req.params.type === 'component') {
            queryString = 'CALL bilesen_zimmetle(?, ?)';
            global.db.query(queryString, [req.params.id, parseInt(req.body.personelID)], (error, result)=> {
                if (error) return res.status(500).json({ error: error });
                res.status(200).json({ ok: 'harbiden ekledi mi bakalım ? '});
            });
        } else if(req.params.type === 'allOne') {
            queryString = 'CALL hazir_pc_zimmetle(?, ?)';
            global.db.query(queryString, [req.params.id, parseInt(req.body.personelID)], (error, result) => {
                if (error) return res.status(500).json({ error: error });
                res.status(200).json({ ok: 'hazir_pc zimmetlendi '});
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
// takes zimmetID for components and takes pc id for all in one pcS as id parameter
router.post('/removereg/:type/:id', verifyToken, verifyIfRegistered, (req, res, next) => {

    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = null;
        if (req.params.type === 'component') {
            // removing a component registeration from a person
            queryString = 'CALL bilesen_zimmet_kaldir(?)';
            global.db.query(queryString, [req.params.id], (error) => {
                if (error) return res.status(500).json({ error: error });
                res.status(200).json({ message: 'Successfully removed registeration' });
            });
        } else if (req.params.type === 'allOne') {
            let db = global.db;
            let queryString = 'SELECT NOW() as now'
            db.query(queryString, (er, response) => {
                // this code block will make 'aktifMi' feature of all components that belongs to a all in one pc passive
                queryString = 'UPDATE' + db.escapeId('tbl_zimmetli_urun') +' SET '+ db.escapeId('aktifMi')+' = '+db.escape(0) + ', '+ db.escapeID('zimmetKaldirmaTarihi') +' = '+response[0]['now']+' WHERE '+ db.escapeId('zimmetID') +' IN';
                queryString = queryString.concat(createEscapeStr(findAttrCount(req.body.zimmetIDs)));
                // update tbl_zimmetli_urun set aktifMi = 0 where zimmetID in (1,2,3,4);
                db.query(queryString, convertIdToIntArray(req.body.zimmetIDs), (error) => {
                    if (error) return res.status(500).json({ error: error });
                    queryString = 'UPDATE' + db.escapeId('tbl_bilesen') +' SET '+ db.escapeId('stokMiktari')+' = '+ db.escapeId('stokMiktari')+ '+' +db.escape(1)+' WHERE '+ db.escapeId('bilesenID') +' IN';
                    queryString = queryString.concat(createEscapeStr(findAttrCount(req.body.bilesenIDs)));
                    db.query(queryString, convertIdToIntArray(req.body.bilesenIDs), (error) => {
                        if (error) return res.status(500).json({ error: error });
                        queryString = 'UPDATE ?? SET ?? = ?? + ? WHERE ?? = ?';
                        db.query(queryString, ['tbl_hazir_pc', 'stokMiktari', 'stokMiktari', 1, 'pcID', req.params.id], (error) => {
                            if (error) return res.status(500).json({ error: error });
                            res.status(200).json({ message: 'inanmam'});
                        });
                    })    

                });
            });
            
        } else {
            return res.status(400).json({
                message: 'Bad removing registeration request'
            });
        }
    });
});

// adding broken product
// takes zimmetID for components and ..
router.post('/broken/:type/:id', verifyToken, (req, res, next) => {
    return auth.doOnlyWith(['admin', 'sales'], req, res, () => {
        let queryString = null;
        if (req.params.type === 'component') {
            queryString = 'CALL arizali_bilesen_ekle(?, ?)';
            global.db.query(queryString, [parseInt(req.params.id), req.body.desc], (error, result) => {
                if (error) return res.status(400).json({ error });
                res.status(200).json({ message: 'added broken product successfully' });
            });


        } else if (req.params.type === 'allOne') {
            let db = global.db;
            let queryString = null;
            // add broken all in one pc
            //-- 1) zimmetIDs, bilesenIDs, arizalıparçaId al+
            //-- 2) arızalı parçayı arızalı bileşenler tablosuna ekle +
            //-- 3) zimmetli ürünler tablosunda tüm bileşenlerin aktifliğini 0 yap.+
            //-- 4) stokmiktari ve satinalinanadedi 0 olan yeni bileşenler ekle +
            //-- 5) yeni bileşenler eskileriyle aynı olacak ancak farklı id. +
            //-- 6) bu yeni bileşenlerin pc idleri -1 olacak +
            //-- 7) bu yeni bileşenler aynı personele zimmetlenecek. 
            queryString = 'SELECT ?? FROM ?? WHERE ?? = ?';

            db.query(queryString, ['bilesenID', 'tbl_zimmetli_urun', 'zimmetID', req.params.id], (error, result) => {
                if (error) return res.status(400).json({ error: error });
                const brokenProductID = result[0].bilesenID;

                let bilesenIDs = req.body.bilesenIDs;
                Object.keys(bilesenIDs).map(key => { // deleting broken product from bilesenIDs
                    if (parseInt(bilesenIDs[key]) === brokenProductID ) delete bilesenIDs[key];
                });

                queryString = 'CALL arizali_bilesen_ekle(?, ?)';
                db.query(queryString, [req.params.id, req.body.desc], (error, result) => { // adding the broken product
                    if (error) return res.status(400).json({ error: error });
                    const productCount = findAttrCount(req.body.zimmetIDs);
                    queryString = 'UPDATE ' + db.escapeId('tbl_zimmetli_urun') + ' SET ' + db.escapeId('aktifMi') + ' = ' + db.escape(0) + ' WHERE ' + db.escapeId('zimmetID') + ' IN';
                    queryString = queryString.concat(createEscapeStr(productCount));
                    // update tbl_zimmetli_urun set aktifMi = 0 where zimmetID in (?,?)
                    db.query(queryString, convertIdToIntArray(req.body.zimmetIDs), (error, result) => { // removing all registeration from products
                        if (error) return res.status(400).json({ error: error });
                        queryString = 'INSERT INTO '+ db.escapeId('tbl_bilesen') +' (bilesenAdi, kategoriID, markaID, tedarikciID, satinAlinanAdet, stokMiktari, fiyat, satinAlmaTarihi) ';
                        queryString = queryString.concat('SELECT '+ db.escapeId('bilesenAdi') +', '+ db.escapeId('kategoriID')+', '+ db.escapeId('markaID') +', '+ db.escapeId('tedarikciID') +', 0, 0, '+ db.escapeId('fiyat') +', ');
                        queryString = queryString.concat(db.escapeId('satinAlmaTarihi') + ' FROM '+ db.escapeId('tbl_bilesen') +' WHERE ');
                        queryString = queryString.concat(db.escapeId('bilesenID') + ' IN');
                        queryString = queryString.concat(createEscapeStr(findAttrCount(bilesenIDs)));
                        db.query(queryString, convertIdToIntArray(bilesenIDs), (error, result) => {
                            if (error) return res.status(400).json({ error: error });
                            queryString = 'CALL son_eklenen_n_bilesen_zimmetle(?, ?)';
                            // we need to subtract 1 from total product count because we don't want to register the broken product to a person.
                            db.query(queryString, [productCount - 1, parseInt(req.params.id)], (error, result) => {
                                if (error) return res.status(400).json({ error });
                                res.status(200).json({ message: 'hasiktir lan '});
                            });

                        });
                                
                    });
                
                });
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

module.exports = router;