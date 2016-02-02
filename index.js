var fs = require('fs');
var path = require('path');
var express = require('express');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var app = express();

function log_error(err) {
    if (err != null) {
        console.log(err);
        return true;
    }
    return false;
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


app.use(express.static('static'));
app.post('/', function(req, res) {

  uploader = upload.array('uploadedfile');
  uploader(req, res, function (err) {
    if (log_error(err)) return;

    // everything is fine
    for (file in req.files) {
      handle_file(req.files[file])
    }

    res.redirect('/');
  });

});

var port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log("Listening on %d", port);
});
