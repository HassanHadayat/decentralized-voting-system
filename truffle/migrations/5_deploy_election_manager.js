// import ECP from "./1_deploy_ecp";
const ElectionManager = artifacts.require("ElectionManager");

module.exports = function (deployer) {
  deployer.deploy(ElectionManager);
};
