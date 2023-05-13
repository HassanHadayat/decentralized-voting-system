const ECP = artifacts.require("ECP");
const VoterManager = artifacts.require("VoterManager");
const CandidateManager = artifacts.require("CandidateManager");
const PartyManager = artifacts.require("PartyManager");
const ElectionManager = artifacts.require("ElectionManager");
const ConstituenciesData = artifacts.require("ConstituenciesData");
const VotersData = artifacts.require("VotersData");
const CandidatesData = artifacts.require("CandidatesData");
const PartiesData = artifacts.require("PartiesData");

module.exports = function (deployer) {
  deployer.deploy(ECP).then(function() {
    return deployer.deploy(VotersData);
  }).then(function() {
    return deployer.deploy(VoterManager, ECP.address, VotersData.address);
  }).then(function() {
    return deployer.deploy(CandidatesData);
  }).then(function() {
    return deployer.deploy(CandidateManager, ECP.address, CandidatesData.address);
  }).then(function() {
    return deployer.deploy(PartiesData);
  }).then(function() {
    return deployer.deploy(PartyManager, ECP.address, PartiesData.address);
  }).then(function() {
    return deployer.deploy(ConstituenciesData);
  }).then(function() {
    return deployer.deploy(ElectionManager, ECP.address, ConstituenciesData.address);
  });
};
