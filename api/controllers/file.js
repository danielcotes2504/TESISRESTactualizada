const uploadFolder = './uploads/';
const fs = require('fs');

exports.uploadFile = (req, res) => {
    console.log(req.file.filename)
    res.send('File uploaded successfully! -> filename = ' + req.file.filename);
}

exports.listUrlFiles = (req, res) => {
    fs.readdir(uploadFolder, (err, files) => {
        for (let i = 0; i < files.length; ++i) {
        files[i] = "http://localhost:3000/api/file/" + files[i];
    }
    
    res.send(files);
    })
}

exports.downloadFile = (req, res) => {
    let filename = req.params.filename;
    res.download(uploadFolder + filename);  
}