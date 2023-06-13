const handleUser = (req, res, db) => {
    const { email } = req.body;
    db.select('*').from('users').where('email', '=', email)
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.status(400).json('error')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}
     module.exports = {
        handleUser
    };
 