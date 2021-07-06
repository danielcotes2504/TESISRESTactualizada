'use strict'

var Library = require('../models/library');

function getLibraries(req,res){
    Library.find({},(err,library) => {
        if(err){
            res.status(500).send({message: 'Erro al buscar.'});
        }else{
            if(!library){
                res.status(404).send({message:'No existen librerias.'});
            }else{
                res.status(200).send({library});
            }
        }
    });
}

function getLibraryId(req,res){
    var libraryId = req.params.id

    Library.find({_id:libraryId},['name','language','imgUrl','fileUrl'],(err,library)=>{
        if(err){

        }else{

        }
    })
}

function postLibrary(req,res){
    var library = new Library();
    var params = req.body;

    library.name = params.name;
    library.language = params.language;
    library.imgUrl = params.imgUrl;
    library.fileUrl = params.fileUrl;

    library.save((err,libraryStored)=>{
        if(err){
            res.status(500).send({message:'Error ' + err});
        }else{
            res.status(200).send({library: libraryStored});
        }
    });
}

function deleteLibrary(req,res){
    var libraryId = req.params.id;

    Library.findByIdAndRemove({_id:libraryId},req.body,(err,library)=>{
        if(err){
            res.status(500).send({ message: "Error"});

        }else if(!library){
            res.status(404).send({ message: "No existe"});

        }else if(!err){
            res.status(200).send({ message: "Libreria eliminada"});
        }
    });
}

module.exports = {
    getLibraries,
    getLibraryId,
    postLibrary,
    deleteLibrary
}