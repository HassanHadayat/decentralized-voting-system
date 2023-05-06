// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Candidate.sol";

contract Party{
    uint public id;
    bytes32 public name;
    Candidate public chairman;
    bytes32 public postal_add;
    // bytes32 public symbol;
    bytes8 public _alias;

    uint public  candidates_count;
    mapping (uint => bytes16) candidates_cnics;
    mapping (bytes16 => uint) candidates_indexes;
    mapping (bytes16 => Candidate) candidates;

    mapping(bytes8 => bytes16) constituencies_candidate; // constituency => cand cnic

    mapping(bytes8 => uint) constituencies_indexes;
    
    struct PartyConstituency{
        bytes16 candidate_cnic;
        bool exist;
    }
    bytes8[] public constituencies;
    mapping(bytes32 => PartyConstituency) party_constituencies;

    // bytes32[] public na_constituencies;
    // bytes32[] public pa_constituencies;

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

        // constituencies_candidate[_constituency] = _cnic;
        // bytes2 prefix = bytes2(_constituency << 240);
        // if(prefix == 0x4e41){
        //     // NA
        //     na_constituencies.push(_constituency);
        //     constituencies_indexes[_constituency] = na_constituencies.length-1;
        // }
        // else if(prefix == 0x5041){
        //     // PA
        //     pa_constituencies.push(_constituency);
        //     constituencies_indexes[_constituency] = pa_constituencies.length-1;
        // }
    }

    function removeConstituencyCandidate(bytes8 _constituency) public {
        
        delete party_constituencies[_constituency];
        
        for (uint256 i = 0; i < constituencies.length; i++) {
            if(_constituency == constituencies[i]){
                constituencies[i] = constituencies[constituencies.length - 1];
                constituencies.pop();

            }
        }
        

        // delete constituencies_candidate[_constituency];
        // bytes2 prefix = bytes2(_constituency << 240);
        // if(prefix == 0x4e41){
        //     // NA
        //     na_constituencies[constituencies_indexes[_constituency]] = na_constituencies[na_constituencies.length - 1];
        //     constituencies_indexes[na_constituencies[na_constituencies.length - 1]] = constituencies_indexes[_constituency];
            
        //     delete constituencies_indexes[_constituency];
        //     na_constituencies.pop();
        // }
        // else if(prefix == 0x5041){
        //     // PA
        //     pa_constituencies[constituencies_indexes[_constituency]] = pa_constituencies[pa_constituencies.length - 1];
        //     constituencies_indexes[pa_constituencies[pa_constituencies.length - 1]] = constituencies_indexes[_constituency];
            
        //     delete constituencies_indexes[_constituency];
        //     pa_constituencies.pop();
        // }
    }
    function isAnyCandidateNominated(bytes8 _constituency) public view returns (bool){
        // _constituency == NA-xx / PA-xx
        return party_constituencies[_constituency].exist;
    }
    // function getNAConstituenciesCandidates() public view returns(Candidate[] memory){
    //     Candidate[] memory cands = new Candidate[](na_constituencies.length);

    //     for(uint i=0;i<na_constituencies;i++){
    //         cands[i] = constituencies_candidate[na_constituencies[i]];
    //     }
    //     return cands;
    // }
    
    // function getPAConstituenciesCandidates() public view returns(Candidate[] memory){
    //     Candidate[] memory cands = new Candidate[](na_constituencies.length);

    //     for(uint i=0;i<pa_constituencies;i++){
    //         cands[i] = constituencies_candidate[pa_constituencies[i]];
    //     }
    //     return cands;
    // }

}