// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Election.sol";
import "./NationalElection.sol";
import "./ProvincialElection.sol";
import "./Constituency.sol";

contract GeneralElection is Election{
    
    NationalElection public nationals;

    uint public provinces_count;
    mapping (bytes8 => ProvincialElection) public provinces;

    constructor( bytes32 _name,
        Constituency[] memory na_constituencies,
        Constituency[] memory pa_pp_constituencies,
        Constituency[] memory pa_ps_constituencies,
        Constituency[] memory pa_pk_constituencies,
        Constituency[] memory pa_pb_constituencies
    ){
        name = _name;
        nationals = new NationalElection(bytes32(bytes("National Assembly")), na_constituencies);

        provinces_count = 4;
        provinces[bytes8(bytes("PP"))] = new ProvincialElection(stringToBytes32("Punjab"), pa_pp_constituencies);
        provinces[bytes8(bytes("PS"))] = new ProvincialElection(stringToBytes32("Sindh"), pa_ps_constituencies);
        provinces[bytes8(bytes("PK"))] = new ProvincialElection(stringToBytes32("Khyber Pakhtunkhwa"), pa_pk_constituencies);
        provinces[bytes8(bytes("PB"))] = new ProvincialElection(stringToBytes32("Balochistan"), pa_pb_constituencies);
    }
    function containConstituency(bytes8 _constituency_name) public override view returns (bool){
        return(nationals.containConstituency(_constituency_name)
            || provinces[bytes8(bytes("PP"))].containConstituency(_constituency_name)
            || provinces[bytes8(bytes("PS"))].containConstituency(_constituency_name)
            || provinces[bytes8(bytes("PK"))].containConstituency(_constituency_name)
            || provinces[bytes8(bytes("PB"))].containConstituency(_constituency_name));
        
    }
}
