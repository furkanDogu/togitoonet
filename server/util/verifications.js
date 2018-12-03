const jwt = require('jsonwebtoken');
const { createEscapeStr, findAttrCount, convertIdToIntArray } = require('../util/queryHelper');

// a middleware that checks if the token is expired.
const verifyToken = (req, res, next) => {
    var token = req.headers['web-token'];
    if (!token) {
        return res.status(403).json({ auth: false, message: 'No token provided'});
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token'});
        req.role = decoded.role;
        req.userID = decoded.userID;
        next();
    });
}

// a middleware that helps us detect if there is enough amount of product to register.
const verifyQuantity = (req, res, next) => {
    const MAX_REGISTER_AMOUNT = 1;
    let queryString = 'SELECT ?? FROM ?? WHERE ?? = ?';
    if (req.params.type === 'component') {
        global.db.query(queryString, ['stokMiktari', 'tbl_bilesen', 'bilesenID', req.params.id], (error, result) => {
            if (error) {
                 return res.status(400).json({ error: error });
            } else if (result[0].stokMiktari < MAX_REGISTER_AMOUNT) {
                 return res.status(500).json({ 
                     message: 'Lack of source'
                 });
            }
            next();
         });
    } else if (req.params.type === 'allOne') {
        queryString = 'CALL hazir_pc_miktar_kontrol(?)';
        global.db.query(queryString, [req.params.id], (error, result) => {
            if (error) {
                return res.status(400).json({ error: error });
            } else if (MAX_REGISTER_AMOUNT <= result[0][0].stokMiktari) {
                next();
            }  else {
                res.status(400).json({ error: error });
            } 
        });
        
    } else {
        return res.status(400).json({ 
            message: 'Bad request'
        });
    }
    
    
}

// a middleware that helps us detect if the product is registered to a person.
const verifyIfRegistered = (req, res, next) => {
    let queryString = null;
    if (req.params.type === 'component') {
        //verify component registeration
        queryString = 'SELECT ?? FROM ?? WHERE ?? = ?';
        global.db.query(queryString, ['aktifMi', 'tbl_zimmetli_urun','zimmetID', req.params.id], (error, result) => {
            if (error) return res.status(400).json({ error: error });
            //if the requested item doesn't have registeration or item doesn't registered at all
            if (result.length === 0 || result[0].aktifMi === 0) {
                return res.status(400).json({ message: 'There is no item registered with given ID' });
            }
            next();
        });
        
    } else {
        // verify all in one pc registeration
        let queryString = null;
        //first verify given pcID parameter by checking if there is a pc with that ID
        queryString = 'SELECT * FROM ?? WHERE ?? = ?';

        global.db.query(queryString, ['tbl_hazir_pc', 'pcID', req.params.id], (error, result) => {
            if (error) return res.status(400).json({ error: error });
            if (result.length === 0) {
                return res.status(400).json({ message: 'There is no all in one pc with given ID' });
            }

            //then verify if they there are enough parameter for components of pc.
            if (req.body.hasOwnProperty("zimmetIDs") && req.body.hasOwnProperty("bilesenIDs")) {
                //select * from tbl_zimmetli_urun where zimmetID IN (8,50) AND aktifMi = 1
                const parameterCount = findAttrCount(req.body.zimmetIDs);
                queryString = 'SELECT * FROM '+ global.db.escapeId('tbl_zimmetli_urun')+ ' WHERE '+ global.db.escapeId('zimmetID') +' IN';
                queryString = queryString.concat(createEscapeStr(parameterCount));
                queryString = queryString.concat(' AND ' + global.db.escapeId('aktifMi') + ' = ' + global.db.escape(1));

                global.db.query(queryString, convertIdToIntArray(req.body.zimmetIDs), (error, result) => {
                    if (error) return res.status(400).json({ error: error });
                    if (result.length !== parameterCount) {
                        return res.status(400).json({ message: 'There were lack of parameters '});
                    }
                    next();
                });
            } else {
                return res.status(400).json({ message: 'There were lack of parameters '});
            }

        }); 


        
    }
}

// a middleware that helps us check if person has enough title to be a user of program.
const verifyTitle = (req, res, next) => {
    let queryString = null;
    queryString = 'SELECT * FROM ?? WHERE ?? = ?';
    global.db.query(queryString, ['tbl_user', 'personelID', parseInt(req.params.id)], (error, result) => {
        if (error) return res.status(400).json({ error });
        if (result.length !== 0) {
            return res.status(400).json({ message: 'This user added before '});
        } else {
            const personelID = parseInt(req.params.id);
            queryString = 'SELECT ?? FROM ?? WHERE ?? = ?';
            global.db.query(queryString, ['unvanID', 'tbl_personel', 'personelID', personelID], (error, result) => {
                if (error) return res.status(400).json({ error });
                console.log(result[0].unvanID);
                if (result.length > 0 && result[0].unvanID !== 2) {
                    parseInt(result[0].unvanID) === 1 ? req.newUserRole = 3 : req.newUserRole = 2;
                    next();
                } else {
                return res.status(400).json({ message: 'Invalid information for new user' });
                }
        
            });
        }
    });
}

module.exports = {
    verifyToken,
    verifyQuantity,
    verifyIfRegistered,
    verifyTitle
}