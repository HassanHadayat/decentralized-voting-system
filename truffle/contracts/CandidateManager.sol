// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./ECP.sol";
import "./Candidate.sol";
import "./CandidatesData.sol";

contract CandidateManager {
    ECP public ecp;
    CandidatesData public cands_data;
    
    // address private ecpAdd;

    uint256 public candidates_count;
    mapping(uint256 => bytes16) public candidates_cnics;
    mapping(bytes16 => uint256) public candidates_indexes;
    mapping(bytes16 => Candidate) public candidates;

    
    constructor(address _ecpAdd, address _cands_data){
        // require(ecpAdd == address(0), "ECP already set!");
        // ecpAdd = address(ecp);
        ecp = ECP(_ecpAdd);
        cands_data = CandidatesData(_cands_data);
        ecp.setCandidateManager(this);

        addCandidates(cands_data.getCandidates());
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx CANDIDATES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
    
    function addCandidate(bytes32 _fullname, uint _age, bytes1 _gender, bytes16 _cnic, bytes12 _contact, bytes32 _father_name, bytes32 _parmanent_add, bytes32 _local_add, bytes32 _province) public {
        candidates_cnics[candidates_count] = _cnic;
        candidates_indexes[_cnic] = candidates_count;
        candidates[_cnic] = new Candidate(_fullname, _age, _gender, _cnic, _contact, _father_name, _parmanent_add, _local_add, _province);
        
        candidates_count++;
    }

    function addCandidates(bytes32[] memory _fullname, uint[] memory _age, bytes1[] memory _gender, bytes16[] memory _cnic, bytes12[] memory _contact, bytes32[] memory _father_name, bytes32[] memory _parmanent_add, bytes32[] memory _local_add, bytes32[] memory _province) public {
        for (uint i = 0; i < _cnic.length; i++) {
            addCandidate(_fullname[i], _age[i], _gender[i], _cnic[i], _contact[i], _father_name[i], _parmanent_add[i], _local_add[i], _province[i]);
        }
    }
    function addCandidate(Candidate _cand) public{
        candidates_cnics[candidates_count] = _cand.cnic();
        candidates_indexes[_cand.cnic()] = candidates_count;
        candidates[_cand.cnic()] = _cand;
        
        candidates_count++;
    }
    function addCandidates(Candidate[] memory _cands) public {
        for (uint i = 0; i < _cands.length; i++) {
            addCandidate(_cands[i]);
        }
    }

    function removeCandidate(bytes16 _cnic) public {
        delete candidates[_cnic];

        uint256 remove_index = candidates_indexes[_cnic];
        bytes16 remove_cnic = candidates_cnics[remove_index];
        bytes16 last_cnic = candidates_cnics[candidates_count-1];

        candidates_cnics[remove_index] = candidates_cnics[candidates_count-1];
        candidates_indexes[last_cnic] = remove_index;

        delete candidates_indexes[remove_cnic];
        delete candidates_cnics[candidates_count-1];

        candidates_count--;

        // emit CandidateRemoved(_cnic);
    }

    function removeCandidates(bytes16[] memory _cnics) public {
        for (uint i = 0; i < _cnics.length; i++) {
            removeCandidate(_cnics[i]);
        }
    }

}
