#!/usr/bin/env node

var app = require('.');

var port = process.env.PORT || 8000;
app.listen(port, function() {
        console.log("Listening on %d", port);
});
