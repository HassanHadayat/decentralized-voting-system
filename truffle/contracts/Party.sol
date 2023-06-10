// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Candidate.sol";

contract Party{
    uint256 public id;
    bytes32 public name;
    Candidate public chairman;
    bytes32 public postal_add;
    // bytes32 public symbol;
    bytes8 public _alias;

    uint public  candidates_count;
    mapping (uint => bytes16) candidates_cnics;
    mapping (bytes16 => uint) candidates_indexes;
    mapping (bytes16 => Candidate) public candidates;

    struct PartyConstituency{
        bytes16 candidate_cnic;
        bool exist;
    }
    bytes8[] public constituencies;
    mapping(bytes8 => PartyConstituency) public party_constituencies;

    constructor(uint _id, bytes32 _name, Candidate _chairman, bytes32  _postal_add, bytes8 __alias) {
        id = _id;
        name = _name;
        chairman = _chairman;
        postal_add = _postal_add;
        // symbol = _symbol;
        _alias = __alias;

        candidates_count=0;
    }

    function addCandidates(Candidate[] memory _candidates)public {
        for(uint i=0;i<_candidates.length;i++){
            addCandidate(_candidates[i]);
        }
    }
    function addCandidate(Candidate _cand) public {
        _cand.setParty(name);
        candidates_cnics[candidates_count] = _cand.cnic();
        candidates_indexes[_cand.cnic()] = candidates_count;
        candidates[_cand.cnic()] = _cand;
        
        candidates_count++;
    }
    function removeCandidate(bytes16 _cnic) public{

        // require(candidates[_cnic] , "Candidate does not exist");

        // for(uint i=0;i<candidates[_cnic].constituencies.length; i++){
        //     removeCandidateByConstituency(candidates[_cnic].constituencies[i]);
        // }
        candidates[_cnic].removeParty();
        delete candidates[_cnic];

        uint256 remove_index = candidates_indexes[_cnic];
        bytes16 remove_cnic = candidates_cnics[remove_index];
        bytes16 last_cnic = candidates_cnics[candidates_count-1];

        candidates_cnics[remove_index] = candidates_cnics[candidates_count-1];
        candidates_indexes[last_cnic] = remove_index;

        delete candidates_indexes[remove_cnic];
        delete candidates_cnics[candidates_count-1];
        candidates_count--;
    }

    function addConstituencyCandidate(bytes16 _cnic, bytes8 _constituency)public{
        party_constituencies[_constituency].candidate_cnic = _cnic;
        party_constituencies[_constituency].exist = true;
        constituencies.push(_constituency);

        candidates[_cnic].addConstituency(_constituency);
    }

    function removeConstituencyCandidate(bytes8 _constituency) public {
        
        candidates[party_constituencies[_constituency].candidate_cnic].removeConstituency(_constituency);
       
        delete party_constituencies[_constituency];
        
        for (uint256 i = 0; i < constituencies.length; i++) {
            if(_constituency == constituencies[i]){
                constituencies[i] = constituencies[constituencies.length - 1];
                constituencies.pop();
                break;
            }
        }
    }


    function isAnyCandidateNominated(bytes8 _constituency) public view returns (bool){
        // _constituency == NA-xx / PA-xx
        return party_constituencies[_constituency].exist;
    }

    function setId(uint256 _id) public {
        id = _id;
    }
    function getConstituencies() public view returns (bytes8[] memory){
        return constituencies;
    }
    struct ElectionConstituency{
        bytes32 candidate_name; 
        bytes16 candidate_cnic; 
        uint256 party_id;
        bytes32 party_name; 
        bytes32 party_alias; 
    }
    function getElectionConstituencyDetail(bytes8 const_name) public view returns(ElectionConstituency memory){
        return ElectionConstituency({
            candidate_name: candidates[party_constituencies[const_name].candidate_cnic].fullname(),
            candidate_cnic: party_constituencies[const_name].candidate_cnic,
            party_id: id,
            party_name: name,
            party_alias: _alias
        });
    }
    function getChairmanName() public view returns(bytes32){
        return chairman.fullname();
    }
    function getChairmanCnic() public view returns(bytes16){
        return chairman.cnic();
    }
}