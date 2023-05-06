// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// import "./console.sol";

import "./Candidate.sol";
import "./Party.sol";
import "./Election.sol";

contract ECP {
    
    uint constant public NA_CONSTITUENCIES_SIZE = 4; // 272;
    uint constant public PA_PP_CONSTITUENCIES_SIZE = 2; // 297;
    uint constant public PA_PS_CONSTITUENCIES_SIZE = 2; // 130;
    uint constant public PA_PK_CONSTITUENCIES_SIZE = 2; // 115;
    uint constant public PA_PB_CONSTITUENCIES_SIZE = 2; // 51;


    struct VoterConstituency {
        bytes16 cnic;
        bytes8 na;
        bytes8 pa;
    }

    uint256 public voters_count;
    mapping(uint256 => bytes16) public voters_cnics;
    mapping(bytes16 => uint256) public voters_indexes;
    mapping(bytes16 => VoterConstituency) public voters;


    mapping(bytes8 => bytes16[]) public na_voters;
    mapping(bytes8 => bytes16[]) public pa_voters;

    uint256 public candidates_count;
    mapping(uint256 => bytes16) public candidates_cnics;
    mapping(bytes16 => uint256) public candidates_indexes;
    mapping(bytes16 => Candidate) public candidates;

    uint256 public parties_count;
    mapping(uint256 => Party) public parties;

    uint256 public elections_count;
    mapping(uint256 => Election) public elections;

    constructor() {
        voters_count = 0;
    }
    

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ELECTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

    function createGeneralElection(bytes32 _name) public {
        // NA 
        Constituency[] memory na_constituencies = new Constituency[](NA_CONSTITUENCIES_SIZE);

        for (uint256 i = 0; i < NA_CONSTITUENCIES_SIZE; i++) {
        
            bytes8 na_name = concatBytes3(0x4e412d , bytes3(uint256ToBytes3(i)));
            
            uint256 total_votes_count = na_voters[na_name].length;
            uint size = 0;
            for (uint256 j = 0; j < parties_count; j++) {
                if(parties[j].isAnyCandidateNominated(na_name) == true){
                    size++;
                }
            }
            Party[] memory constituency_parties = new Party[](size);
            for (uint256 j = 0; j < parties_count; j++) {
                if(parties[j].isAnyCandidateNominated(na_name)){
                    constituency_parties[j] = parties[j];
                }
            }
            na_constituencies[i] = new Constituency(na_name, total_votes_count, constituency_parties);
        }

        elections[elections_count] = new GeneralElection(
            _name, 
            na_constituencies,
            getProvincialConstituencies(0x50502d,PA_PP_CONSTITUENCIES_SIZE),
            getProvincialConstituencies(0x50532d,PA_PS_CONSTITUENCIES_SIZE),
            getProvincialConstituencies(0x504b2d,PA_PK_CONSTITUENCIES_SIZE),
            getProvincialConstituencies(0x50422d,PA_PB_CONSTITUENCIES_SIZE)
        );
        elections_count++;
    }

    function createProvincialElection(bytes32 _name, bytes3 _pa_name) public {
        if(_pa_name == 0x50502d)
            elections[elections_count] = new ProvincialElection(_name, getProvincialConstituencies(_pa_name, PA_PP_CONSTITUENCIES_SIZE));
        else if(_pa_name == 0x50532d)
            elections[elections_count] = new ProvincialElection(_name, getProvincialConstituencies(_pa_name, PA_PS_CONSTITUENCIES_SIZE));
        else if(_pa_name == 0x504b2d)
            elections[elections_count] = new ProvincialElection(_name, getProvincialConstituencies(_pa_name, PA_PK_CONSTITUENCIES_SIZE));
        else if(_pa_name == 0x50422d)
            elections[elections_count] = new ProvincialElection(_name, getProvincialConstituencies(_pa_name, PA_PB_CONSTITUENCIES_SIZE));
        elections_count++;
    }

    function getProvincialConstituencies(bytes3 pre_name, uint pa_size) public returns(Constituency[] memory) {
        Constituency[] memory pa_constituencies = new Constituency[](pa_size);

        for (uint256 i = 0; i < pa_size; i++) {
            bytes8 pa_name = concatBytes3(pre_name, uint256ToBytes3(i));
            uint256 total_votes_count = pa_voters[pa_name].length;
            Party[] memory constituency_parties;
            uint k = 0;
            for (uint256 j = 0; j < parties_count; j++) {
                if(parties[j].isAnyCandidateNominated(pa_name)){
                    constituency_parties[k] = parties[j];
                    k++;
                }
            }
            pa_constituencies[i] = new Constituency(pa_name, total_votes_count, constituency_parties);
        }
        return pa_constituencies;
    }
    
    // function getProvincialConstituencies(bytes3 pre_name, uint pa_size) public returns(Constituency[] memory) {
    //     Constituency[] memory pa_constituencies = new Constituency[](pa_size);

    //     for (uint256 i = 0; i < pa_size; i++) {
    //         bytes8 pa_name = concatBytes3(pre_name, uint256ToBytes3(i));
    //         uint256 total_votes_count = pa_voters[pa_name].length;
    //         uint size = 0;
    //         for (uint256 j = 0; j < parties_count; j++) {
    //             if(parties[j].isAnyCandidateNominated(pa_name)){
    //                 size++;
    //             }
    //         }
    //         Party[] memory constituency_parties = new Party[](size);
    //         for (uint256 j = 0; j < parties_count; j++) {
    //             if(parties[j].isAnyCandidateNominated(pa_name)){
    //                 constituency_parties[j] = parties[j];
    //             }
    //         }
    //         pa_constituencies[i] = new Constituency(pa_name, total_votes_count, constituency_parties);
    //     }
    //     return pa_constituencies;
    // }
    
    function addNaVoter(bytes8 _na_name, bytes16 _cnic) public{
        na_voters[_na_name].push(_cnic);
    }
    
    function addPaVoter(bytes8 _pa_name, bytes16 _cnic) public{
        pa_voters[_pa_name].push(_cnic);
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx VOTER CONSTITUENCY xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
    
    function addVoterConstituency(VoterConstituency memory _voter) public {
        voters_cnics[voters_count] = _voter.cnic;
        voters_indexes[_voter.cnic] = voters_count;
        voters[_voter.cnic] = _voter;
        voters_count++;

        addNaVoter(_voter.na, _voter.cnic);
        addPaVoter(_voter.pa, _voter.cnic);
    }

    function addVoterConstituencies(VoterConstituency[] memory _voters) public {
        for (uint i = 0; i < _voters.length; i++) {
            addVoterConstituency(_voters[i]);
        }

        // emit VotersAdded(_voters.length);
    }

    function removeVoterConstituency(bytes16 _cnic) public {
        // require(voters[_cnic].cnic != bytes32(0), "Voter does not exist");
        delete voters[_cnic];

        uint256 remove_index = voters_indexes[_cnic];
        bytes16 remove_cnic = voters_cnics[remove_index];
        bytes16 last_cnic = voters_cnics[voters_count-1];

        voters_cnics[remove_index] = voters_cnics[voters_count-1];
        voters_indexes[last_cnic] = remove_index;

        delete voters_indexes[remove_cnic];
        delete voters_cnics[voters_count-1];

        voters_count--;
        
        // emit VoterRemoved(_cnic);
    }

    function removeVoterConstituencies(bytes16[] memory _cnics) public {
        for (uint i = 0; i < _cnics.length; i++) {
            removeVoterConstituency(_cnics[i]);
        }

        // emit VotersRemoved(_cnics.length);
    }

    function getVoterConstituency(bytes16 _cnic) public view returns (VoterConstituency memory){
        return voters[_cnic];
    }

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx CANDIDATES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
    
    function addCandidate(bytes32 _fullname, uint _age, bytes1 _gender, bytes16 _cnic, bytes12 _contact, bytes32 _father_name, bytes32 _parmanent_add, bytes32 _local_add, bytes32 _province) public {
        candidates_cnics[candidates_count] = _cnic;
        candidates_indexes[_cnic] = candidates_count;
        // Create new Candidate object
        candidates[_cnic] = new Candidate(_fullname, _age, _gender, _cnic, _contact, _father_name, _parmanent_add, _local_add, _province);
        
        candidates_count++;
    }

    function addCandidates(bytes32[] memory _fullname, uint[] memory _age, bytes1[] memory _gender, bytes16[] memory _cnic, bytes12[] memory _contact, bytes32[] memory _father_name, bytes32[] memory _parmanent_add, bytes32[] memory _local_add, bytes32[] memory _province) public {
        for (uint i = 0; i < _cnic.length; i++) {
            // add Candidate
            addCandidate(_fullname[i], _age[i], _gender[i], _cnic[i], _contact[i], _father_name[i], _parmanent_add[i], _local_add[i], _province[i]);
        }

    }

    function removeCandidate(bytes16 _cnic) public {
        // require(candidates[_cnic].cnic() != bytes32(0), "Candidate does not exist");

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
        // emit CandidatesAdded(_cnics.length);
    }

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx PARTIES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

    function addParty(bytes32 _party_name, bytes16 _chairman_cnic, bytes32 _postal_add, bytes8 __alias
    , bytes16[] memory _party_candidates_cnics, bytes8[] memory _party_candidates_constituencies) public {
        
        Party _newParty = new Party(parties_count, _party_name, candidates[_chairman_cnic], _postal_add, __alias);
        for (uint256 i = 0; i < _party_candidates_cnics.length; i++) {
            _newParty.addCandidate(candidates[_party_candidates_cnics[i]]);
            _newParty.addConstituencyCandidate(_party_candidates_cnics[i], _party_candidates_constituencies[i]);
        }
        parties[parties_count] = _newParty;
        
        parties_count++;
    }

    function removeParty(bytes32 _party_name) public {
        for (uint256 i = 0; i < parties_count; i++) {
            if(_party_name == parties[i].name())
            {
                delete parties[i];
                parties_count--;
                return;
            }
        }
    }

    function getPartiesNames() public view returns (bytes32[] memory){
        bytes32[] memory party_names = new bytes32[](parties_count);
        for (uint256 i = 0; i < parties_count; i++) {
            party_names[i] = parties[i].name();
        }
        return party_names;
    }

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx PARTIES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

    function concatBytes3(bytes3 a, bytes3 b) public pure returns (bytes8) {
        bytes memory temp = abi.encodePacked(a, b);
        bytes8 result;
        assembly {
            result := mload(add(temp, 8))
        }
        return result;
    }

    function uint256ToBytes3(uint256 value) public pure returns (bytes3) {
        bytes memory temp = abi.encodePacked(value);
        bytes3 result;
        assembly {
            result := mload(add(temp, 0x1))
        }
        return result;
    }
}
