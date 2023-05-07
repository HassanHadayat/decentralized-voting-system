// import ECP from "./1_deploy_ecp";
const PartyManager = artifacts.require("PartyManager");

module.exports = function (deployer) {
  deployer.deploy(PartyManager);
};
