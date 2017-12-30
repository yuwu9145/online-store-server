const bcrypt = require('bcrypt-nodejs');

var helper = function() {

  var bcryptGenerateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
  };
  var bcryptValidPassword = function(passwordOne, passwordTwo) {
    return bcrypt.compareSync(passwordOne, bcryptGenerateHash(passwordTwo))
  };
  
  return {
    bcryptGenerateHash: bcryptGenerateHash,
    bcryptValidPassword: bcryptValidPassword
  };
};
  
module.exports = new helper();