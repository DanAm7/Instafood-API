const handleLogIn = (req, res, db) => {
    const { email } = req.body;
    db('users')
    .where('email', '=', email)
    .update({
        issignin: '1'
    })
   .then(response => {
       res.json(response);
   })
}

module.exports = {
    handleLogIn
}