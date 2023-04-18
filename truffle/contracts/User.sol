// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract User {
    bytes32 public fullname;
    uint public age;
    bytes32 public gender;
    bytes32 public cnic;
    bytes32 public contact;

    constructor( bytes32 _fullname, uint _age, bytes32 _gender, bytes32 _cnic, bytes32 _contact) {
        fullname = _fullname;
        age = _age;
        gender = _gender;
        cnic = _cnic;
        contact = _contact;
    }
}
