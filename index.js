var fs = require('fs');
var express = require('express');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var app = express();

function log_error(err) {
    if (err != null) {
        console.log(err);
    }
};

app.use(express.static('static'));
app.post('/', upload.single('uploadedfile'), function(req, res, next) {

    var original = req.file.destination + '/' + req.file.originalname;
    var mangled = req.file.destination + '/' + req.file.filename;
    fs.stat(original, function (err, stats) {
        if (!stats) {
            fs.rename(mangled, original, log_error);
        } else {
            fs.unlink(mangled, log_error);
        };
    });

   res.redirect('/');

});

var port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log("Listening on %d", port);
});
