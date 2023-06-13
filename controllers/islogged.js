const handleIsLogged = (req, res, db) => {
    const { email } = req.body;
    db.select('*').from('users')
    .where('email', '=', email)
      .then(user => res.json(user))
}

module.exports = {handleIsLogged};

