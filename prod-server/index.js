'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _env = require('./config/env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 3000;

(0, _env.setEnvironment)(app);
(0, _routes.registerRoutes)(app);

console.log(process.env.NODE_ENV + "gamietesssss");
app.get('/', function (req, res) {
    var temp = "production";
    if (process.env.NODE_ENV !== temp) {

        return res.send('Running server in development mode.');
    } else {

        return res.sendFile('index.html', { root: __dirname + '/../dist/' });
    }
});

app.listen(port, function () {
    console.log('MEVN app listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode!');
});