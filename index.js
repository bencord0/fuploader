var fs = require('fs');
var express = require('express');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var app = express();

app.use(express.static('static'));
app.post('/', upload.single('uploadedfile'), function(req, res, next) {
    fs.rename(req.file.destination + '/' + req.file.filename,
              req.file.destination + '/' + req.file.originalname,
              function (err) {
                  if (err != null) {
                      console.log(err);
                  }
              })
    res.end();

});

app.listen(8000);
