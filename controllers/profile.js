const handleProfile = (req, res, db) => {
    const { name } = req.body;
    console.log(name);
    db.select('*').from('feed').where('ownname', '=', name)
    .then(feed => {
      if (feed) {
        res.json(feed)
      } else {
        res.json('[]')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}
     module.exports = {
        handleProfile
    };
 