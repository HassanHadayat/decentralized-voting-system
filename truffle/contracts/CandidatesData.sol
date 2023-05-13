
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./CandidateManager.sol";
import "./Candidate.sol";

contract CandidatesData{
    uint public _cands_size;
    Candidate[] public _candidates;
    
    constructor()
    {
        _cands_size = 27;
        _candidates = new Candidate[](_cands_size);
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
            _candidates[i] = new Candidate(stringToBytes32(fullname[i]), age[i], stringToBytes1(gender[i]), stringToBytes16(cnic[i]), stringToBytes12(contact[i]), stringToBytes32(fathername[i]),stringToBytes32(p_add[i]),stringToBytes32(l_add[i]),stringToBytes32(province[i]));
        }   
    }
    function getCandidates() public view returns (Candidate[] memory) {
        return _candidates;
    }

    function stringToBytes1(string memory str) public pure returns (bytes1 result) {
    
        bytes memory strBytes = bytes(str);
        assembly {
            result := mload(add(strBytes, 1))
        }
        return result;
    }
    function stringToBytes8(string memory str) public pure returns (bytes8 result) {
    
        bytes memory strBytes = bytes(str);
        assembly {
            result := mload(add(strBytes, 8))
        }
        return result;
    }
    function stringToBytes12(string memory str) public pure returns (bytes12 result) {
    
        bytes memory strBytes = bytes(str);
        assembly {
            result := mload(add(strBytes, 12))
        }
        return result;
    }
    function stringToBytes16(string memory str) public pure returns (bytes16 result) {
    
        bytes memory strBytes = bytes(str);
        assembly {
            result := mload(add(strBytes, 16))
        }
        return result;
    }
    function stringToBytes32(string memory str) public pure returns (bytes32 result) {
    
        bytes memory strBytes = bytes(str);
        assembly {
            result := mload(add(strBytes, 32))
        }
        return result;
    }
}