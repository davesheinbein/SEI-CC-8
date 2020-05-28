const Puppy = require('../../models/puppy');

module.exports = {
    index,
    create,
    deletePuppy,
    update
}

function index(req, res){
    Puppy.find({})
        .then(function(puppies){
            // send back json
            res.status(200).json(puppies);
        }).catch((err) => {
            res.status(404).json(err);
        })
}

function create(req, res){
    Puppy.create(req.body)
    .then((puppy) => {
        res.status(201).json(puppy);
    }).catch((err) => {
        res.status(404).json(err);
    })
}

function deletePuppy(req, res){
    console.log(req.params.id);
    Puppy.deleteOne({_id: req.params.id})
    .then((result) => {
        res.status(200).json({message: "The resource was successfully deleted"});
    }).catch((err) => {
        res.status(404).json({message: "The resource was NOT successfully deleted"});
    })
}

function update(req, res){
    Puppy.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatePuppy) => {
        res.status(200).json({message: "Resource update", data: updatePuppy})
    }).catch((err) => {
        res.status(404).json({message: "The resource was NOT successfully deleted"});
    })
}