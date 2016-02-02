var fs = require('fs');
var express = require('express');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var app = express();

app.use(express.static('static'));
app.post('/', upload.single('uploadedfile'), function(req, res, next) {

    var original = req.file.destination + '/' + req.file.originalname;
    var mangled = req.file.destination + '/' + req.file.filename;
    fs.stat(original, function (err, stats) {
        if (!stats) {
            fs.rename(mangled, original, function (err) {
                if (err != null) {
                    console.log(err);
                }
            });
        } else {
            fs.unlink(mangled, function (err) {
                if (err != null) {
                    console.log(err);
                }
            });
        };
    });

   res.redirect('/');

});

app.listen(8000);
