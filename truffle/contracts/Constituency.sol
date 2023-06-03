// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Party.sol";
import "./Vote.sol";

contract Constituency{
    bool public isExist;
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
        isExist = true;
    }

    function getParties() public view returns (Party[] memory){
        return parties;
    }
    function castVote(bytes16 voter_cnic, bytes16 cand_cnic, Party party)public {
        casted_votes[casted_votes_count] = new Vote(voter_cnic, cand_cnic, party);
        casted_votes_count++;
    }
}
