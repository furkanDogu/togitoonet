
const giveFirstAuthority = (rolID) => {
    let auth = null;
    if (rolID === 1) {
        auth = 'admin';
    } else if (rolID === 2) {
        auth = 'sales'
    } else {
        auth = 'chief'
    }
    return auth; 
}

const doOnlyWith = (people, req, res, action) => {
    if (people.includes(req.role)) {
        return action();
    } 
    return res.status(403).json({ 'message': 'Access if forbidden'});
}

module.exports = {
   giveFirstAuthority,
   doOnlyWith
}