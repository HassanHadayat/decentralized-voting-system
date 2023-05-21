// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Election.sol";
import "./Constituency.sol";


contract NationalElection is Election{
    uint public constituencies_count;
    mapping(uint256 => bytes8) public constituencies_indexes;
    mapping(bytes8 => Constituency) public constituencies;

    constructor(bytes32 _name, Constituency[] memory _constituencies){
        name = _name;
        for (uint256 i = 0; i < _constituencies.length; i++) {
            constituencies[_constituencies[i].name()] = _constituencies[i];
            constituencies_indexes[constituencies_count] = _constituencies[i].name();
            constituencies_count++;
        }
    }

    function containConstituency(bytes8 _constituency_name) public override view returns (bool){
        return constituencies[_constituency_name].isExist();
    }
}