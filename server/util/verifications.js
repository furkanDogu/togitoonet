const jwt = require('jsonwebtoken');


// a middleware that checks if the token is expired.
const verifyToken = (req, res, next) => {
    console.log(req.headers);
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
        queryString = 'CALL sp_hazir_pc_miktar_kontrol(?)';
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

const verifyIfBrandExists = (req, res, next) => {
    let queryString = 'SELECT * FROM tbl_marka';
        global.db.query(queryString, (error, result) => {
            if (error) return res.status(500).json({ error });
            if (!req.body.brandName) return res.status(500).json({ message: 'Empty brand name' });
            let brandName = req.body.brandName;
            brandName = brandName.toLowerCase();
            result.forEach((brand) => {
                if (brand.markaAdi.toLowerCase() === brandName) return res.status(500).json({ message: 'Brand name is already being used'});
            });
            next();
        });
}
const verifyIfCategoryExists = (req, res, next) => {
    let queryString = 'SELECT * FROM tbl_kategori';
        global.db.query(queryString, (error, result) => {
            if (error) return res.status(500).json({ error });
            if (!req.body.categoryName) return res.status(500).json({ message: 'Empty category name' });
            let categoryName = req.body.categoryName;
            categoryName = categoryName.toLowerCase();
            result.forEach((category) => {
                if (category.kategoriAdi.toLowerCase() === categoryName) return res.status(500).json({ message: 'Category name is already being used'});
            });
            next();
        });
}

const verifyIfSupplierExists = (req, res, next) => {
    let queryString = 'SELECT * FROM view_tedarikciler';
    global.db.query(queryString, (error, result) => {
        if (error) return res.status(500).json({ error });
        // There can't be 2 suppliers with same name in one city so we check this
        result.forEach((supplier) => {
            if (supplier.tedarikciAdi.toLowerCase() === req.body.supplierName.toLowerCase() && parseInt(supplier.ilID) === parseInt(req.body.ilID)) {
                return res.status(500).json({ message: "There can't be 2 suppliers with same name in one city"});
            }
        });
        next();
    });
}

module.exports = {
    verifyToken,
    verifyQuantity,
    verifyTitle,
    verifyIfBrandExists,
    verifyIfCategoryExists,
    verifyIfSupplierExists
}