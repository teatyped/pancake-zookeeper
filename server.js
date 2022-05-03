const express = require("express");
const { animals } = require("./data/animals.json");
const fs = require("fs");
const path = require("path");
//import routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming json data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.use(express.static('public'));

const PORT = process.env.PORT || 3001;

 

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});
