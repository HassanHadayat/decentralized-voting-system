// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Election.sol";
import "./ElectionManager.sol";
import "./Constituency.sol";

contract CreateNAE{
    ElectionManager private em;

    constructor(ElectionManager _em){
        em = _em;
        em.setCreateNAE(this);
    }
    function createNAElection(bytes32 _name, bytes8 _na_name) public returns(NationalElection NAE){
        
        return new NationalElection(
            _name
            , em.getElectionConstituencies(uint256(1), _na_name, 0x4e412d)
        );
    }
    
}