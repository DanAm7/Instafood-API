const handleGetRating = (req, res, db) => {
    const { id } = req.body;
    db.select('*').from('feed')
    .where('id', '=', id)
    .then(recipe => {
        res.json(recipe)
    })
}

module.exports = {
    handleGetRating
};
  