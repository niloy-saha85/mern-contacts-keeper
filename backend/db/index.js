const mongoose = require('mongoose');
const url = `mongodb+srv://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASS)}@contactskeeper.ejzxv.mongodb.net/contacts_keeper?retryWrites=true&w=majority`;

let connection;
const ConnectDB = async () => {
  try {
    connection = await mongoose.connect(url);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = ConnectDB;
