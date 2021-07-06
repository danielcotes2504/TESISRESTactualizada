let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');

let fileWorker = require('../controllers/file.js');

router.post('/file/upload', upload.single('file'), fileWorker.uploadFile);
router.get('/file/all', fileWorker.listUrlFiles);
router.get('/file/:filename', fileWorker.downloadFile);

module.exports = router;