

// after logging user to the system, we need to get the role from database and attach the role to the token.
// in client this token will be used for differantiating users. For ex.: admin will see more different drawer menu then the sales employee.
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
// this is our main middleware that helps us check if coming requests' owners have enough title to make those requests.
// parameters: people : (who can make that requires), action: (what will happen if request owner has enough title) 
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