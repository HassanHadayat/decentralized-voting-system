// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./ECP.sol";
import "./Party.sol";

contract PartyManager {
    ECP private ecp;

    address private ecpAdd;
    uint256 public parties_count;
    mapping(uint256 => Party) public parties;
    
    
    function setECP(ECP _ecp) public {
        require(ecpAdd == address(0), "ECP already set!");
        ecp = _ecp;
        ecpAdd = address(ecp);
        ecp.setPartyManager(this);
    }
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx PARTIES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

    function addParty(bytes32 _party_name, bytes16 _chairman_cnic, bytes32 _postal_add, bytes8 __alias
    , bytes16[] memory _party_candidates_cnics, bytes8[] memory _party_candidates_constituencies) public {
        
        Party _newParty = new Party(parties_count, _party_name, ecp.candidateManager().candidates(_chairman_cnic), _postal_add, __alias);
        for (uint256 i = 0; i < _party_candidates_cnics.length; i++) {
            _newParty.addCandidate(ecp.candidateManager().candidates(_party_candidates_cnics[i]));
            _newParty.addConstituencyCandidate(_party_candidates_cnics[i], _party_candidates_constituencies[i]);
        }
        parties[parties_count] = _newParty;
        
        parties_count++;
    }

    function removeParty(bytes32 _party_name) public {
        for (uint256 i = 0; i < parties_count; i++) {
            if(_party_name == parties[i].name())
            {
                delete parties[i];
                parties_count--;
                return;
            }
        }
    }

    function getPartiesNames() public view returns (bytes32[] memory){
        bytes32[] memory party_names = new bytes32[](parties_count);
        for (uint256 i = 0; i < parties_count; i++) {
            party_names[i] = parties[i].name();
        }
        return party_names;
    }
}