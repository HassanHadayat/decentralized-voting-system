
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ConstituenciesData{
    bytes8[] public NA_BYTES = [bytes8(0x4e412d3100000000),bytes8(0x4e412d3200000000),bytes8(0x4e412d3300000000),bytes8(0x4e412d3400000000)];
    bytes8[] public PA_PP_BYTES = [bytes8(0x50502d3100000000),bytes8(0x50502d3200000000)];
    bytes8[] public PA_PS_BYTES = [bytes8(0x50532d3100000000),bytes8(0x50532d3200000000)];
    bytes8[] public PA_PK_BYTES = [bytes8(0x504b2d3100000000),bytes8(0x504b2d3200000000)];
    bytes8[] public PA_PB_BYTES = [bytes8(0x50422d3100000000),bytes8(0x50422d3200000000)];

    
    function getNABytes(uint _index) public view returns(bytes8){
        return NA_BYTES[_index];
    }
    
    function getPABytes(bytes3 _pa_name, uint _index) public view returns(bytes8){
        if(_pa_name == 0x50502d)
            return PA_PP_BYTES[_index];
        else if(_pa_name == 0x50532d)
            return PA_PS_BYTES[_index];
        else if(_pa_name == 0x504b2d)
            return PA_PK_BYTES[_index];
        else if(_pa_name == 0x50422d)
            return PA_PB_BYTES[_index];
        else
            return bytes8(0);
    }
}