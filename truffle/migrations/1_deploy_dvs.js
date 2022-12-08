// const Register = artifacts.require("Register");
const DVS = artifacts.require("DVS");

module.exports = function (deployer) {
  deployer.deploy(DVS);
};
