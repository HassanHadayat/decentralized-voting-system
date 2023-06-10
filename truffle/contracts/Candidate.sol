// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./User.sol";

contract Candidate is User {
    bytes32 public father_name;
    bytes32 public permanent_add;
    bytes32 public local_add;
    bytes32 public province;

    bytes8[] public constituencies;
    bytes32 public party;

    constructor(bytes32 _fullname, uint _age, bytes1 _gender, bytes16 _cnic, bytes12 _contact, bytes32 _father_name, bytes32 _parmanent_add, bytes32 _local_add, bytes32 _province)
     User(_fullname, _age, _gender, _cnic, _contact) {
        father_name = _father_name;
        permanent_add = _parmanent_add;
        local_add = _local_add;
        province = _province;
    }

    function addConstituency(bytes8 _constituency_name) public {
        constituencies.push(_constituency_name);
    }
    function removeConstituency(bytes8 _constituency_name) public returns (bool){
        uint index;
        for (uint i = 0; i < constituencies.length; i++) {
            if (constituencies[i] == _constituency_name) {
                index = i;
                break;
            }
        }
        if (index >= constituencies.length) {
            return false;
        }
        constituencies[index] = constituencies[constituencies.length - 1];
        constituencies.pop();
        return true;
    }
    function setParty(bytes32 _party_name) public {
        party = _party_name;
    }
    function removeParty() public{
        delete party;
    }
    function getConstituencies() public view returns(bytes8[] memory){
        bytes8[] memory tempConst = new bytes8[](constituencies.length);
        for (uint256 i = 0; i < constituencies.length; i++) {
            tempConst[i] = constituencies[i];
        }
        return tempConst;
    }
}
