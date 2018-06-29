'use strict';


module.exports.getEncryptedPassword = function (password, cb) {

  var passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9\.\-\_\!]+){6,15}$/g;

  // if (!passwordReg.test(password)) {
  //   return cb(false, 'Password must contain at least one digit and be between 6 and 15 characters long.');
  // } else if (password.length < 6 || password.length > 15) {
  //   return cb(false, 'Password must be in between 6 and 15 characters');
  // }

  require('machinepack-passwords').encryptPassword({
    password: password
  }).exec({
    error: function (err) {
      req.wantsJSON = true;
      if (!password) {
        //return res.badRequest('Missing password field');
        return cb(false, 'Missing password field');
      }
      return cb(false, err);
    },
    success: cb
  });
};

module.exports.getMyEncryptedPassword = function (password) {
  var Promise = require("bluebird");
  var machinepack = Promise.promisify(require('machinepack-passwords').encryptPassword);
  return machinepack({
    password: password
  });

};

module.exports.isMatchedPassword = function (password, user, cb) {
  require('machinepack-passwords').checkPassword({
    passwordAttempt: password,
    encryptedPassword: user.password
  }).exec({
    // An unexpected error occurred.
    error: function (err) {
      return cb(err, false);
    },
    // Password attempt does not match already-encrypted version
    incorrect: function () {
      return cb(null, false);
    },
    // OK.
    success: function () {
      return cb(null, true);
    }
  });
};

module.exports.errorResponse = function (err, res, responseFormat) {
  sails.log.debug(err);
  let rsp = {},
    _status = 500;
  if (err instanceof CustomError) {
    rsp = {
      err: err.message
    };
    _status = err.status || 500;

  } else if (err instanceof Error) {
    rsp = {
      err: err.message
    };
  } else {
    rsp = err;
  }

  if (responseFormat && responseFormat == 'xml') {
    const jstoxml = require('jstoxml');
    res.setHeader("Content-type", "text/xml");
    return res.send(jstoxml.toXML(rsp, {
      header: true,
      indent: '    '
    }), _status);
  } else {
    res.send(rsp, _status);
  }

};
