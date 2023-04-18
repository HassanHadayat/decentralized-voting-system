// const Register = artifacts.require("Register");
const ECP = artifacts.require("ECP");

module.exports = function (deployer) {
  deployer.deploy(ECP);
};


// const User = artifacts.require("User");

// module.exports = function (deployer) {
//   deployer.deploy(User);
// };

// const Candidate = artifacts.require("Candidate");

// module.exports = function (deployer) {
//   deployer.deploy(Candidate);
// };
