// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./ECP.sol";
import "./VotersData.sol";
import "./Voter.sol";

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

    uint public reg_voters_count;
    mapping(bytes32 => Voter) public reg_voters;
    mapping(bytes16 => bool) public reg_voters_auth;
    bytes16 public admin_cnic;

    mapping(bytes8 => bytes16[]) public na_voters;
    mapping(bytes8 => bytes16[]) public pa_voters;

    constructor(address _ecpAdd, address _voters_data){
        // require(ecpAdd == address(0), "ECP already set!");
        // ecpAdd = address(ecp);
        ecp = ECP(_ecpAdd);
        voters_data = VotersData(_voters_data);
        ecp.setVoterManager(this);
        
        admin_cnic =  0x30303030302d303030303030302d3000;
        // ADMIN 
        VoterConstituency memory adminVoter = VoterConstituency(
            admin_cnic,
            0x4e412d3100000000,
            0x50502d3100000000
        );
        addVoterConstituency(adminVoter);
        registerVoter(
            0x41646d696e000000000000000000000000000000000000000000000000000000,
            uint256(50), 
            0x4d, 
            admin_cnic, 
            0x303333332d30303030303030, 
            0x30303030300000000000000000000000
        );
        
        addVoterConstituencies(voters_data.getCnics(), voters_data.getNAList(), voters_data.getPAList());
    }

    function isAdmin(bytes16 _cnic) public view returns(bool){
        return _cnic == admin_cnic;
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

        removeRegVoter(_cnic);
    }
    function removeVoterConstituencies(bytes16[] memory _cnics) public {
        for (uint i = 0; i < _cnics.length; i++) {
            removeVoterConstituency(_cnics[i]);
        }
    }
    function getVoterConstituency(bytes16 _cnic) public view returns (VoterConstituency memory){
        return voters[_cnic];
    }
    function getVoterConstituency(uint256 _index) public view returns (VoterConstituency memory){
        return voters[voters_cnics[_index]];
    }
    function getNAVoterLength(bytes8 _na_name) public view returns (uint){
        return na_voters[_na_name].length;
    }
    function getPAVoterLength(bytes8 _pa_name) public view returns (uint){
        return pa_voters[_pa_name].length;
    }

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx REGISTERED VOTER xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
    function removeRegVoter(bytes16 _cnic) public{
        reg_voters_auth[_cnic] = false;
    }
    function canRegister(bytes16 _cnic ) public view returns(bool){
        return (voters[_cnic].cnic != 0x00000000000000000000000000000000 && reg_voters_auth[_cnic] != true);
    } 
    function registerVoter(bytes32 _fullname, uint _age, bytes1 _gender, bytes16 _cnic, bytes12 _contact, bytes16 _password) public returns(bool){
        require(voters[_cnic].cnic != 0x00000000000000000000000000000000, "Voter not in the Voting List");
        
        bytes32 hashedId = keccak256(abi.encodePacked(_cnic, _password));
        reg_voters[hashedId] = new Voter(_fullname, _age, _gender, _cnic, _contact, voters[_cnic].na, voters[_cnic].pa);
        reg_voters_auth[_cnic] = true;
        
        return (reg_voters[hashedId].cnic() == _cnic);
    }
    function getRegVoter(bytes16 _cnic, bytes16 _password) public view returns (Voter voter){
        // additional check that voter in the voters constituency list
        bytes16 voter_cnic = voters[_cnic].cnic;
        return reg_voters[keccak256(abi.encodePacked(voter_cnic, _password))];
    }
    function signinVoter(bytes16 _cnic, bytes16 _password) public view returns(Voter voter){
        // additional check that voter in the voters constituency list
        bytes16 voter_cnic = voters[_cnic].cnic;
        return reg_voters[keccak256(abi.encodePacked(voter_cnic, _password))];
    }
    function changePassword(bytes16 _cnic, bytes16 _prev_password, bytes16 _new_password) public returns(bool){
        require(address(reg_voters[keccak256(abi.encodePacked(_cnic, _prev_password))]) != address(0), "Invalid Previous Password!");
        reg_voters[keccak256(abi.encodePacked(_cnic, _new_password))] = reg_voters[keccak256(abi.encodePacked(_cnic, _prev_password))];
        delete reg_voters[keccak256(abi.encodePacked(_cnic, _prev_password))];
        return (address(reg_voters[keccak256(abi.encodePacked(_cnic, _prev_password))]) == address(0)
                && address(reg_voters[keccak256(abi.encodePacked(_cnic, _new_password))]) != address(0));
    }
}
