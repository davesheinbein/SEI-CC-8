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
        res.status(404).json(err)
    })
}

function create(req, res){
    console.log(req.body)
    Puppy.create(req.body)
    .then((puppy) => {
        console.log(puppy, "< - this is mongo")
        res.status(201).json(puppy);
    })
}

function deletePuppy (req, res){
    console.log(req.params.id)
    Puppy.deleteOne({_id: req.params.id})
     .then((result) => {
       res.status(200).json({message: "The resource was successfully deleted"})  
     }).catch((err) => {
         res.status(404).json({message: "no resource"})
     })
}

function update(req, res){
    console.log(req.params.id)
    console.log(req.body)
    Puppy.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatePuppy) => {
        console.log(updatePuppy)
        res.status(200).json({message: "Resource updated", data: updatePuppy})
    })
}