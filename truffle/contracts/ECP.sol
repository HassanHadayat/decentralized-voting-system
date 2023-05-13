// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// import "./console.sol";
import "./VoterManager.sol";
import "./CandidateManager.sol";
import "./PartyManager.sol";
import "./ElectionManager.sol";

contract ECP {

    VoterManager public voterManager;
    CandidateManager public candidateManager;
    PartyManager public partyManager;
    ElectionManager public electionManager;

    function setVoterManager(VoterManager _voterManager) public  {
        voterManager = _voterManager;
    }

    function setCandidateManager(CandidateManager _candidateManager) public  {
        candidateManager = _candidateManager;
    }

    function setPartyManager(PartyManager _partyManager) public  {
        partyManager = _partyManager;
    }

    function setElectionManager(ElectionManager _electionManager) public  {
        electionManager = _electionManager;
    }
    
}
