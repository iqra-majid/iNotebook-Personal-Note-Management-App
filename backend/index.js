//express server 
const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
    res.send('Welcome to the MERN stack application');
  });


  app.listen(port, () => {
    console.log(`iNoteBook app is listening at http://localhost:${port}`);
  });