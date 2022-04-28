const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect('mongodb://localhost:27017/socialmedia_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});

