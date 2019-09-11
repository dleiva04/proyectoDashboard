const express = require("express");
const next = require("next");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
     .prepare()
     .then(() => {
          const server = express();
          server.use(cors());


          mongoose.connect('mongodb://localhost:27017/next-express', { useNewUrlParser: true, useUnifiedTopology: true })
               .then(() => {
                    console.log('=> Conectado al cluster');
               })
               .catch((err) => {
                    console.log("error al conectarse =>", err);
               })

          server.use(express.urlencoded({ extended: true }));
          server.use(express.json());

          // Controllers
          const UserController = require('./db/controllers/UserController');

          // Routes
          server.post('/api/user/register', UserController.register);
          server.post('/api/user/login', UserController.login);


          server.get("*", (req, res) => {
               return handle(req, res);
          });

          server.listen(PORT, err => {
               if (err) throw err;
               console.log(`> Ready on http://localhost:${PORT}`);
          });
     })
     .catch(ex => {
          console.error(ex.stack);
          process.exit(1);
     });
