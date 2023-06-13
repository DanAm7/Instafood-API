const handleLogOut = (req, res, db) => {
    const { email } = req.body;
    db('users')
    .where('email', '=', email)
    .update({
        issignin: '0'
    })
   .then(response => {
       res.json(response);
   })
}

module.exports = {
    handleLogOut
}