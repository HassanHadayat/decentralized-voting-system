const VoterManager = artifacts.require("VoterManager");

module.exports = function (deployer) {
  deployer.deploy(VoterManager);
};
