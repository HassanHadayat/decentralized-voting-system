// import ECP from "./1_deploy_ecp";
const CandidateManager = artifacts.require("CandidateManager");

module.exports = function (deployer) {
  deployer.deploy(CandidateManager);
};
