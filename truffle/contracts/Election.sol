// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Constituency.sol";

abstract contract Election{

    // start time
    // end time
    // conducted date
    bytes32 public name;
    
    function containConstituency(bytes8 _constituency_name) public virtual view returns (bool);

    function getName() public view returns(bytes32){
        return name;
    }
    function stringToBytes8(string memory str) public pure returns (bytes8  result) {
        return bytes8(bytes(str));
    }
    function stringToBytes32(string memory str) public pure returns (bytes32  result) {
    
        bytes memory strBytes = bytes(str);
        assembly {
            result := mload(add(strBytes, 32))
        }
        return result;
    }
    
}
