const contactsRoutes = require('./routes/contacts');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 3000;

const app = express();

app.use('/contacts', contactsRoutes);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log('Connected to MongoDB');
    });
  }
});