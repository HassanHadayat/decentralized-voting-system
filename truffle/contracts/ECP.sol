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

    // struct VoterConstituency {
    //     bytes16 cnic;
    //     bytes8 na;
    //     bytes8 pa;
    // }

    // uint256 public voters_count;
    // mapping(uint256 => bytes16) public voters_cnics;
    // mapping(bytes16 => uint256) public voters_indexes;
    // mapping(bytes16 => VoterConstituency) public voters;


    // mapping(bytes8 => bytes16[]) public na_voters;
    // mapping(bytes8 => bytes16[]) public pa_voters;

    // uint256 public candidates_count;
    // mapping(uint256 => bytes16) public candidates_cnics;
    // mapping(bytes16 => uint256) public candidates_indexes;
    // mapping(bytes16 => Candidate) public candidates;


    // uint256 public parties_count;
    // mapping(uint256 => Party) public parties;

    // uint256 public elections_count;
    // mapping(uint256 => Election) public elections;

    




    
}
