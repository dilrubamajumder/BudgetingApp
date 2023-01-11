const express = require("express")
const budgets = express.Router()
const budgetsArray = require("../models/budget")
const { v4: uuidv4 } = require("uuid");

budgets.use(express.json())

//INDEX

budgets.get('/', ( req, res ) => {
    req.body.id = uuidv4()
    res.json(budgetsArray)
})

//SHOW
budgets.get('/:index', ( req, res ) => {
    req.body.id = uuidv4()
    const { index } = req.params;
    if(budgetsArray[index]){
        res.status(200).json(budgetsArray[index])
    }else{
        res.status(404).redirect('/404');
    }
})

//CREATE
budgets.post('/', ( req,res ) => {
    req.body.id = uuidv4()
    budgetsArray.push(req.body)
    res.json(budgetsArray.at(-1))
})

//UPDATE
budgets.put('/:index', ( req, res ) => {
    const { index } = req.params;
    if(budgetsArray[index]){
        budgetsArray[index] = req.body;
        res.status(200).json(budgetsArray[index]);
    } else{
        res.status(404).json({ message: "Not Found" });
    }
})

//DELETE
budgets.delete('/:index', ( req, res ) => {
   const deletedBudget = budgetsArray.splice(req.params.index, 1)
   res.status(200).json(deletedBudget)
})


module.exports = budgets 