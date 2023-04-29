// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./console.sol";

import "./Candidate.sol";
import "./Party.sol";

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


    uint256 public candidates_count;
    mapping(uint256 => bytes32) public candidates_cnics;
    mapping(bytes32 => uint256) public candidates_indexes;
    mapping(bytes32 => Candidate) public candidates;

    uint256 public parties_count;
    mapping(uint256 => Party) public parties;

    constructor() {
        voters_count = 0;
        console.log(
            '\n\n#################################################\n'
            '####        Now Deploying ECP Contract        ####\n'
            '#################################################'
        );
        setupData();
    }
    
    function setupData() private {
        // SETUP VOTERS DATA
        {
            uint _voters_size = 52;
            VoterConstituency[] memory _voters = new VoterConstituency[](_voters_size);

            _voters[0] = VoterConstituency(stringToBytes32("91661-5856424-9"),stringToBytes32("NA-1"),stringToBytes32("PP-1"));
            _voters[1] = VoterConstituency(stringToBytes32("20432-7898875-3"),stringToBytes32("NA-1"),stringToBytes32("PP-1"));
            _voters[2] = VoterConstituency(stringToBytes32("52054-4934571-0"),stringToBytes32("NA-1"),stringToBytes32("PP-1"));
            _voters[3] = VoterConstituency(stringToBytes32("75187-9686504-4"),stringToBytes32("NA-1"),stringToBytes32("PP-1"));
            _voters[4] = VoterConstituency(stringToBytes32("23058-0853315-3"),stringToBytes32("NA-1"),stringToBytes32("PP-1"));
            _voters[5] = VoterConstituency(stringToBytes32("94270-3698369-5"),stringToBytes32("NA-1"),stringToBytes32("PP-2"));
            _voters[6] = VoterConstituency(stringToBytes32("02358-0795946-3"),stringToBytes32("NA-1"),stringToBytes32("PP-2"));
            _voters[7] = VoterConstituency(stringToBytes32("89007-4155314-4"),stringToBytes32("NA-1"),stringToBytes32("PP-2"));
            _voters[8] = VoterConstituency(stringToBytes32("13455-6132989-6"),stringToBytes32("NA-1"),stringToBytes32("PP-2"));
            _voters[9] = VoterConstituency(stringToBytes32("57899-8953180-1"),stringToBytes32("NA-1"),stringToBytes32("PP-2"));
            _voters[10] = VoterConstituency(stringToBytes32("86352-6954872-4"),stringToBytes32("NA-2"),stringToBytes32("PS-1"));
            _voters[11] = VoterConstituency(stringToBytes32("26108-0978997-5"),stringToBytes32("NA-2"),stringToBytes32("PS-1"));
            _voters[12] = VoterConstituency(stringToBytes32("31002-0286283-2"),stringToBytes32("NA-2"),stringToBytes32("PS-1"));
            _voters[13] = VoterConstituency(stringToBytes32("12966-5046393-6"),stringToBytes32("NA-2"),stringToBytes32("PS-1"));
            _voters[14] = VoterConstituency(stringToBytes32("09873-9482546-9"),stringToBytes32("NA-2"),stringToBytes32("PS-1"));
            _voters[15] = VoterConstituency(stringToBytes32("20354-3999622-5"),stringToBytes32("NA-2"),stringToBytes32("PS-2"));
            _voters[16] = VoterConstituency(stringToBytes32("10963-5540940-1"),stringToBytes32("NA-2"),stringToBytes32("PS-2"));
            _voters[17] = VoterConstituency(stringToBytes32("00344-0872804-0"),stringToBytes32("NA-2"),stringToBytes32("PS-2"));
            _voters[18] = VoterConstituency(stringToBytes32("51488-7885357-6"),stringToBytes32("NA-2"),stringToBytes32("PS-2"));
            _voters[19] = VoterConstituency(stringToBytes32("39295-8830137-7"),stringToBytes32("NA-2"),stringToBytes32("PS-2"));
            _voters[20] = VoterConstituency(stringToBytes32("68393-1058733-0"),stringToBytes32("NA-3"),stringToBytes32("PK-1"));
            _voters[21] = VoterConstituency(stringToBytes32("60803-5201855-2"),stringToBytes32("NA-3"),stringToBytes32("PK-1"));
            _voters[22] = VoterConstituency(stringToBytes32("27679-1653865-0"),stringToBytes32("NA-3"),stringToBytes32("PK-1"));
            _voters[23] = VoterConstituency(stringToBytes32("38967-1186868-7"),stringToBytes32("NA-3"),stringToBytes32("PK-1"));
            _voters[24] = VoterConstituency(stringToBytes32("05113-2011715-3"),stringToBytes32("NA-3"),stringToBytes32("PK-1"));
            _voters[25] = VoterConstituency(stringToBytes32("08681-6194585-8"),stringToBytes32("NA-3"),stringToBytes32("PK-2"));
            _voters[26] = VoterConstituency(stringToBytes32("85000-7971439-1"),stringToBytes32("NA-3"),stringToBytes32("PK-2"));
            _voters[27] = VoterConstituency(stringToBytes32("48004-7460006-6"),stringToBytes32("NA-3"),stringToBytes32("PK-2"));
            _voters[28] = VoterConstituency(stringToBytes32("87392-1013158-5"),stringToBytes32("NA-3"),stringToBytes32("PK-2"));
            _voters[29] = VoterConstituency(stringToBytes32("45190-2652702-7"),stringToBytes32("NA-3"),stringToBytes32("PK-2"));
            _voters[30] = VoterConstituency(stringToBytes32("71216-3506961-4"),stringToBytes32("NA-3"),stringToBytes32("PB-2"));
            _voters[31] = VoterConstituency(stringToBytes32("07548-1528037-7"),stringToBytes32("NA-4"),stringToBytes32("PB-1"));
            _voters[32] = VoterConstituency(stringToBytes32("44702-5319205-5"),stringToBytes32("NA-4"),stringToBytes32("PB-1"));
            _voters[33] = VoterConstituency(stringToBytes32("43149-3303504-3"),stringToBytes32("NA-4"),stringToBytes32("PB-1"));
            _voters[34] = VoterConstituency(stringToBytes32("11748-8477808-2"),stringToBytes32("NA-4"),stringToBytes32("PB-1"));
            _voters[35] = VoterConstituency(stringToBytes32("98590-5688513-9"),stringToBytes32("NA-4"),stringToBytes32("PB-1"));
            _voters[36] = VoterConstituency(stringToBytes32("11016-3236873-0"),stringToBytes32("NA-4"),stringToBytes32("PB-2"));
            _voters[37] = VoterConstituency(stringToBytes32("66020-1962335-7"),stringToBytes32("NA-4"),stringToBytes32("PB-2"));
            _voters[38] = VoterConstituency(stringToBytes32("84367-8177738-4"),stringToBytes32("NA-4"),stringToBytes32("PB-2"));
            _voters[39] = VoterConstituency(stringToBytes32("87784-9502627-4"),stringToBytes32("NA-4"),stringToBytes32("PB-2"));            
            _voters[40] = VoterConstituency(stringToBytes32("54074-1975073-2"),stringToBytes32("NA-4"),stringToBytes32("PB-2"));
            _voters[41] = VoterConstituency(stringToBytes32("99264-8820363-4"),stringToBytes32("NA-1"),stringToBytes32("PP-1"));
            _voters[42] = VoterConstituency(stringToBytes32("74267-7001613-0"),stringToBytes32("NA-1"),stringToBytes32("PP-1"));
            _voters[43] = VoterConstituency(stringToBytes32("26766-5629247-5"),stringToBytes32("NA-1"),stringToBytes32("PP-1"));
            _voters[44] = VoterConstituency(stringToBytes32("00911-4680350-2"),stringToBytes32("NA-1"),stringToBytes32("PP-1"));
            _voters[45] = VoterConstituency(stringToBytes32("95363-6701830-1"),stringToBytes32("NA-1"),stringToBytes32("PP-2"));
            _voters[46] = VoterConstituency(stringToBytes32("12213-5718928-6"),stringToBytes32("NA-1"),stringToBytes32("PP-2"));
            _voters[47] = VoterConstituency(stringToBytes32("38708-8321853-8"),stringToBytes32("NA-1"),stringToBytes32("PP-2"));
            _voters[48] = VoterConstituency(stringToBytes32("33451-0921622-6"),stringToBytes32("NA-1"),stringToBytes32("PP-2"));
            _voters[49] = VoterConstituency(stringToBytes32("61080-1753354-9"),stringToBytes32("NA-1"),stringToBytes32("PP-2"));
            
            // Parties Chairmans
            // Imran Khan
            _voters[50] = VoterConstituency(stringToBytes32("35202-8940855-0"),stringToBytes32("NA-3"),stringToBytes32("PK-1"));
            // Shehbaz Sharif
            _voters[51] = VoterConstituency(stringToBytes32("35202-8940855-1"),stringToBytes32("NA-1"),stringToBytes32("PP-1"));
            
            addVoterConstituencies(_voters);
        }
        // SETUP CANDIDATES DATA
        {
            uint _cands_size = 27;
            // string[] memory fullname = new string[](_cands_size);
            string[27] memory fullname = ["Bilal Khan","Maha Ali","Waqar Ali","Ayesha Khalid","Ahmed Hassan","Zoya Malik","Omar Farooq","Maryam Asif","Usman Ali","Rukhsar Bibi","Nabeel Khan","Sanaullah Khan","Tasnim Ali","Sufyan Ali","Sadia Ashraf","Sohail Raza","Anum Ali","Qasim Ali","Hina Ali","Haris Ahmed","Shazia Hassan","Saad Raza","Ayesha Naeem","Farhan Ali","Saima Ali", "Imran Khan", "Shahbaz Sharif"];
            uint256[27] memory age = [uint256(50),34,21,36,41,30,45,18,26,58,51,47,25,53,40,44,21,37,32,30,42,48,23,56,26, 70, 71];
            string[27] memory gender = ["M","F","M","F","M","F","M","F","M","F","M","M","F","M","F","M","F","M","F","M","F","M","F","M","F","M", "M"];
            string[27] memory cnic = ["08681-6194585-8","85000-7971439-1","48004-7460006-6","87392-1013158-5","45190-2652702-7","71216-3506961-4","07548-1528037-7","44702-5319205-5","43149-3303504-3","11748-8477808-2","98590-5688513-9","11016-3236873-0","66020-1962335-7","84367-8177738-4","87784-9502627-4","54074-1975073-2","99264-8820363-4","74267-7001613-0","26766-5629247-5","00911-4680350-2","95363-6701830-1","12213-5718928-6","38708-8321853-8","33451-0921622-6","61080-1753354-9", "35202-8940855-0", "35202-8940855-1"];
            string[27] memory contact = ["0325-6789012","0326-7890123","0327-8901234","0328-9012345","0329-0123456","0330-1234567","0331-2345678","0332-3456789","0333-4567890","0334-5678901","0335-6789012","0336-7890123","0337-8901234","0338-9012345","0339-0123456","0340-1234567","0341-2345678","0342-3456789","0343-4567890","0344-5678901","0345-6789012","0346-7890123","0347-8901234","0348-9012345","0349-0123456", "0323-5760200", "0323-5760201"];
            string[27] memory fathername = ["Basit Khan","Danish Ali","Ehsan Ahmed","Farhan Malik","Ghazanfar Ali","Hamza Khan","Irfan Ali","Javed Iqbal","Kashif Ali","Luqman Khan","Mohsin Ali","Nadeem Ahmed","Owais Khan","Qaisar Ali","Raheel Khan","Salman Hussain","Tahir Ali","Umer Shah","Vicky Ali","Waqas Ali","Xubair Khan","Yasir Ahmed","Zahid Ali","Ali Raza","Babar Khan", "Ikramullah Khan", "Muhammad Sharif"];
            string[27] memory p_add = ["p1-Add","p2-Add","p3-Add","p4-Add","p5-Add","p6-Add","p7-Add","p8-Add","p9-Add","p10-Add","p11-Add","p12-Add","p13-Add","p14-Add","p15-Add","p16-Add","p17-Add","p18-Add","p19-Add","p20-Add","p21-Add","p22-Add","p23-Add","p24-Add","p25-Add", "p26-Add", "p27-Add"];
            string[27] memory l_add = ["l1-Add","l2-Add","l3-Add","l4-Add","l5-Add","l6-Add","l7-Add","l8-Add","l9-Add","l10-Add","l11-Add","l12-Add","l13-Add","l14-Add","l15-Add","l16-Add","l17-Add","l18-Add","l19-Add","l20-Add","l21-Add","l22-Add","l23-Add","l24-Add","l25-Add", "l26-Add", "l27-Add"];
            string[27] memory province = ["Punjab","Punjab","Punjab","Punjab","Punjab","Punjab","Punjab","Sindh","Sindh","Sindh","Sindh","Sindh","Sindh","KPK","KPK","KPK","KPK","KPK","KPK","Balochistan","Balochistan","Balochistan","Balochistan","Balochistan","Balochistan", "KPK", "Punjab"];
            
            // addCandidate(_fullname, _age, _gender, _cnic, _contact, _father_name, _parmanent_add, _local_add, _province);
            for(uint i=0; i< _cands_size;i++){

                addCandidate(stringToBytes32(fullname[i]), age[i], stringToBytes32(gender[i]), stringToBytes32(cnic[i]), stringToBytes32(contact[i]), stringToBytes32(fathername[i]),stringToBytes32(p_add[i]),stringToBytes32(l_add[i]),stringToBytes32(province[i]));
            }
        }
        // SETUP PARTIES DATA
        {
            bytes32[] memory pti_cands_cnics = new bytes32[](14);
            bytes32[] memory pti_cands_constituencies = new bytes32[](14);

            pti_cands_cnics [0] = stringToBytes32("35202-8940855-0");
            pti_cands_cnics [1] = stringToBytes32("08681-6194585-8");
            pti_cands_cnics [2] = stringToBytes32("48004-7460006-6");
            pti_cands_cnics [3] = stringToBytes32("87392-1013158-5");
            pti_cands_cnics [4] = stringToBytes32("07548-1528037-7");
            pti_cands_cnics [5] = stringToBytes32("44702-5319205-5");
            pti_cands_cnics [6] = stringToBytes32("11748-8477808-2");
            pti_cands_cnics [7] = stringToBytes32("11016-3236873-0");
            pti_cands_cnics [8] = stringToBytes32("84367-8177738-4");
            pti_cands_cnics [9] = stringToBytes32("54074-1975073-2");
            pti_cands_cnics[10] = stringToBytes32("74267-7001613-0");
            pti_cands_cnics[11] = stringToBytes32("00911-4680350-2");
            pti_cands_cnics[12] = stringToBytes32("12213-5718928-6");
            pti_cands_cnics[13] = stringToBytes32("33451-0921622-6");

            pti_cands_constituencies [0] = stringToBytes32("NA-3");
            pti_cands_constituencies [1] = stringToBytes32("NA-1");
            pti_cands_constituencies [2] = stringToBytes32("PP-1");
            pti_cands_constituencies [3] = stringToBytes32("PP-1");
            pti_cands_constituencies [4] = stringToBytes32("PP-2");
            pti_cands_constituencies [5] = stringToBytes32("NA-2");
            pti_cands_constituencies [6] = stringToBytes32("PS-1");
            pti_cands_constituencies [7] = stringToBytes32("PS-2");
            pti_cands_constituencies [8] = stringToBytes32("NA-3");
            pti_cands_constituencies [9] = stringToBytes32("PK-1");
            pti_cands_constituencies[10] = stringToBytes32("PK-2");
            pti_cands_constituencies[11] = stringToBytes32("NA-4");
            pti_cands_constituencies[12] = stringToBytes32("PB-1");
            pti_cands_constituencies[13] = stringToBytes32("PB-2");
            
            addParty(stringToBytes32("Pakistan Tehreek-e-Insaf"), stringToBytes32("35202-8940855-0"), stringToBytes32("Plot # 1-A, Street # 32, Sector G-8/4 Islamabad"), stringToBytes32("PTI"), pti_cands_cnics, pti_cands_constituencies);
            
            bytes32[] memory pmln_cands_cnics = new bytes32[](13);
            bytes32[] memory pmln_cands_constituencies = new bytes32[](13);

            pmln_cands_cnics [0] = stringToBytes32("35202-8940855-1");
            pmln_cands_cnics [1] = stringToBytes32("85000-7971439-1");
            pmln_cands_cnics [2] = stringToBytes32("45190-2652702-7");
            pmln_cands_cnics [3] = stringToBytes32("71216-3506961-4");
            pmln_cands_cnics [4] = stringToBytes32("43149-3303504-3");
            pmln_cands_cnics [5] = stringToBytes32("98590-5688513-9");
            pmln_cands_cnics [6] = stringToBytes32("66020-1962335-7");
            pmln_cands_cnics [7] = stringToBytes32("87784-9502627-4");
            pmln_cands_cnics [8] = stringToBytes32("99264-8820363-4");
            pmln_cands_cnics [9] = stringToBytes32("26766-5629247-5");
            pmln_cands_cnics[10] = stringToBytes32("95363-6701830-1");
            pmln_cands_cnics[11] = stringToBytes32("38708-8321853-8");
            pmln_cands_cnics[12] = stringToBytes32("61080-1753354-9");

            pmln_cands_constituencies [0] = stringToBytes32("NA-1");
            pmln_cands_constituencies [1] = stringToBytes32("NA-1");
            pmln_cands_constituencies [2] = stringToBytes32("PP-1");
            pmln_cands_constituencies [3] = stringToBytes32("PP-2");
            pmln_cands_constituencies [4] = stringToBytes32("NA-2");
            pmln_cands_constituencies [5] = stringToBytes32("PS-1");
            pmln_cands_constituencies [6] = stringToBytes32("PS-2");
            pmln_cands_constituencies [7] = stringToBytes32("NA-3");
            pmln_cands_constituencies [8] = stringToBytes32("PK-1");
            pmln_cands_constituencies [9] = stringToBytes32("PK-2");
            pmln_cands_constituencies[10] = stringToBytes32("NA-4");
            pmln_cands_constituencies[11] = stringToBytes32("PB-1");
            pmln_cands_constituencies[12] = stringToBytes32("PB-2");
            
            addParty(stringToBytes32("Pakistan Muslim League (N)"), stringToBytes32("35202-8940855-1"), stringToBytes32("PML-N Secretaiat, 20-H, Street# 10, F-8/3, Islamabad"), stringToBytes32("PML-N"), pmln_cands_cnics, pmln_cands_constituencies);
        }
        // SETUP ELECTIONS DATA
    }

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx VOTER CONSTITUENCY xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
    
    function addVoterConstituency(VoterConstituency memory _voter) public {
        // require(_voter.cnic != bytes32(0), "Invalid CNIC");
        // require(_voter.na != bytes32(0), "Invalid NA");
        // require(_voter.pa != bytes32(0), "Invalid PA");
        voters_cnics[voters_count] = _voter.cnic;
        voters_indexes[_voter.cnic] = voters_count;
        voters[_voter.cnic] = _voter;
        voters_count++;

        console.log(
            '\n\n#### [ Voter Added ] ################################# ' , bytes32ToString(_voter.cnic)
        );
        // emit VoterAdded(_voter.cnic, _voter.na, _voter.pa);
    }

    function addVoterConstituencies(VoterConstituency[] memory _voters) public {
        for (uint i = 0; i < _voters.length; i++) {
            addVoterConstituency(_voters[i]);
        }

        // emit VotersAdded(_voters.length);
    }

    function removeVoterConstituency(bytes32 _cnic) public {
        // require(voters[_cnic].cnic != bytes32(0), "Voter does not exist");
        delete voters[_cnic];

        uint256 remove_index = voters_indexes[_cnic];
        bytes32 remove_cnic = voters_cnics[remove_index];
        bytes32 last_cnic = voters_cnics[voters_count-1];

        voters_cnics[remove_index] = voters_cnics[voters_count-1];
        voters_indexes[last_cnic] = remove_index;

        delete voters_indexes[remove_cnic];
        delete voters_cnics[voters_count-1];

        voters_count--;
        
        // emit VoterRemoved(_cnic);
    }

    function removeVoterConstituencies(bytes32[] memory _cnics) public {
        for (uint i = 0; i < _cnics.length; i++) {
            removeVoterConstituency(_cnics[i]);
        }

        // emit VotersRemoved(_cnics.length);
    }

    function getVoterConstituency(bytes32 _cnic) public view returns (VoterConstituency memory){
        return voters[_cnic];
    }

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx CANDIDATES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
    
    function addCandidate(bytes32 _fullname, uint _age, bytes32 _gender, bytes32 _cnic, bytes32 _contact, bytes32 _father_name, bytes32 _parmanent_add, bytes32 _local_add, bytes32 _province) public {
        candidates_cnics[candidates_count] = _cnic;
        candidates_indexes[_cnic] = candidates_count;
        // Create new Candidate object
        candidates[_cnic] = new Candidate(_fullname, _age, _gender, _cnic, _contact, _father_name, _parmanent_add, _local_add, _province);
        
        candidates_count++;
         console.log(
            '\n\n#### [ Candidate Added ] ################################# ' , bytes32ToString(candidates[_cnic].cnic())
        );
    }

    function addCandidates(bytes32[] memory _fullname, uint[] memory _age, bytes32[] memory _gender, bytes32[] memory _cnic, bytes32[] memory _contact, bytes32[] memory _father_name, bytes32[] memory _parmanent_add, bytes32[] memory _local_add, bytes32[] memory _province) public {
        for (uint i = 0; i < _cnic.length; i++) {
            // add Candidate
            addCandidate(_fullname[i], _age[i], _gender[i], _cnic[i], _contact[i], _father_name[i], _parmanent_add[i], _local_add[i], _province[i]);
        }

    }

    function removeCandidate(bytes32 _cnic) public {
        // require(candidates[_cnic].cnic() != bytes32(0), "Candidate does not exist");

        delete candidates[_cnic];

        uint256 remove_index = candidates_indexes[_cnic];
        bytes32 remove_cnic = candidates_cnics[remove_index];
        bytes32 last_cnic = candidates_cnics[candidates_count-1];

        candidates_cnics[remove_index] = candidates_cnics[candidates_count-1];
        candidates_indexes[last_cnic] = remove_index;

        delete candidates_indexes[remove_cnic];
        delete candidates_cnics[candidates_count-1];

        candidates_count--;

        // emit CandidateRemoved(_cnic);
    }

    function removeCandidates(bytes32[] memory _cnics) public {
        for (uint i = 0; i < _cnics.length; i++) {
            removeCandidate(_cnics[i]);
        }
        // emit CandidatesAdded(_cnics.length);
    }

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx PARTIES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

    function addParty(bytes32 _party_name, bytes32 _chairman_cnic, bytes32 _postal_add, bytes32 __alias
    , bytes32[] memory _party_candidates, bytes32[] memory _party_candidates_constituencies) public {
        
        Party _newParty = new Party(parties_count, _party_name, candidates[_chairman_cnic], _postal_add, __alias);
        for (uint256 i = 0; i < _party_candidates.length; i++) {
            _newParty.addCandidate(candidates[_party_candidates[i]]);
            _newParty.addConstituencyCandidate(_party_candidates[i], _party_candidates_constituencies[i]);
        }
        parties[parties_count] = _newParty;
        console.log(
            '\n\n#### [ Party Added ] ################################# ' , bytes32ToString(parties[parties_count].name())
        );
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

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx HELPER xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
    
    function stringToBytes32(string memory str) public pure returns (bytes32 result) {
    
        bytes memory strBytes = bytes(str);
        assembly {
            result := mload(add(strBytes, 32))
        }
        return result;
    }
    
    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }

}
