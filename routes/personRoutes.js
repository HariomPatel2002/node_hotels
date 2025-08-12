const express = require('express');
const router = express.Router();
const Person = require('../models/Person')

router.post('/',async function(req,res){
    try{
        const data = req.body; //Assuming the request body contains the person data

        //Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        //save the new person to the database
        const respone = await newPerson.save();
        console.log('data saved',respone);
        res.status(200).json(respone);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
});

router.get('/',async function(req,res){
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
});


router.get('/person/:workType', async function (req, res) {
    try {
        const workType = req.params.workType;

        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id',async function(req,res){
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true,
            runValidators: true,
        })
        
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data updated ');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id',async function(req,res){
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data deleted ');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({message:'Person Deleted Successfully'});
    }
})

module.exports = router;