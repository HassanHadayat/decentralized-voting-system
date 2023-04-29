// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Election{

    // start time
    // end time
    // conducted date
    string public name;
    uint public total_votes_count;
    uint public casted_votes_count;
    // mapping(uint => Vote) casted_votes;


}

contract GeneralElection is Election{

}

contract NationalElection is Election{

}
contract ProvincialElection is Election{
    
}