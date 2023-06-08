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
    function createGeneralElection(uint256 _startTime, uint256 _endTime, bytes32 _name) public returns(GeneralElection GE) {
        bytes8 null_const_name;

        NationalElection nationals = new NationalElection(_startTime, _endTime, bytes32(bytes("National Assembly")), em.getElectionConstituencies(NA_CONSTITUENCIES_SIZE, null_const_name, 0x4e412d));

        ProvincialElection PP = new ProvincialElection(_startTime, _endTime, bytes32(bytes("Punjab")), em.getElectionConstituencies(PA_PP_CONSTITUENCIES_SIZE, null_const_name, 0x50502d));
        ProvincialElection PS = new ProvincialElection(_startTime, _endTime, bytes32(bytes("Sindh")), em.getElectionConstituencies(PA_PS_CONSTITUENCIES_SIZE, null_const_name, 0x50532d));
        ProvincialElection PK = new ProvincialElection(_startTime, _endTime, bytes32(bytes("Khyber Pakhtunkhwa")), em.getElectionConstituencies(PA_PK_CONSTITUENCIES_SIZE, null_const_name, 0x504b2d));
        ProvincialElection PB = new ProvincialElection(_startTime, _endTime, bytes32(bytes("Balochistan")), em.getElectionConstituencies(PA_PB_CONSTITUENCIES_SIZE, null_const_name, 0x50422d));
    
        return new GeneralElection(
            _startTime,
            _endTime,
            _name,
            nationals,
            PP,
            PS,
            PK,
            PB
        );
    }
}