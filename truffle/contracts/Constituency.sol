// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Party.sol";
// import "./User.sol";

contract Constituency{
    string public name;
    uint public id;
    Party[] public parties;

    constructor(string memory _name, uint _id, Party[] memory _parties) {
        name = _name;
        id = _id;
        parties = _parties;
    }

    function getPartiesCount() public view returns (uint){
        return parties.length;
    }
    function getParties() public view returns (Party[] memory){
        return parties;
    }
}