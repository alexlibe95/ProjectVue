'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;

var _stringUtil = require('../../utilities/string-util');

var _userModel = require('../../model/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _authService = require('../../services/auth-service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
    var validation = validateIndex(req.body);
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }

    _userModel2.default.findOne({ username: req.body.username.toLowerCase() }, function (error, user) {
        if (error) {
            return res.status(500).json();
        }

        if (!user) {
            return res.status(500).json();
        }

        _bcryptNodejs2.default.compare(req.body.password, user.password, function (err, result) {
            if (result) {
                var token = (0, _authService.generateJWT)(user);
                console.log(token);
                return res.status(200).json({ token: token });
            } else {
                return res.status(401).json();
            }
        });
        //const passwordsMatch = User.passwordMatches(req.body.password, user.password);
        //  if(!passwordsMatch){
        //    return res.status(401).json();
        //  }
        //  return res.status(200).json();
    });
}

function validateIndex(body) {
    var errors = '';
    if (_stringUtil.StringUtil.isEmpty(body.username)) {
        errors += 'Username is required. ';
    }
    if (_stringUtil.StringUtil.isEmpty(body.password)) {
        errors += 'Password is required. ';
    }

    return {
        isValid: _stringUtil.StringUtil.isEmpty(errors),
        message: errors
    };
}