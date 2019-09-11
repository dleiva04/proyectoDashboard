const UserModel = require('../models/UserModel');
const dotenv = require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
     register, login
};

async function register(req, res) {
     let data = req.body;
     let User = new UserModel({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          password: data.password
     });
     let hash = await bcrypt.hashSync(User.password, 8);
     User.password = hash;
     User.save()
          .then(userSaved => {
               console.log(userSaved);
               res.json({ success: true, result: 'Usuario registrado' });
          })
          .catch(err => {
               console.log('error', err);
               res.json({ success: false, result: err });
          });
};

async function login(req, res) {
     let data = req.body;
     UserModel.find({ email: data.email }, (err, user) => {
          if (user.length > 0) {
               bcrypt.compare(data.password, user[0].password)
                    .then((ans) => {
                         console.log(ans);
                         //jwt
                         let dataJWT = {
                              id: user[0]._id,
                              name: user[0].name,
                              lastName: user[0].lastName,
                              email: user[0].email
                         };
                         console.log(dataJWT);
                         let token = jwt.sign(dataJWT, process.env.SECRET_JWT, { expiresIn: '1h' });
                         if (ans) {
                              res.json({ success: true, result: token });
                         }
                         res.json({ success: false, result: 'Password' });
                    });
          }
     })
}

async function login(req, res) {
     let data = req.body;
     UserModel.find({ email: data.email }, (err, user) => {
          if (user.length > 0) {
               bcrypt.compare(data.password, user[0].password)
                    .then((ans) => {
                         console.log(ans);
                         //jwt
                         let dataJWT = {
                              id: user[0]._id,
                              name: user[0].name,
                              lastName: user[0].lastName,
                              email: user[0].email
                         };
                         console.log(dataJWT);
                         let token = jwt.sign(dataJWT, process.env.SECRET_JWT, { expiresIn: '1h' });
                         if (ans) {
                              res.json({ success: true, result: token });
                         }
                         res.json({ success: false, result: 'Password' });
                    });
          }
     })
}
