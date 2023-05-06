const Election = artifacts.require("Election");
// const GeneralElection = artifacts.require("GeneralElection");
// const NationalElection = artifacts.require("NationalElection");
// const ProvincialElection = artifacts.require("ProvincialElection");
// const Constituency = a

module.exports = function (deployer) {
  deployer.deploy(Election);
  // deployer.deploy(GeneralElection);
  // deployer.deploy(NationalElection);
  // deployer.deploy(ProvincialElection);
};
