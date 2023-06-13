const handleFeed = (req, res, db) => {
    db.select('*').from('feed')
      .then(feed => res.json(feed))
}

module.exports = {handleFeed};

