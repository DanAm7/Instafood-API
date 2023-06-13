const handleCat = (req, res, db) => {
    const { type } = req.body;
    db.select('*').from('feed').where('type', '=', type)
      .then(feed => res.json(feed))
}
module.exports = {handleCat};

