const express = require("express");

const router = require("express").Router();


const projectDb = require("../data/helpers/projectModel");

router.use(express.json());



// GET all projects

router.get("/", (req, res) => {
    projectDb.get()
        .then(allProjects =>{
            res.status(200).json(allProjects)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                errorMessage: "There was an error retrieving projects data."
            })
        })
}) 

//GET  project by ID

router.get("/:id", validateProject_id, (req, res) => {
    const id = req.params.id
    projectDb.get(id)
        .then(pro => {
            res.status(200).json(pro)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                errorMessage: "There was an error finding project."
            })
        })
    
})

// POST create a project

router.post("/", validateProject, (req,res) => {
    projectDb.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                errorMessage: "There was an error saving to database."
            })
        })
})

// PUT updating a project
router.put("/:id", validateProject_id, (req, res) => {
    const id = req.params.id;
    const edit = req.body;
    projectDb.update(id, edit)
        .then(updte => {
            res.status(200).json(updte)
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "There was an error while saving changes to your Database."
            })
        })
})

// DELETE  remove a project

router.delete("/:id", validateProject_id, (req, res) => {
    const id = req.params.id;
    projectDb.remove(id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "There was an error while deleting your project."
            })
        })
})

// Custom Middleware

function validateProject(req, res, next) {
    const valid = req.body;
    if (valid.name && valid.description)
        next();
    else
        res.status(400).json({
            errorMessage: "Name and Description required"
        })
}
function validateProject_id(req, res, next) {
    const id =req.params.id
    projectDb.get(id)
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