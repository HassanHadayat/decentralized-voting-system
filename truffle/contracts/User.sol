// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract User {
    bytes32 public fullname;
    uint public age;
    bytes1 public gender;
    bytes16 public cnic;
    bytes12 public contact;

    constructor( bytes32 _fullname, uint _age, bytes1 _gender, bytes16 _cnic, bytes12 _contact) {
        fullname = _fullname;
        age = _age;
        gender = _gender;
        cnic = _cnic;
        contact = _contact;
    }
}
