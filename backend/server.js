require('dotenv').config();
const Express = require('express');
const App = Express();
const Auth = require('./controllers/auth');
const Contacts = require('./controllers/contacts');
const Users = require('./controllers/users');
const ConnectDB = require('./db');
const cors = require('cors')

let db;
(async () => {
  db = await ConnectDB();
  console.log('DB Connected');
})();

App.use(cors())
App.use(Express.json({ extended: false }));

App.use('/users', Users);
App.use('/auth', Auth);
App.use('/contacts', Contacts);
App.use('/', (_req, res) => res.status(405).send('Bad Request'));

const PORT = process.env.PORT || 1500;
console.log(PORT);
App.listen(PORT, () => {
  console.log('App started on port: ', PORT);
});