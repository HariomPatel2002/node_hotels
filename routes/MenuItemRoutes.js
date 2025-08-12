const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const { route } = require('./personRoutes');

router.post('/', async function (req, res) {
    try {
        const data = req.body;
        const MenuOrder = new MenuItem(data);
        const order = await MenuOrder.save();
        console.log('data saved', order);
        res.status(200).json(order);
    } catch (err) {
        console.error('Error saving menu item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/',async function(req,res){
    try{
        const data = await MenuItem.find();
        console.log('data fetched',data);
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})

router.get('/:taste',async function(req,res){
    try{
        const data = req.params.taste;
        if(data==='Spicy' || data==='sour' || data==='Sweet'){
            const response = await MenuItem.find({taste:data});
            console.log('data fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({ error: 'Invalid work type' });
        }
    }catch(err){
        console.log("Internal Sever Error",err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
//hello