// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Constituency.sol";
// import "hardhat/console.sol";

abstract contract Election{

    // start time
    // end time
    // conducted date
    bytes32 public election_type;
    bytes32 public name;
    
    function containConstituency(bytes8 _constituency_name) public virtual view returns (bool);
    function getConstituency(bytes8 _constituency_name) public virtual view returns(address);
}

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
        election_type = 0x47656e6572616c20456c656374696f6e00000000000000000000000000000000; //General Election
        name = _name;
        nationals = new NationalElection(bytes32(bytes("National Assembly")), na_constituencies);

        provinces_count = 4;
        provinces[bytes8(bytes("PP"))] = new ProvincialElection(bytes32(bytes("Punjab")), pa_pp_constituencies);
        provinces[bytes8(bytes("PS"))] = new ProvincialElection(bytes32(bytes("Sindh")), pa_ps_constituencies);
        provinces[bytes8(bytes("PK"))] = new ProvincialElection(bytes32(bytes("Khyber Pakhtunkhwa")), pa_pk_constituencies);
        provinces[bytes8(bytes("PB"))] = new ProvincialElection(bytes32(bytes("Balochistan")), pa_pb_constituencies);
    }
    function containConstituency(bytes8 _constituency_name) public override view returns (bool){
        return(nationals.containConstituency(_constituency_name)
            || provinces[bytes8(bytes("PP"))].containConstituency(_constituency_name)
            || provinces[bytes8(bytes("PS"))].containConstituency(_constituency_name)
            || provinces[bytes8(bytes("PK"))].containConstituency(_constituency_name)
            || provinces[bytes8(bytes("PB"))].containConstituency(_constituency_name));
    }
    function getConstituency(bytes8 _constituency_name) public override view returns (address){
        if(nationals.getConstituency(_constituency_name) != address(0)){
            return nationals.getConstituency(_constituency_name);
        }
        else if(provinces[bytes8(bytes("PP"))].getConstituency(_constituency_name) != address(0)){
            return provinces[bytes8(bytes("PP"))].getConstituency(_constituency_name);
        }
        else if(provinces[bytes8(bytes("PS"))].getConstituency(_constituency_name) != address(0)){
            return provinces[bytes8(bytes("PS"))].getConstituency(_constituency_name);
        }
        else if(provinces[bytes8(bytes("PK"))].getConstituency(_constituency_name) != address(0)){
            return provinces[bytes8(bytes("PK"))].getConstituency(_constituency_name);
        }
        else if(provinces[bytes8(bytes("PB"))].getConstituency(_constituency_name) != address(0)){
            return provinces[bytes8(bytes("PB"))].getConstituency(_constituency_name);
        }
        return address(0);
    }
}



contract NationalElection is Election{
    uint public constituencies_count;
    mapping(uint256 => bytes8) public constituencies_indexes;
    mapping(bytes8 => Constituency) public constituencies;

    constructor(bytes32 _name, Constituency[] memory _constituencies){

        if(_constituencies.length == 1){ 
            election_type = 0x4e6174696f6e616c20436f6e7374697475656e637920456c656374696f6e0000;//National Constituency Election
        }
        else{
            election_type = 0x4e6174696f6e616c20456c656374696f6e000000000000000000000000000000;//National Election
        }
        name = _name;
        for (uint256 i = 0; i < _constituencies.length; i++) {
            constituencies[_constituencies[i].name()] = _constituencies[i];
            constituencies_indexes[constituencies_count] = _constituencies[i].name();
            constituencies_count++;
        }
    }

    function containConstituency(bytes8 _constituency_name) public override view returns (bool){
        return (address(constituencies[_constituency_name]) == address(0)) ? false : true;
    }
    
    function getConstituency(bytes8 _constituency_name) public override view returns (address){
        return address(constituencies[_constituency_name]);
    }
}


contract ProvincialElection is Election{
    uint public constituencies_count;
    mapping(uint256 => bytes8) public constituencies_indexes;
    mapping(bytes8 => Constituency) public constituencies;

    constructor(bytes32 _name, Constituency[] memory _constituencies){

        if(_constituencies.length == 1){ 
            election_type = 0x50726f76696e6369616c20436f6e7374697475656e637920456c656374696f6e;//Provincial Constituency Election
        }
        else{
            election_type = 0x50726f76696e6369616c20456c656374696f6e00000000000000000000000000;//Provincial Election
        }
        name = _name;
        for (uint256 i = 0; i < _constituencies.length; i++) {
            // console.log("PA const=> ", address(_constituencies[i]));
            constituencies[_constituencies[i].name()] = _constituencies[i];
            constituencies_indexes[constituencies_count] = _constituencies[i].name();
            constituencies_count++;
        }
    }
    
    function containConstituency(bytes8 _constituency_name) public override view returns (bool){
        return (address(constituencies[_constituency_name]) == address(0)) ? false : true;
    }
    
    function getConstituency(bytes8 _constituency_name) public override view returns (address){
        return address(constituencies[_constituency_name]);
    }
}