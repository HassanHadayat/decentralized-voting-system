
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./PartyManager.sol";

contract PartiesData{
    uint public _parties_size;
    bytes16[] public pti_cands_cnics;
    bytes8[] public pti_cands_constituencies;
    bytes16[] public pmln_cands_cnics;
    bytes8[] public pmln_cands_constituencies;

    constructor()
    {
        _parties_size = 2;
            pti_cands_cnics = new bytes16[](14);
            pti_cands_constituencies = new bytes8[](14);

            pti_cands_cnics [0] = stringToBytes16("35202-8940855-0");
            pti_cands_cnics [1] = stringToBytes16("08681-6194585-8");
            pti_cands_cnics [2] = stringToBytes16("48004-7460006-6");
            pti_cands_cnics [3] = stringToBytes16("87392-1013158-5");
            pti_cands_cnics [4] = stringToBytes16("07548-1528037-7");
            pti_cands_cnics [5] = stringToBytes16("44702-5319205-5");
            pti_cands_cnics [6] = stringToBytes16("11748-8477808-2");
            pti_cands_cnics [7] = stringToBytes16("11016-3236873-0");
            pti_cands_cnics [8] = stringToBytes16("84367-8177738-4");
            pti_cands_cnics [9] = stringToBytes16("54074-1975073-2");
            pti_cands_cnics[10] = stringToBytes16("74267-7001613-0");
            pti_cands_cnics[11] = stringToBytes16("00911-4680350-2");
            pti_cands_cnics[12] = stringToBytes16("12213-5718928-6");
            pti_cands_cnics[13] = stringToBytes16("33451-0921622-6");

            pti_cands_constituencies [0] = stringToBytes8("NA-3");
            pti_cands_constituencies [1] = stringToBytes8("NA-1");
            pti_cands_constituencies [2] = stringToBytes8("PP-1");
            pti_cands_constituencies [3] = stringToBytes8("PP-1");
            pti_cands_constituencies [4] = stringToBytes8("PP-2");
            pti_cands_constituencies [5] = stringToBytes8("NA-2");
            pti_cands_constituencies [6] = stringToBytes8("PS-1");
            pti_cands_constituencies [7] = stringToBytes8("PS-2");
            pti_cands_constituencies [8] = stringToBytes8("NA-3");
            pti_cands_constituencies [9] = stringToBytes8("PK-1");
            pti_cands_constituencies[10] = stringToBytes8("PK-2");
            pti_cands_constituencies[11] = stringToBytes8("NA-4");
            pti_cands_constituencies[12] = stringToBytes8("PB-1");
            pti_cands_constituencies[13] = stringToBytes8("PB-2");



            pmln_cands_cnics = new bytes16[](13);
            pmln_cands_constituencies = new bytes8[](13);

            pmln_cands_cnics [0] = stringToBytes16("35202-8940855-1");
            pmln_cands_cnics [1] = stringToBytes16("85000-7971439-1");
            pmln_cands_cnics [2] = stringToBytes16("45190-2652702-7");
            pmln_cands_cnics [3] = stringToBytes16("71216-3506961-4");
            pmln_cands_cnics [4] = stringToBytes16("43149-3303504-3");
            pmln_cands_cnics [5] = stringToBytes16("98590-5688513-9");
            pmln_cands_cnics [6] = stringToBytes16("66020-1962335-7");
            pmln_cands_cnics [7] = stringToBytes16("87784-9502627-4");
            pmln_cands_cnics [8] = stringToBytes16("99264-8820363-4");
            pmln_cands_cnics [9] = stringToBytes16("26766-5629247-5");
            pmln_cands_cnics[10] = stringToBytes16("95363-6701830-1");
            pmln_cands_cnics[11] = stringToBytes16("38708-8321853-8");
            pmln_cands_cnics[12] = stringToBytes16("61080-1753354-9");

            pmln_cands_constituencies [0] = stringToBytes8("NA-1");
            pmln_cands_constituencies [1] = stringToBytes8("NA-1");
            pmln_cands_constituencies [2] = stringToBytes8("PP-1");
            pmln_cands_constituencies [3] = stringToBytes8("PP-2");
            pmln_cands_constituencies [4] = stringToBytes8("NA-2");
            pmln_cands_constituencies [5] = stringToBytes8("PS-1");
            pmln_cands_constituencies [6] = stringToBytes8("PS-2");
            pmln_cands_constituencies [7] = stringToBytes8("NA-3");
            pmln_cands_constituencies [8] = stringToBytes8("PK-1");
            pmln_cands_constituencies [9] = stringToBytes8("PK-2");
            pmln_cands_constituencies[10] = stringToBytes8("NA-4");
            pmln_cands_constituencies[11] = stringToBytes8("PB-1");
            pmln_cands_constituencies[12] = stringToBytes8("PB-2");
            
            
    }

    function getPTICandsCnics() public view returns (bytes16[] memory) {
        return pti_cands_cnics;
    }
    function getPTICandsConstituencies() public view returns (bytes8[] memory) {
        return pti_cands_constituencies;
    }
    function getPMLNCandsCnics() public view returns (bytes16[] memory) {
        return pmln_cands_cnics;
    }
    function getPMLNCandsConstituencies() public view returns (bytes8[] memory) {
        return pmln_cands_constituencies;
    }

    function stringToBytes1(string memory str) public pure returns (bytes1) {
        return bytes1(bytes(str));
    }
    function stringToBytes8(string memory str) public pure returns (bytes8) {    
        return bytes8(bytes(str));
    }
    
    function stringToBytes12(string memory str) public pure returns (bytes12) {
        return bytes12(bytes(str));
    }
    function stringToBytes16(string memory str) public pure returns (bytes16) {
        return bytes16(bytes(str));
    }
    function stringToBytes32(string memory str) public pure returns (bytes32) {
        return bytes32(bytes(str));
    }
}