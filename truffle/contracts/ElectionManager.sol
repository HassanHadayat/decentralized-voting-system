// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./ECP.sol";
import "./Election.sol";
import "./Constituency.sol";
import "./Party.sol";
import "./ConstituenciesData.sol";

import "./CreateGE.sol";
import "./CreatePE.sol";
import "./CreateNAE.sol";
import "./CreatePAE.sol";


contract ElectionManager {
    ECP private ecp;
    ConstituenciesData private cons_data;
    CreateGE private create_ge;
    CreatePE private create_pe;
    CreateNAE private create_nae;
    CreatePAE private create_pae;

    uint256 public elections_count;
    mapping(uint256 => Election) public elections;
    uint256 public results_count;
    mapping(uint256 => Election) public results;

    constructor(address _ecpAdd, address _cons_data){
        ecp = ECP(_ecpAdd);
        cons_data = ConstituenciesData(_cons_data);
        ecp.setElectionManager(this);
    }
    function setCreateGE(CreateGE _create_ge) public{
        create_ge = _create_ge;
    }
    function setCreatePE(CreatePE _create_pe) public{
        create_pe = _create_pe;
    }
    function setCreateNAE(CreateNAE _create_nae) public{
        create_nae = _create_nae;
    }
    function setCreatePAE(CreatePAE _create_pae) public{
        create_pae = _create_pae;
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ELECTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

    function getElectionConstituencies(uint256 const_size, bytes8 const_name, bytes3 pre_name) public returns(Constituency[] memory){
        Constituency[] memory constituencies = new Constituency[](const_size);

        for (uint256 i = 0; i < const_size; i++) {
            bytes8 const_full_name;
            uint256 total_votes_count;
            if(const_size == uint256(1)){
                const_full_name = const_name;
                if(pre_name == 0x4e412d){
                    total_votes_count = ecp.voterManager().getNAVoterLength(const_full_name);
                }
                else if(pre_name == 0x50412d){
                    total_votes_count = ecp.voterManager().getPAVoterLength(const_full_name);
                }
            }
            else if(pre_name == 0x4e412d){
                const_full_name = cons_data.getNABytes(i);
                total_votes_count = ecp.voterManager().getNAVoterLength(const_full_name);
            }
            else// if(pre_name == 0x50412d)
            {
                const_full_name = cons_data.getPABytes(pre_name, i);
                total_votes_count = ecp.voterManager().getPAVoterLength(const_full_name);
            }
            constituencies[i] = new Constituency(const_full_name, total_votes_count, ecp.partyManager().getConstituencyParties(const_full_name));
        }
        return constituencies;
    }
    
    function createGeneralElection(uint256 _startTime, uint256 _endTime, bytes32 _name) public {
        elections[elections_count] = create_ge.createGeneralElection(_startTime, _endTime, _name);
        elections_count++;
    }
    function createProvincialElection(uint256 _startTime, uint256 _endTime, bytes32 _name, bytes3 _pre_name) public {
        
        elections[elections_count] = create_pe.createProvincialElection(_startTime, _endTime, _name, _pre_name);
        elections_count++;
    }
    function createNAElection(uint256 _startTime, uint256 _endTime, bytes32 _name, bytes8 _na_name) public {
        
        elections[elections_count] = create_nae.createNAElection(_startTime, _endTime, _name, _na_name);
        elections_count++;
    }
    function createPAElection(uint256 _startTime, uint256 _endTime, bytes32 _name, bytes8 _pa_name) public {
        
        elections[elections_count] = create_pae.createPAElection(_startTime, _endTime, 
        _name, _pa_name);
        elections_count++;
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx RESULTS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
    function endElection(uint256 index)public {
        results[results_count] = Election(address(elections[index])) ;
        results_count++;
        for (uint256 i = index; i < elections_count-1; i++) {
            elections[i] = elections[i+1];
        }

        delete elections[elections_count];
        elections_count--;
    }


    // //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx GETTERS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
    struct ElectionConstituency{
        address[] election_adds;
        bytes32[] election_names;
        address[] const_adds;
    }
    function getElectionConstituency(bytes8 _constituency_name) public view returns(ElectionConstituency memory){
                
        // bytes32[] memory temp_elections_names = new bytes32[](elections_count);
        uint256[] memory temp_elections_indexes = new uint256[](elections_count);
        uint size = 0;

        for (uint256 i = 0; i < elections_count; i++) {
            if(address(elections[i]) != address(0))
            {
                if(elections[i].containConstituency(_constituency_name)){
                    // temp_elections_names[size] = elections[i].name();
                    temp_elections_indexes[size] = i;
                    size++;
                }
            }
        }
        bytes32[] memory elections_names = new bytes32[](size);
        address[] memory constituencies_add = new address[](size);
        address[] memory elections_adds = new address[](size);

        for (uint256 i = 0; i < size; i++) {
            // elections_names[i] = temp_elections_names[i];
            elections_names[i] = elections[temp_elections_indexes[i]].name();
            constituencies_add[i] = elections[temp_elections_indexes[i]].getConstituency(_constituency_name);
            elections_adds[i] = address(elections[temp_elections_indexes[i]]);
        }
        
        return ElectionConstituency({election_adds: elections_adds,election_names: elections_names, const_adds:constituencies_add});
    }

}