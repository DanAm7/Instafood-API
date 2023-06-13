const handleDel = (req, res, db) => {
    const { id } = req.body;
    db.select('*').from('feed').where('id', '=', id)
    .del()
    .then(res.json('deleted'))
    .catch(err => res.status(400).json('error getting user'))
}
     module.exports = {
        handleDel
    };
 