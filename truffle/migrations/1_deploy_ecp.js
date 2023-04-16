// const Register = artifacts.require("Register");
const ECP = artifacts.require("ECP");

module.exports = function (deployer) {
  deployer.deploy(ECP);
};
