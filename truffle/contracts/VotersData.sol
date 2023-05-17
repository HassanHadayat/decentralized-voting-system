
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./VoterManager.sol";

contract VotersData{
    uint public _voters_size;
    bytes16[] public _cnics;
    bytes8[] public _na_list;
    bytes8[] public _pa_list;
        constructor()
        {
            _voters_size = 52;
            _cnics = new bytes16[](_voters_size);
            _na_list = new bytes8[](_voters_size);
            _pa_list = new bytes8[](_voters_size);
            
                
            _cnics[0] = stringToBytes16("91661-5856424-9");
            _cnics[1] = stringToBytes16("20432-7898875-3"); 
            _cnics[2] = stringToBytes16("52054-4934571-0"); 
            _cnics[3] = stringToBytes16("75187-9686504-4"); 
            _cnics[4] = stringToBytes16("23058-0853315-3"); 
            _cnics[5] = stringToBytes16("94270-3698369-5"); 
            _cnics[6] = stringToBytes16("02358-0795946-3"); 
            _cnics[7] = stringToBytes16("89007-4155314-4"); 
            _cnics[8] = stringToBytes16("13455-6132989-6"); 
            _cnics[9] = stringToBytes16("57899-8953180-1"); 
            _cnics[10] = stringToBytes16("86352-6954872-4"); 
            _cnics[11] = stringToBytes16("26108-0978997-5"); 
            _cnics[12] = stringToBytes16("31002-0286283-2"); 
            _cnics[13] = stringToBytes16("12966-5046393-6"); 
            _cnics[14] = stringToBytes16("09873-9482546-9"); 
            _cnics[15] = stringToBytes16("20354-3999622-5"); 
            _cnics[16] = stringToBytes16("10963-5540940-1"); 
            _cnics[17] = stringToBytes16("00344-0872804-0"); 
            _cnics[18] = stringToBytes16("51488-7885357-6"); 
            _cnics[19] = stringToBytes16("39295-8830137-7"); 
            _cnics[20] = stringToBytes16("68393-1058733-0"); 
            _cnics[21] = stringToBytes16("60803-5201855-2"); 
            _cnics[22] = stringToBytes16("27679-1653865-0"); 
            _cnics[23] = stringToBytes16("38967-1186868-7"); 
            _cnics[24] = stringToBytes16("05113-2011715-3"); 
            _cnics[25] = stringToBytes16("08681-6194585-8"); 
            _cnics[26] = stringToBytes16("85000-7971439-1"); 
            _cnics[27] = stringToBytes16("48004-7460006-6"); 
            _cnics[28] = stringToBytes16("87392-1013158-5"); 
            _cnics[29] = stringToBytes16("45190-2652702-7"); 
            _cnics[30] = stringToBytes16("71216-3506961-4"); 
            _cnics[31] = stringToBytes16("07548-1528037-7"); 
            _cnics[32] = stringToBytes16("44702-5319205-5"); 
            _cnics[33] = stringToBytes16("43149-3303504-3"); 
            _cnics[34] = stringToBytes16("11748-8477808-2"); 
            _cnics[35] = stringToBytes16("98590-5688513-9"); 
            _cnics[36] = stringToBytes16("11016-3236873-0"); 
            _cnics[37] = stringToBytes16("66020-1962335-7"); 
            _cnics[38] = stringToBytes16("84367-8177738-4"); 
            _cnics[39] = stringToBytes16("87784-9502627-4");             
            _cnics[40] = stringToBytes16("54074-1975073-2"); 
            _cnics[41] = stringToBytes16("99264-8820363-4"); 
            _cnics[42] = stringToBytes16("74267-7001613-0"); 
            _cnics[43] = stringToBytes16("26766-5629247-5"); 
            _cnics[44] = stringToBytes16("00911-4680350-2"); 
            _cnics[45] = stringToBytes16("95363-6701830-1"); 
            _cnics[46] = stringToBytes16("12213-5718928-6"); 
            _cnics[47] = stringToBytes16("38708-8321853-8"); 
            _cnics[48] = stringToBytes16("33451-0921622-6"); 
            _cnics[49] = stringToBytes16("61080-1753354-9"); 
            
            _na_list[0] = stringToBytes8("NA-1"); 
            _na_list[1] = stringToBytes8("NA-1"); 
            _na_list[2] = stringToBytes8("NA-1"); 
            _na_list[3] = stringToBytes8("NA-1"); 
            _na_list[4] = stringToBytes8("NA-1"); 
            _na_list[5] = stringToBytes8("NA-1"); 
            _na_list[6] = stringToBytes8("NA-1"); 
            _na_list[7] = stringToBytes8("NA-1"); 
            _na_list[8] = stringToBytes8("NA-1"); 
            _na_list[9] = stringToBytes8("NA-1"); 
            _na_list[10] = stringToBytes8("NA-2");
            _na_list[11] = stringToBytes8("NA-2");
            _na_list[12] = stringToBytes8("NA-2");
            _na_list[13] = stringToBytes8("NA-2");
            _na_list[14] = stringToBytes8("NA-2");
            _na_list[15] = stringToBytes8("NA-2");
            _na_list[16] = stringToBytes8("NA-2");
            _na_list[17] = stringToBytes8("NA-2");
            _na_list[18] = stringToBytes8("NA-2");
            _na_list[19] = stringToBytes8("NA-2");
            _na_list[20] = stringToBytes8("NA-3");
            _na_list[21] = stringToBytes8("NA-3");
            _na_list[22] = stringToBytes8("NA-3");
            _na_list[23] = stringToBytes8("NA-3");
            _na_list[24] = stringToBytes8("NA-3");
            _na_list[25] = stringToBytes8("NA-3");
            _na_list[26] = stringToBytes8("NA-3");
            _na_list[27] = stringToBytes8("NA-3");
            _na_list[28] = stringToBytes8("NA-3");
            _na_list[29] = stringToBytes8("NA-3");
            _na_list[30] = stringToBytes8("NA-3");
            _na_list[31] = stringToBytes8("NA-4");
            _na_list[32] = stringToBytes8("NA-4");
            _na_list[33] = stringToBytes8("NA-4");
            _na_list[34] = stringToBytes8("NA-4");
            _na_list[35] = stringToBytes8("NA-4");
            _na_list[36] = stringToBytes8("NA-4");
            _na_list[37] = stringToBytes8("NA-4");
            _na_list[38] = stringToBytes8("NA-4");
            _na_list[39] = stringToBytes8("NA-4");            
            _na_list[40] = stringToBytes8("NA-4");
            _na_list[41] = stringToBytes8("NA-1");
            _na_list[42] = stringToBytes8("NA-1");
            _na_list[43] = stringToBytes8("NA-1");
            _na_list[44] = stringToBytes8("NA-1");
            _na_list[45] = stringToBytes8("NA-1");
            _na_list[46] = stringToBytes8("NA-1");
            _na_list[47] = stringToBytes8("NA-1");
            _na_list[48] = stringToBytes8("NA-1");
            _na_list[49] = stringToBytes8("NA-1");
            
            _pa_list[0] = stringToBytes8("PP-1");
            _pa_list[1] = stringToBytes8("PP-1");
            _pa_list[2] = stringToBytes8("PP-1");
            _pa_list[3] = stringToBytes8("PP-1");
            _pa_list[4] = stringToBytes8("PP-1");
            _pa_list[5] = stringToBytes8("PP-2");
            _pa_list[6] = stringToBytes8("PP-2");
            _pa_list[7] = stringToBytes8("PP-2");
            _pa_list[8] = stringToBytes8("PP-2");
            _pa_list[9] = stringToBytes8("PP-2");
            _pa_list[10] = stringToBytes8("PS-1");
            _pa_list[11] = stringToBytes8("PS-1");
            _pa_list[12] = stringToBytes8("PS-1");
            _pa_list[13] = stringToBytes8("PS-1");
            _pa_list[14] = stringToBytes8("PS-1");
            _pa_list[15] = stringToBytes8("PS-2");
            _pa_list[16] = stringToBytes8("PS-2");
            _pa_list[17] = stringToBytes8("PS-2");
            _pa_list[18] = stringToBytes8("PS-2");
            _pa_list[19] = stringToBytes8("PS-2");
            _pa_list[20] = stringToBytes8("PK-1");
            _pa_list[21] = stringToBytes8("PK-1");
            _pa_list[22] = stringToBytes8("PK-1");
            _pa_list[23] = stringToBytes8("PK-1");
            _pa_list[24] = stringToBytes8("PK-1");
            _pa_list[25] = stringToBytes8("PK-2");
            _pa_list[26] = stringToBytes8("PK-2");
            _pa_list[27] = stringToBytes8("PK-2");
            _pa_list[28] = stringToBytes8("PK-2");
            _pa_list[29] = stringToBytes8("PK-2");
            _pa_list[30] = stringToBytes8("PB-2");
            _pa_list[31] = stringToBytes8("PB-1");
            _pa_list[32] = stringToBytes8("PB-1");
            _pa_list[33] = stringToBytes8("PB-1");
            _pa_list[34] = stringToBytes8("PB-1");
            _pa_list[35] = stringToBytes8("PB-1");
            _pa_list[36] = stringToBytes8("PB-2");
            _pa_list[37] = stringToBytes8("PB-2");
            _pa_list[38] = stringToBytes8("PB-2");
            _pa_list[39] = stringToBytes8("PB-2");
            _pa_list[40] = stringToBytes8("PB-2");
            _pa_list[41] = stringToBytes8("PP-1");
            _pa_list[42] = stringToBytes8("PP-1");
            _pa_list[43] = stringToBytes8("PP-1");
            _pa_list[44] = stringToBytes8("PP-1");
            _pa_list[45] = stringToBytes8("PP-2");
            _pa_list[46] = stringToBytes8("PP-2");
            _pa_list[47] = stringToBytes8("PP-2");
            _pa_list[48] = stringToBytes8("PP-2");
            _pa_list[49] = stringToBytes8("PP-2");
            // Parties Chairmans
            // Imran Khan
            _cnics[50] = stringToBytes16("35202-8940855-0");
            _na_list[50] = stringToBytes8("NA-3");
            _pa_list[50] = stringToBytes8("PK-1");
            // Shehbaz Sharif
            _cnics[51] = stringToBytes16("35202-8940855-1");
            _na_list[51] = stringToBytes8("NA-1");
            _pa_list[51] = stringToBytes8("PP-1");
            
            // addVoterConstituencies(_voters);
        }
    function getCnics() public view returns(bytes16[] memory) {
        return _cnics;
    }
    function getNAList() public view returns(bytes8[] memory) {
        return _na_list;
    }
    function getPAList() public view returns(bytes8[] memory) {
        return _pa_list;
    }

    function stringToBytes8(string memory str) public pure returns (bytes8) {    
        return bytes8(bytes(str));
    }
    
    function stringToBytes16(string memory str) public pure returns (bytes16) {
        return bytes16(bytes(str));
    }
    
}