// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Election.sol";
import "./ElectionManager.sol";
import "./Constituency.sol";

contract CreatePE{
    ElectionManager private em;
    
    uint constant private PA_PP_CONSTITUENCIES_SIZE = 2; // 297;
    uint constant private PA_PS_CONSTITUENCIES_SIZE = 2; // 130;
    uint constant private PA_PK_CONSTITUENCIES_SIZE = 2; // 115;
    uint constant private PA_PB_CONSTITUENCIES_SIZE = 2; // 51;

    constructor(ElectionManager _em){
        em = _em;
        em.setCreatePE(this);
    }
    
    function createProvincialElection(bytes32 _name, bytes3 _pre_name) public returns(ProvincialElection PE)  {
        bytes8 null_const_name;
        uint256 const_size;
        if(_pre_name == 0x50502d)
            const_size = PA_PP_CONSTITUENCIES_SIZE;
        else if(_pre_name == 0x50532d)
            const_size = PA_PS_CONSTITUENCIES_SIZE;
        else if(_pre_name == 0x504b2d)
            const_size = PA_PK_CONSTITUENCIES_SIZE;
        else if(_pre_name == 0x50422d)
            const_size = PA_PB_CONSTITUENCIES_SIZE;
        
       return new ProvincialElection(_name, em.getElectionConstituencies(const_size, null_const_name, _pre_name));
    }
    
}