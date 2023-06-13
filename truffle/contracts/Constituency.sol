// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Party.sol";
import "./Vote.sol";

contract Constituency{
    bool public isExist;
    bytes8 public name;
     
    uint256 public total_votes_count;
    uint256 public casted_votes_count;
    mapping(bytes16 => Vote) public casted_votes;

    Party[] public parties;
    mapping(Party => uint256) public parties_votes_count;


    constructor(bytes8 _name, uint _total_votes_count, Party[] memory _parties) {
        name = _name;
        total_votes_count = _total_votes_count;
        casted_votes_count = 0;
        parties = _parties;
        isExist = true;
    }
    function isVoteCasted(bytes16 voter_cnic) public view returns(bool){
        if(address(casted_votes[voter_cnic]) == address(0)){
            return false;
        }
        else{
            return true;
        }
    }
    function isWinner(Party party) public view returns(bool){
        uint256 party_votes = parties_votes_count[party];
        for (uint256 i = 0; i < parties.length; i++) {
            if(parties_votes_count[parties[i]] > party_votes){
                return false;
            }
        }
        return true;
    }
    function getParties() public view returns (Party[] memory){
        return parties;
    }
    function getPartiesNames() public view returns (bytes32[] memory){
        bytes32[] memory tempNames = new bytes32[](parties.length);
        for (uint256 i = 0; i < parties.length; i++) {
            tempNames[i] = parties[i].name();
        }
        return tempNames;
    }
    function castVote(bytes16 voter_cnic, bytes16 cand_cnic, Party party)public {
        if(address(casted_votes[voter_cnic]) == address(0)){
            parties_votes_count[party] = parties_votes_count[party] + 1;
        }
        casted_votes[voter_cnic] = new Vote(voter_cnic, cand_cnic, party);
        casted_votes_count++;
    }
}
