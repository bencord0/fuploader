var fs = require('fs');
var path = require('path');
var express = require('express');
var helmet = require('helmet');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var app = express();

function log_error(err) {
    if (err != null) {
        console.log(err);
    }
    return err
};


function handle_file(file) {
    var original = path.join(file.destination, file.originalname);
    var mangled = path.join(file.destination, file.filename);

    fs.stat(original, function (err, stats) {
        if (!stats) {
            fs.rename(mangled, original, log_error);
        } else {
            fs.unlink(mangled, log_error);
        };
    });
}


app.use(helmet());
app.use(express.static(path.join(__dirname, 'static')));
app.post('/', function(req, res, next) {

  uploader = upload.array('uploadedfile');
  uploader(req, res, function (err) {
    if (log_error(err)) return next(err);

    // everything is fine
    req.files.map(handle_file);

    res.redirect('/');
  });

});

module.exports = app;
