// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Party.sol";
import "./Vote.sol";

contract Constituency{
    
    bytes8 public name;
     
    uint public total_votes_count;
    uint public casted_votes_count;
    mapping(uint => Vote) public casted_votes;

    Party[] public parties;

    constructor(bytes8 _name, uint _total_votes_count, Party[] memory _parties) {
        name = _name;
        total_votes_count = _total_votes_count;
        casted_votes_count = 0;
        parties = _parties;
    }

    // function getPartiesCount() public view returns (uint){
    //     return parties.length;
    // }
    // function getParties() public view returns (Party[] memory){
    //     return parties;
    // }
}
