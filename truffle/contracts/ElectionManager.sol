// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./ECP.sol";
import "./Election.sol";
import "./Constituency.sol";
import "./Party.sol";

contract ElectionManager {
    ECP private ecp;
    address private ecpAdd;

    uint constant public NA_CONSTITUENCIES_SIZE = 4; // 272;
    uint constant public PA_PP_CONSTITUENCIES_SIZE = 2; // 297;
    uint constant public PA_PS_CONSTITUENCIES_SIZE = 2; // 130;
    uint constant public PA_PK_CONSTITUENCIES_SIZE = 2; // 115;
    uint constant public PA_PB_CONSTITUENCIES_SIZE = 2; // 51;

    uint256 public elections_count;
    mapping(uint256 => Election) public elections;

    function setECP(ECP _ecp) public {
        require(ecpAdd == address(0), "ECP already set!");
        ecp = _ecp;
        ecpAdd = address(ecp);
        ecp.setElectionManager(this);
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ELECTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

    function createGeneralElection(bytes32 _name) public {
        // NA 
        Constituency[] memory na_constituencies = new Constituency[](NA_CONSTITUENCIES_SIZE);

        for (uint256 i = 0; i < NA_CONSTITUENCIES_SIZE; i++) {
        
            bytes8 na_name = concatBytes3(0x4e412d , bytes3(uint256ToBytes3(i)));
            
            uint256 total_votes_count = ecp.voterManager().getNAVoterLength(na_name);
            Party[] memory constituency_parties;
            uint k = 0;
            for (uint256 j = 0; j < ecp.partyManager().parties_count(); j++) {
                if(ecp.partyManager().parties(j).isAnyCandidateNominated(na_name) == true){
                    constituency_parties[k] = ecp.partyManager().parties(j);
                    k++;
                }
            }
            na_constituencies[i] = new Constituency(na_name, total_votes_count, constituency_parties);
        }

        elections[elections_count] = new GeneralElection(
            _name, 
            na_constituencies,
            getProvincialConstituencies(0x50502d,PA_PP_CONSTITUENCIES_SIZE),
            getProvincialConstituencies(0x50532d,PA_PS_CONSTITUENCIES_SIZE),
            getProvincialConstituencies(0x504b2d,PA_PK_CONSTITUENCIES_SIZE),
            getProvincialConstituencies(0x50422d,PA_PB_CONSTITUENCIES_SIZE)
        );
        elections_count++;
    }

    function createProvincialElection(bytes32 _name, bytes3 _pa_name) public {
        if(_pa_name == 0x50502d)
            elections[elections_count] = new ProvincialElection(_name, getProvincialConstituencies(_pa_name, PA_PP_CONSTITUENCIES_SIZE));
        else if(_pa_name == 0x50532d)
            elections[elections_count] = new ProvincialElection(_name, getProvincialConstituencies(_pa_name, PA_PS_CONSTITUENCIES_SIZE));
        else if(_pa_name == 0x504b2d)
            elections[elections_count] = new ProvincialElection(_name, getProvincialConstituencies(_pa_name, PA_PK_CONSTITUENCIES_SIZE));
        else if(_pa_name == 0x50422d)
            elections[elections_count] = new ProvincialElection(_name, getProvincialConstituencies(_pa_name, PA_PB_CONSTITUENCIES_SIZE));
        elections_count++;
    }

    function getProvincialConstituencies(bytes3 pre_name, uint pa_size) public returns(Constituency[] memory) {
        Constituency[] memory pa_constituencies = new Constituency[](pa_size);

        for (uint256 i = 0; i < pa_size; i++) {
            bytes8 pa_name = concatBytes3(pre_name, uint256ToBytes3(i));
            uint256 total_votes_count = ecp.voterManager().getPAVoterLength(pa_name);
            Party[] memory constituency_parties;
            uint k = 0;
            for (uint256 j = 0; j < ecp.partyManager().parties_count(); j++) {
                if(ecp.partyManager().parties(j).isAnyCandidateNominated(pa_name)){
                    constituency_parties[k] = ecp.partyManager().parties(j);
                    k++;
                }
            }
            pa_constituencies[i] = new Constituency(pa_name, total_votes_count, constituency_parties);
        }
        return pa_constituencies;
    }
//  {   
//     // function getProvincialConstituencies(bytes3 pre_name, uint pa_size) public returns(Constituency[] memory) {
//     //     Constituency[] memory pa_constituencies = new Constituency[](pa_size);

//     //     for (uint256 i = 0; i < pa_size; i++) {
//     //         bytes8 pa_name = concatBytes3(pre_name, uint256ToBytes3(i));
//     //         uint256 total_votes_count = pa_voters[pa_name].length;
//     //         uint size = 0;
//     //         for (uint256 j = 0; j < parties_count; j++) {
//     //             if(parties[j].isAnyCandidateNominated(pa_name)){
//     //                 size++;
//     //             }
//     //         }
//     //         Party[] memory constituency_parties = new Party[](size);
//     //         for (uint256 j = 0; j < parties_count; j++) {
//     //             if(parties[j].isAnyCandidateNominated(pa_name)){
//     //                 constituency_parties[j] = parties[j];
//     //             }
//     //         }
//     //         pa_constituencies[i] = new Constituency(pa_name, total_votes_count, constituency_parties);
//     //     }
//     //     return pa_constituencies;
//     // }
//     // function createNAElection(bytes32 _name, bytes8 _na_name) public {
        
//     //     uint256 total_votes_count = na_voters[_na_name].length;
//     //     Party[] memory constituency_parties;
//     //     uint k = 0;
//     //     for (uint256 j = 0; j < parties_count; j++) {
//     //         if(parties[j].isAnyCandidateNominated(_na_name)){
//     //             constituency_parties[k] = parties[j];
//     //             k++;
//     //         }
//     //     }
//     //     Constituency[] memory na_constituencies = new Constituency[](uint256(1));
//     //     na_constituencies[0] = new Constituency(_na_name, total_votes_count, constituency_parties);

//     //     elections[elections_count] = new NationalElection(_name,na_constituencies);
//     //     elections_count++;
//     // }
//     // function createPAElection(bytes32 _name, bytes8 _pa_name) public {
        
//     //     uint256 total_votes_count = pa_voters[_pa_name].length;
//     //     Party[] memory constituency_parties;
//     //     uint k = 0;
//     //     for (uint256 j = 0; j < parties_count; j++) {
//     //         if(parties[j].isAnyCandidateNominated(_pa_name)){
//     //             constituency_parties[k] = parties[j];
//     //             k++;
//     //         }
//     //     }
//     //     Constituency[] memory pa_constituencies = new Constituency[](uint256(1));
//     //     pa_constituencies[0] = new Constituency(_pa_name, total_votes_count, constituency_parties);
//     //     elections[elections_count] = new NationalElection(_name,pa_constituencies);
//     //     elections_count++;
//     // }
// }

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Helper xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

    function concatBytes3(bytes3 a, bytes3 b) public pure returns (bytes8) {
        bytes memory temp = abi.encodePacked(a, b);
        bytes8 result;
        assembly {
            result := mload(add(temp, 8))
        }
        return result;
    }

    function uint256ToBytes3(uint256 value) public pure returns (bytes3) {
        bytes memory temp = abi.encodePacked(value);
        bytes3 result;
        assembly {
            result := mload(add(temp, 0x1))
        }
        return result;
    }

}