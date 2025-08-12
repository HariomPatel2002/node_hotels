const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/MenuItemRoutes')

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;

app.get('/',function(req,res){
    res.send("Welcome to our Hotel");
});

app.use('/menu',menuItemRoutes)

app.use('/person',personRoutes);

app.listen(3000,function(req,res){
    console.log(`Port is listning at ${PORT}`);
})

