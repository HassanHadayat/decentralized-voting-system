// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Constituency.sol";

contract Election{

    // start time
    // end time
    // conducted date
    bytes32 public name;
    function getName() public view returns(bytes32){
        return name;
    }
    function stringToBytes8(string memory str) public pure returns (bytes8  result) {
    
        bytes memory strBytes = bytes(str);
        assembly {
            result := mload(add(strBytes, 8))
        }
        return result;
    }
    function stringToBytes16(string memory str) public pure returns (bytes16  result) {
    
        bytes memory strBytes = bytes(str);
        assembly {
            result := mload(add(strBytes, 16))
        }
        return result;
    }
    
}

contract GeneralElection is Election{
    
    NationalElection public nationals;

    uint public provinces_count;
    mapping (bytes8 => ProvincialElection) public provinces;

    // constructor(bytes32 _name, Constituency[] memory _constituencies){
    //     name = _name;
    //     for (uint256 i = 0; i < _constituencies.length; i++) {
    //         constituencies[_constituencies[i].name()] = _constituencies[i];
    //     }
    // }

    constructor( bytes32 _name,
        Constituency[] memory na_constituencies,
        Constituency[] memory pa_pp_constituencies,
        Constituency[] memory pa_ps_constituencies,
        Constituency[] memory pa_pk_constituencies,
        Constituency[] memory pa_pb_constituencies
    ){
        name = _name;
        nationals = new NationalElection("Pakistan National Assembly", na_constituencies);

        provinces_count = 4;
        provinces[stringToBytes8("PP")] = new ProvincialElection(stringToBytes16("Punjab"), pa_pp_constituencies);
        provinces[stringToBytes8("PS")] = new ProvincialElection(stringToBytes16("Sindh"), pa_ps_constituencies);
        provinces[stringToBytes8("PK")] = new ProvincialElection(stringToBytes16("Khyber Pakhtunkhwa"), pa_pk_constituencies);
        provinces[stringToBytes8("PB")] = new ProvincialElection(stringToBytes16("Balochistan"), pa_pb_constituencies);
    }

}

contract NationalElection is Election{
    mapping(bytes8 => Constituency) public constituencies;

    constructor(bytes32 _name, Constituency[] memory _constituencies){
        name = _name;
        for (uint256 i = 0; i < _constituencies.length; i++) {
            constituencies[_constituencies[i].name()] = _constituencies[i];
        }
    }
}
contract ProvincialElection is Election{
    mapping(bytes8 => Constituency) public constituencies;

    constructor(bytes32 _name, Constituency[] memory _constituencies){
        name = _name;
        for (uint256 i = 0; i < _constituencies.length; i++) {
            constituencies[_constituencies[i].name()] = _constituencies[i];
        }
    }
}