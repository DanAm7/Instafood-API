const handleUpload = (req, res, db, fs) => {
    // const file = req.files.file;
    // const data = file.data;
    // const e64 = data.toString('base64');

    // db('feed')
    //   .returning('*')
    //   .where('imgsrc', '=', 7)
    //   .update({
    //         imgsrc: e64
    //   }) 
    //   .then(response => {
    //     console.log('upload res', response[0]);
    //     res.json(response[0]);
    // })


    

//////////////////////////////////////////////////////////////////////////////////////////
      const img = req.body.img;
      console.log(img);
      if (img) {

      console.log('img', img);

      db('feed')
      .returning('*')
      .where('imgsrc', '=', 7)
      .update({
            imgsrc: img
      }) 
      .then(response => {
        console.log('upload res', response[0]);
        res.json(response[0]);
    })
  } else {
    db.select('*').from('feed').where('imgsrc', '=', 7)
    .del()
    .then(res.json('deleted'))
    .catch(err => res.status(400).json('error getting user'))
  }
  ///////////////////////////////////////////////////////////////////////////////////////////    

}

module.exports = {
    handleUpload
}