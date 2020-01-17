const express = require("express");

const actionDb = require("../data/helpers/actionModel");
const projectDb = require("../data/helpers/projectModel")

const router = express.Router();

router.use(express.json());


//GET returns all actions

router.get("/", (req, res) => {
    actionDb.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "There was an error while returning database."
            })
        })
})

// GET get actions by ID

router.get("/:id", validateAction_id, (req, res) => {
    const id = req.params.id
    actionDb.get(id)
        .then(act => {
            res.status(200).json(act)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                errorMessage: "There was an error finding project."
            })
        })
    
})

//POST Create new action

router.post(":id/actions", validateAction, (req, res) => {
    
    actionsDb.insert(req.body)
        .then(action => {
           res.status(201).json(action) 
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "There was as error while saving action to Database."
            })
        })
})

// PUT edit action by id

router.put("/:id", validateAction_id, (res, req) => {
    const valid = req.body;
    const id = req.params.id;
    actionDb.update(valid, id)
        .then(edit => {
            res.status(200).json(edit)
            console.log(id)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "There was an error while saving your update to database."
            })
        })
})


//Custom Middleware
function validateAction(req, res, next) {
    
    const valid = req.body;
    if (valid.project_id === null)
        res.status(400).json({
            errorMessage: " Project Id is required."
        })
    else if (valid.description === "")
        res.status(400).json({
            errorMessage: "Description is required."
        })
        
    else if (valid.notes === "")
        res.status(400).json({
            errorMessage: "Notes are required"
        })
    else if (valid.description.length > 128)
        res.status(400).json({
            errorMessage: "too many characters keep it under 128 characters."
        })
    else
        next();
}
function validateAction_id(req, res, next) {
    const id =req.params.id
    actionDb.get(id)
        .then(action => {
            if(action) {
                req.action = action;
                next();                
            } else {
                res.status(400).json({
                    message: "This ID doesn't exist."
                })                
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "There was an error while saving to your database."
            })
        })
}
module.exports = router;