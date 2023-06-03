// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// import "./User.sol";
import "./Party.sol";


contract Vote{
    bytes16 public voter_cnic;
    bytes16 public candidate_cnic;
    Party public party;
    
    constructor(bytes16 _voter_cnic, bytes16  _candidate_cnic, Party  _party){
        voter_cnic = _voter_cnic;
        candidate_cnic = _candidate_cnic;
        party = _party;
    }
}