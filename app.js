const express = require('express');
const mongodb = require('./db/connect');
const contactsRoutes = require('./routes/contacts');
const cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();

// Middleware (IMPORTANT ORDER)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger (if required in your project)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/contacts', contactsRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Connect DB first, then start server
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