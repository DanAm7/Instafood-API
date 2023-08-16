const handleRating = async (req, res, db) => {
  const { action, email, id } = req.body;

  try {
    const data = await db.select('*').from('feed').where('id', '=', id);

    if (!data || !data[0]) {
      console.error('Invalid ID or data not found.');
      res.status(400).json('Invalid ID or data not found.');
      return;
    }

    if (data[0].rated === null) {
      await createAndUpdateTable(id, email, db);
      await adjustRating(action, id, db, res);
    } else if (data[0].rated === '1') {
      const existingEmail = await db(`i${id}`).where('email', '=', email);

      if (existingEmail && existingEmail[0]) {
        console.error('User has already rated.');
        res.status(400).json('Already rated');
      } else {
        await insertEmail(id, email, db);
        await adjustRating(action, id, db, res);
      }
    }
  } catch (error) {
    console.error('Error handling rating:', error);
    res.status(500).json('Internal server error');
  }
};

async function createAndUpdateTable(id, email, db) {
  try {
    await db.schema.createTable(`i${id}`, table => {
      table.increments();
      table.string('email');
    });

    await db('feed').where('id', '=', id).update({ rated: '1' });
    await insertEmail(id, email, db);
  } catch (error) {
    console.error('Error in createAndUpdateTable:', error);
    throw error;  // Re-throw the error to be caught in the main handler
  }
}

async function adjustRating(action, id, db, res) {
  try {
    if (action === 'up') {
      const rating = await db('feed').where('id', '=', id).increment('rating', 1).returning('rating');
      res.json(rating[0]);
    } else if (action === 'down') {
      const rating = await db('feed').where('id', '=', id).decrement('rating', 1).returning('rating');
      res.json(rating[0]);
    } else {
      console.error('Invalid action received:', action);
      res.status(400).json('Invalid action');
    }
  } catch (error) {
    console.error('Error in adjustRating:', error);
    throw error;  // Re-throw the error to be caught in the main handler
  }
}

async function insertEmail(id, email, db) {
  try {
    await db(`i${id}`).insert({ email });
  } catch (error) {
    console.error('Error in insertEmail:', error);
    throw error;  // Re-throw the error to be caught in the main handler
  }
}

module.exports = {
  handleRating
};



// const handleRating = (req, res, db) => {
//     const { action, email, id } = req.body;
// //////////////////////////////////////////////////////////////////////////////////
// var AlreadyRated = '';

// function CreateTable(id) {
//   console.log('CreateTable');
//   db.schema.createTable(`i${id}`, function (table) {
//     table.increments();
//     table.string('email');
//   }).then();
//   }

//   function Update1(id) {
//     console.log('update 1');
//     db('feed').where('id', '=', id)
//     .update({ 
//       rated: '1'
//     }).then();
//   }
  
  
  
//   function InsertEmail(id, email) {
//     console.log('insertEmail');
//     db(`i${id}`).insert({
//       email: email
//   }).then();
  
//   }

  
//   function CheckEmail(id, email) {
//        console.log('CheckEmail');
//       db(`i${id}`).where('email', '=', email).catch(err => {console.log('check email error')});
//   }
  
  
//   function Up(id) {
//     console.log('up');
//     db('feed').where('id', '=', id)
//     .increment('rating', 1)
//     .returning('rating')
//     .then(rating => {res.json(rating[0])}).catch(err => {console.log('error up')});
//   }
  
  
  
//   function Down(id) {
//     console.log('down');
//     db('feed').where('id', '=', id)
//     .decrement('rating', 1) 
//     .returning('rating')
//     .then(rating => {res.json(rating[0])}).catch(err => {console.log('error down')});
//   }
  
  


// //////////////////////////////////////////////////////////////////////////////////
//     db.select('*').from('feed')
//       .where('id', '=', id)
//       .then(data => {
//         console.log(data);
//         if (data[0].rated === null) {
//             CreateTable(id);
//             Update1(id);
//             InsertEmail(id, email);
//             if (action === 'up') {
//               Up(id);
//             }
    
//             if (action === 'down') {
//               Down(id);
//             }
//         }
// ////////////////////////////////////////////////////////////////
//       if (data[0].rated === '1') {


//         console.log('CheckEmail');


//         db(`i${id}`).where('email', '=', email).then(data2 => {
//           console.log(data2[0]);
//           if (data2[0]) {
//             console.log("!!!!!!!!!!!!!!!!!!!already alerted");
//               res.status(400).json('already rated').catch(err => {console.log('check email error')});
//         } else {
//           console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@not ratedet")
//           InsertEmail(id, email);

//         if (action === 'up') {
//           Up(id);
//         }

//         if (action === 'down') {
//           Down(id);
//         }
//       }

//         }).catch(err => {console.log('end of secend if error')});
        
//     }
//       }).catch(err => {console.log('end of all error')});

//       }
//       module.exports = {
//         handleRating
//     };
      
