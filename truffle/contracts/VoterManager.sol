// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./ECP.sol";
import "./VotersData.sol";
contract VoterManager {
    ECP public ecp;
    VotersData public voters_data;

    // address private ecpAdd;
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

    constructor(address _ecpAdd, address _voters_data){
        // require(ecpAdd == address(0), "ECP already set!");
        // ecpAdd = address(ecp);
        ecp = ECP(_ecpAdd);
        voters_data = VotersData(_voters_data);
        ecp.setVoterManager(this);
        addVoterConstituencies(voters_data.getCnics(), voters_data.getNAList(), voters_data.getPAList());
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
    }
    
    function addVoterConstituencies(bytes16[] memory _cnics, bytes8[] memory _na_list, bytes8[] memory _pa_list) public {
        for (uint i = 0; i < _cnics.length; i++) {
            VoterConstituency memory newVoter = VoterConstituency(_cnics[i], _na_list[i], _pa_list[i]);
            addVoterConstituency(newVoter);
        }
    }
     function addNaVoter(bytes8 _na_name, bytes16 _cnic) public{
        na_voters[_na_name].push(_cnic);
    }
    
    function addPaVoter(bytes8 _pa_name, bytes16 _cnic) public{
        pa_voters[_pa_name].push(_cnic);
    }

    function removeVoterConstituency(bytes16 _cnic) public {
        delete voters[_cnic];

        uint256 remove_index = voters_indexes[_cnic];
        bytes16 remove_cnic = voters_cnics[remove_index];
        bytes16 last_cnic = voters_cnics[voters_count-1];

        voters_cnics[remove_index] = voters_cnics[voters_count-1];
        voters_indexes[last_cnic] = remove_index;

        delete voters_indexes[remove_cnic];
        delete voters_cnics[voters_count-1];

        voters_count--;
    }

    function removeVoterConstituencies(bytes16[] memory _cnics) public {
        for (uint i = 0; i < _cnics.length; i++) {
            removeVoterConstituency(_cnics[i]);
        }
    }

    function getVoterConstituency(bytes16 _cnic) public view returns (VoterConstituency memory){
        return voters[_cnic];
    }
    function getNAVoterLength(bytes8 _na_name) public view returns (uint){
        return na_voters[_na_name].length;
    }
    
    function getPAVoterLength(bytes8 _pa_name) public view returns (uint){
        return pa_voters[_pa_name].length;
    }
}
