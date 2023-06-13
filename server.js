const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const fs = require('fs');
const upload = require('express-fileupload');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const getfeed = require('./controllers/getfeed');
const addpost = require('./controllers/addpost');
const profile = require('./controllers/profile');
const user = require('./controllers/user');
const del = require('./controllers/del');
const login = require('./controllers/login');
const logout = require('./controllers/logout');
const islogged = require('./controllers/islogged');
const categories = require('./controllers/Categories');
const rating = require('./controllers/Rating');
const getrating = require('./controllers/GetRating');
const uploadfile = require('./controllers/upload');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  });


  const app = express();
  
  app.use(express.json());
  app.use(cors());
  app.use(upload());
  app.use(express.static('Uploads'))

  app.post('/getrating', (req, res) => { getrating.handleGetRating(req, res, db) })

  app.post('/rating', (req, res) => { rating.handleRating(req, res, db) })

  app.post('/user', (req, res) => { user.handleUser(req, res, db) })

  app.post('/categories', (req, res) => { categories.handleCat(req, res, db) })

  app.put('/login', (req, res) => { login.handleLogIn(req, res, db) })

  app.put('/logout', (req, res) => { logout.handleLogOut(req, res, db) })

  app.post('/islogged', (req, res) => { islogged.handleIsLogged(req, res, db) })

  app.post('/profile', (req, res) => { profile.handleProfile(req, res, db) })

  app.post('/del', (req, res) => { del.handleDel(req, res, db) })
  
  app.get('/getfeed', (req, res)=> { getfeed.handleFeed(req, res, db) })

  app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

  app.post('/addpost', (req, res) => { addpost.handleAddPost(req, res, db) })

  app.post('/upload', (req, res) => { uploadfile.handleUpload(req, res, db, fs) })

  app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
 
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
})
