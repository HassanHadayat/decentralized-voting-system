// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Election.sol";
import "./ElectionManager.sol";
import "./Constituency.sol";

contract CreateGE{
    ElectionManager private em;

    uint constant private NA_CONSTITUENCIES_SIZE = 4; // 272;
    uint constant private PA_PP_CONSTITUENCIES_SIZE = 2; // 297;
    uint constant private PA_PS_CONSTITUENCIES_SIZE = 2; // 130;
    uint constant private PA_PK_CONSTITUENCIES_SIZE = 2; // 115;
    uint constant private PA_PB_CONSTITUENCIES_SIZE = 2; // 51;
    constructor(ElectionManager _em){
        em = _em;
        em.setCreateGE(this);
    }
    function createGeneralElection(bytes32 _name) public returns(GeneralElection GE) {
        bytes8 null_const_name;
        return new GeneralElection(
            _name, 
            em.getElectionConstituencies(NA_CONSTITUENCIES_SIZE, null_const_name, 0x4e412d),
            em.getElectionConstituencies(PA_PP_CONSTITUENCIES_SIZE, null_const_name, 0x50502d),
            em.getElectionConstituencies(PA_PS_CONSTITUENCIES_SIZE, null_const_name, 0x50532d),
            em.getElectionConstituencies(PA_PK_CONSTITUENCIES_SIZE, null_const_name, 0x504b2d),
            em.getElectionConstituencies(PA_PB_CONSTITUENCIES_SIZE, null_const_name, 0x50422d)
        );
    }
}