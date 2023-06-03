// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Election.sol";
import "./ElectionManager.sol";
import "./Constituency.sol";

contract CreatePAE{
    ElectionManager private em;

    constructor(ElectionManager _em){
        em = _em;
        em.setCreatePAE(this);
    }
    function createPAElection(bytes32 _name, bytes8 _pa_name) public returns(ProvincialElection PAE){
        
        return new ProvincialElection(
            _name
            , em.getElectionConstituencies(uint256(1), _pa_name, 0x50412d)
        );
    }

}