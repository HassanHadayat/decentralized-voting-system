// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./User.sol";

contract Voter is User {

    bytes8 public na_constituency; // National Assembly
    bytes8 public pa_constituency; // Provincial Assembly

    constructor(bytes32 _fullname, uint _age, bytes1 _gender, bytes16 _cnic, bytes12 _contact,bytes8 _na_constituency, bytes8 _pa_constituency) 
     User(_fullname, _age, _gender, _cnic, _contact) {
        na_constituency = _na_constituency;
        pa_constituency = _pa_constituency;
    }
}
