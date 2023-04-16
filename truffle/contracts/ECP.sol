// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ECP {
    struct VoterConstituency {
        bytes32 cnic;
        bytes32 na;
        bytes32 pa;
    }

    uint256 public voters_count;
    mapping(uint256 => bytes32) public voters_cnics;
    mapping(bytes32 => uint256) public voters_indexes;
    mapping(bytes32 => VoterConstituency) public voters;

    event VoterAdded(bytes32 cnic, bytes32 na, bytes32 pa);
    event VotersAdded(uint256 count);
    event VoterRemoved(bytes32 cnic);
    event VotersRemoved(uint256 count);

    
    constructor() {
        voters_count = 0;
    }

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx TESTING DATA SETUP xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
    // function setupVoterConstituencyData() public {
    //     string[4] memory na = ["NA-1", "NA-2", "NA_3", "NA-4"];
    //     string[2] memory pa_pp = ["PP-1", "PP-2"];
    //     string[2] memory pa_ps = ["PS-1", "PS-2"];
    //     string[2] memory pa_pk = ["PK-1", "PK-2"];
    //     string[2] memory pa_pb = ["PB-1", "PB-2"];
    //     string[40] memory cnics = ["35202-8940588-0", "42101-1234567-1", "36302-2345678-9", "17201-3456789-0", "43204-4567890-1", "61101-5678901-2", "36302-6789012-3", "42101-7890123-4", "61101-8901234-5", "61101-9012345-6", "43204-0123456-7", "17201-1234567-8", "61101-2345678-9", "42101-3456789-0", "36302-4567890-1", "61101-5678901-2", "43204-6789012-3", "36302-7890123-4", "42101-8901234-5", "61101-9012345-6",
    //      "35202-1112233-4", "42101-4567890-1", "36302-6789012-3", "17201-9012345-6", "43204-3456789-0", "61101-2345678-9", "36302-4567890-1", "42101-5678901-2", "61101-7890123-4", "17201-8901234-5", "43204-0123456-7", "35202-1234567-8", "36302-2345678-9", "42101-3456789-0", "61101-4567890-1", "43204-5678901-2", "36302-6789012-3", "61101-7890123-4", "42101-8901234-5", "36302-9012345-6"];
    //     uint j=0;
    //     uint k=0;
    //     for(uint i=0; i<cnics.length;i++){
    //         if(i < 10)
    //            addVoterConstituency(cnics[i], na[j], pa_pp[k]);
    //         else if(i < 20)
    //            addVoterConstituency(cnics[i], na[j], pa_ps[k]);
    //         else if(i < 30)
    //            addVoterConstituency(cnics[i], na[j], pa_pk[k]);
    //         else
    //             addVoterConstituency(cnics[i], na[j], pa_pb[k]);
    //         j++; k++;
    //         if(j == 3) j=0;
    //         if(k == 1) k=0;
    //     } 
    // } 
    
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx GETTERS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

    function getVoterConstituency(bytes32 cnic) public view returns (VoterConstituency memory){
        return voters[cnic];
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx REGISTER xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

    function addVoterConstituency(VoterConstituency memory _voter) public {
        require(_voter.cnic != bytes32(0), "Invalid CNIC");
        require(_voter.na != bytes32(0), "Invalid NA");
        require(_voter.pa != bytes32(0), "Invalid PA");
        uint temp_voters_count = voters_count;
        voters_count++;
        voters_cnics[temp_voters_count] = _voter.cnic;
        voters_indexes[_voter.cnic] = temp_voters_count;
        voters[_voter.cnic] = _voter;

        emit VoterAdded(_voter.cnic, _voter.na, _voter.pa);
    }

    function addVoterConstituencies(VoterConstituency[] memory _voters) public {
        for (uint i = 0; i < _voters.length; i++) {
            addVoterConstituency(_voters[i]);
        }

        emit VotersAdded(_voters.length);
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx REMOVE xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
    
    function removeVoterConstituency(bytes32 _cnic) public {
        require(voters[_cnic].cnic != bytes32(0), "Voter does not exist");
        uint temp_voters_count = voters_count;
        voters_count--;

        delete voters[_cnic];

        uint256 remove_index = voters_indexes[_cnic];
        bytes32 remove_cnic = voters_cnics[remove_index];
        bytes32 last_cnic = voters_cnics[temp_voters_count-1];

        voters_cnics[remove_index] = voters_cnics[temp_voters_count-1];
        voters_indexes[last_cnic] = remove_index;

        delete voters_indexes[remove_cnic];
        delete voters_cnics[temp_voters_count-1];

        emit VoterRemoved(_cnic);
    }
    function removeVoterConstituencies(bytes32[] memory _cnics) public {
        for (uint i = 0; i < _cnics.length; i++) {
            removeVoterConstituency(_cnics[i]);
        }

        emit VotersRemoved(_cnics.length);
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ELECTIONS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
}
