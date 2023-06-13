const handleAddPost = (req, res, db) => {
    const name = req.body.name;
    const type = req.body.type;
    const tags = req.body.tags;
    const recipe = req.body.recipe;
    const ownname = req.body.ownname;

    db('feed')
    .returning('*')
    .insert({
          ownname: ownname,
          imgsrc: '7',
          name: name,
          type: type,
          tags: tags,
          recipe: recipe
    }) 
    .then(response => {
        console.log('add res', response[0]);
        res.json(response[0]);
    })
    

}

module.exports = {
    handleAddPost
}