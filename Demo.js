const express = require('express');
const app = express();

app.get('/',function(req,res){
    res.send('Hello World');
});

app.get('/chicken',function(req,res){
    res.send("Hello sir i would love to serve chicken");
})

app.get('/idli',function(req,res){
    var data ={
        name:"Hariom patel",
        age :22,
        village : "Indore"
    }
    res.send(data);
})

app.post('/items',function(req,res){
    res.send('data is saved')
})

app.listen(3000);