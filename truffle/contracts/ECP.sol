// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Candidate.sol";


contract ECP {
    struct VoterConstituency {
        bytes32 cnic;
        bytes32 na;
        bytes32 pa;
    }

    uint256 public voters_count;
    mapping(uint256 => bytes32) public voters_cnics;
    mapping(bytes32 => uint256) public voters_indexes;
    mapping(bytes32 => VoterConstituency) public voters;

    uint256 public candidates_count;
    mapping(uint256 => bytes32) public candidates_cnics;
    mapping(bytes32 => uint256) public candidates_indexes;
    mapping(bytes32 => Candidate) public candidates;


    event VoterAdded(bytes32 cnic, bytes32 na, bytes32 pa);
    event VotersAdded(uint256 count);
    event VoterRemoved(bytes32 cnic);
    event VotersRemoved(uint256 count);
    
    event CandidateAdded(bytes32 _fullname, uint _age, bytes32 _gender, bytes32 _cnic, bytes32 _contact, bytes32 _father_name, bytes32 _parmanent_add, bytes32 _local_add, bytes32 _province);
    event CandidatesAdded(uint256 count);
    event CandidateRemoved(bytes32 cnic);
    event CandidatesRemoved(uint256 count);
    
    constructor() {
        voters_count = 0;
    }

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx VOTER CONSTITUENCY xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

    function addVoterConstituency(VoterConstituency memory _voter) public {
        require(_voter.cnic != bytes32(0), "Invalid CNIC");
        require(_voter.na != bytes32(0), "Invalid NA");
        require(_voter.pa != bytes32(0), "Invalid PA");
        // uint temp_voters_count = voters_count;
        voters_count++;
        voters_cnics[voters_count] = _voter.cnic;
        voters_indexes[_voter.cnic] = voters_count;
        voters[_voter.cnic] = _voter;

        emit VoterAdded(_voter.cnic, _voter.na, _voter.pa);
    }

    function addVoterConstituencies(VoterConstituency[] memory _voters) public {
        for (uint i = 0; i < _voters.length; i++) {
            addVoterConstituency(_voters[i]);
        }

        emit VotersAdded(_voters.length);
    }

    function removeVoterConstituency(bytes32 _cnic) public {
        require(voters[_cnic].cnic != bytes32(0), "Voter does not exist");

        delete voters[_cnic];

        uint256 remove_index = voters_indexes[_cnic];
        bytes32 remove_cnic = voters_cnics[remove_index];
        bytes32 last_cnic = voters_cnics[voters_count-1];

        voters_cnics[remove_index] = voters_cnics[voters_count-1];
        voters_indexes[last_cnic] = remove_index;

        delete voters_indexes[remove_cnic];
        delete voters_cnics[voters_count-1];

        voters_count--;
        emit VoterRemoved(_cnic);
    }

    function removeVoterConstituencies(bytes32[] memory _cnics) public {
        for (uint i = 0; i < _cnics.length; i++) {
            removeVoterConstituency(_cnics[i]);
        }

        emit VotersRemoved(_cnics.length);
    }

    function getVoterConstituency(bytes32 cnic) public view returns (VoterConstituency memory){
        return voters[cnic];
    }

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx CANDIDATES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

    function addCandidate(Candidate _cand) public{
        // require(_cand.cnic() != bytes32(0), "Invalid CNIC");
        // require(candidates[_cand.cnic()].cnic() == bytes32(0), "Candidate already exists");

        candidates_cnics[candidates_count] = _cand.cnic();
        candidates_indexes[_cand.cnic()] = candidates_count;
        candidates[_cand.cnic()] = _cand;
        
        candidates_count++;

        emit CandidateAdded(_cand.fullname(), _cand.age(), _cand.gender(), _cand.cnic(), _cand.contact(), _cand.father_name(), _cand.permanent_add(), _cand.local_add(), _cand.province());
    }
    function addCandidate(bytes32 _fullname, uint _age, bytes32 _gender, bytes32 _cnic, bytes32 _contact, bytes32 _father_name, bytes32 _parmanent_add, bytes32 _local_add, bytes32 _province) public {
        // Create new Candidate object
        Candidate _cand = new Candidate(_fullname, _age, _gender, _cnic, _contact, _father_name, _parmanent_add, _local_add, _province);

        addCandidate(_cand);
    }

    function addCandidates(bytes32[] memory _fullname, uint[] memory _age, bytes32[] memory _gender, bytes32[] memory _cnic, bytes32[] memory _contact, bytes32[] memory _father_name, bytes32[] memory _parmanent_add, bytes32[] memory _local_add, bytes32[] memory _province) public {
        for (uint i = 0; i < _cnic.length; i++) {
            // Create new Candidate object
            Candidate _cand = new Candidate(_fullname[i], _age[i], _gender[i], _cnic[i], _contact[i], _father_name[i], _parmanent_add[i], _local_add[i], _province[i]);
            
            addCandidate(_cand);
        }

    }

    function removeCandidate(bytes32 _cnic) public {
        // require(candidates[_cnic].cnic() != bytes32(0), "Candidate does not exist");

        delete candidates[_cnic];

        uint256 remove_index = candidates_indexes[_cnic];
        bytes32 remove_cnic = candidates_cnics[remove_index];
        bytes32 last_cnic = candidates_cnics[candidates_count-1];

        candidates_cnics[remove_index] = candidates_cnics[candidates_count-1];
        candidates_indexes[last_cnic] = remove_index;

        delete candidates_indexes[remove_cnic];
        delete candidates_cnics[candidates_count-1];

        candidates_count--;

        emit CandidateRemoved(_cnic);
    }

    function removeCandidates(bytes32[] memory _cnics) public {
        for (uint i = 0; i < _cnics.length; i++) {
            removeCandidate(_cnics[i]);
        }
        emit CandidatesAdded(_cnics.length);
    }



}
