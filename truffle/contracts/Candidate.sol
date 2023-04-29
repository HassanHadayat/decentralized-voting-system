// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./User.sol";

contract Candidate is User {
    bytes32 public father_name;
    bytes32 public permanent_add;
    bytes32 public local_add;
    bytes32 public province;

    // bytes32[] public constituencies;
    // bytes32 public party;

    constructor(bytes32 _fullname, uint _age, bytes32 _gender, bytes32 _cnic, bytes32 _contact, bytes32 _father_name, bytes32 _parmanent_add, bytes32 _local_add, bytes32 _province)
     User(_fullname, _age, _gender, _cnic, _contact) {
        father_name = _father_name;
        permanent_add = _parmanent_add;
        local_add = _local_add;
        province = _province;
    }

    // function addConstituency(bytes32 constituency) public {
    //     constituencies.push(constituency);
    // }

    // function setParty(bytes32 _party) public {
    //     party = _party;
    // }
}
