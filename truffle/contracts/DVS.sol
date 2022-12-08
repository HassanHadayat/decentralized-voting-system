// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DVS {
    // USER
    struct User {
        string name; // user name
        bytes32 cnic; // hashed cnin
        bytes32 hashId; // login id
        address userAddress; // user wallet address
    }
    uint256 public usersCount;

    //   (hashed user cnic) => (user obj)
    mapping(bytes32 => User) public users;

    // VOTE
    struct Vote {
        uint256 voteId;
        bytes32 voterCnic;
        bytes32 candCnic;
    }
    // POLL
    struct Poll {
        string name;
        uint256 id;
        bool isActive;
        uint256 candidatesCount;
        bytes32[] candidatesCnic;
        uint256 votersCount;
        bytes32[] votersCnic;
        uint256 votesCount;
        //    (vote id) =>  (vote obj)
        mapping(uint256 => Vote) votes;
        //    (cand cnic) => (cand votes)
        mapping(bytes32 => uint256) candidateVotes;
    }

    uint256 public pollsCount;
    //   (poll id) =>  (poll obj)
    mapping(uint256 => Poll) public polls;

    constructor() {
        usersCount = 0; // initially 0 user
        pollsCount = 0; // initially 0 poll

        // registerUser("Hassan Hadayat", "111", "111");
        registerUser("Abdur Rafey", "222", "222");
        registerUser("Hashim Tayyab Shah", "333", "333");
        registerUser("Haroon Mahmood", "444", "444");
        registerUser("Umer Farooq", "555", "555");
        registerUser("Ali Bin Latif", "666", "666");
        registerUser("Saif Ullah", "777", "777");
        registerUser("Ali Amir", "888", "888");
        registerUser("Waqas Manzoor", "999", "999");

        // bytes32[] memory c = new bytes32[](2);
        // c[0] = 0x3535350000000000000000000000000000000000000000000000000000000000;
        // c[1] = 0x3434340000000000000000000000000000000000000000000000000000000000;

        // bytes32[] memory v = new bytes32[](3);
        // v[0] = 0x3333330000000000000000000000000000000000000000000000000000000000;
        // v[1] = 0x3232320000000000000000000000000000000000000000000000000000000000;
        // v[2] = 0x3131310000000000000000000000000000000000000000000000000000000000;

        // addPoll("poll-1", 2, c, 3, v);
        // addPoll("poll-2", 2, c, 3, v);
        // addPoll("poll-3", 2, c, 3, v);
        // addPoll("poll-4", 2, c, 3, v);
        // addPoll("poll-5", 2, c, 3, v);
        // addPoll("poll-6", 2, c, 3, v);
        // addPoll("poll-7", 2, c, 3, v);
    }

    // Register a User
    function registerUser(
        string memory _name,
        string memory _cnic,
        string memory _pass
    ) public {
        bytes32 hashedCnic = keccak256(abi.encodePacked(_cnic));
        // check user already registered or not
        bool isReg = false;
        for (uint256 i = 0; i < usersCount; i++) {
            if (users[hashedCnic].cnic == hashedCnic) {
                isReg = true;
                break;
            }
        }
        require(isReg == false);
        bytes32 hashedId = keccak256(abi.encodePacked(_cnic, _pass));
        users[hashedCnic].name = _name;
        users[hashedCnic].userAddress = msg.sender;
        users[hashedCnic].cnic = hashedCnic;
        users[hashedCnic].hashId = hashedId;
        usersCount++;
    }


    // function updateUserPass(string memory _cnic, string memory _currPass, string memory _newPass)public {
    //     bytes32 hashedCnic = hash(_cnic);
    //     bytes32 prehashedId = keccak256(abi.encodePacked(_cnic, _currPass));
    //     require(users[hashedCnic].hashId == prehashedId);


    //     bytes32 newhashedId = keccak256(abi.encodePacked(_cnic, _newPass));
    //     users[hashedCnic].cnic = hashedCnic;
    //     users[hashedCnic].hashId = newhashedId;
    // }


    // Signin User
    function signinUser(string memory _cnic, string memory _pass)
        public
        view
        returns (bool)
    {
        bytes32 hashedCnic = hash(_cnic);
        bytes32 hashedId = keccak256(abi.encodePacked(_cnic, _pass));

        if (users[hashedCnic].hashId == hashedId) return true;
        else return false;
    }

    // Add a Poll
    function addPoll(
        string memory _name,
        uint256 _candidatesCount,
        bytes32[] memory _candidatesCnic,
        uint256 _votersCount,
        bytes32[] memory _votersCnic
    ) public {
        // validate candidates
        bool validCandList = true;
        bytes32[] memory tempCandsCnic = new bytes32[](_candidatesCount);
        for (uint256 i = 0; i < _candidatesCount; i++) {
            bytes32 hashedCnic = hash(bytes32ToString(_candidatesCnic[i]));
            if (users[hashedCnic].cnic != hashedCnic) {
                validCandList = false;
                break;
            }
            tempCandsCnic[i] = users[hashedCnic].cnic;
        }

        // validate voters
        bool validVoterList = true;
        bytes32[] memory tempVotersCnic = new bytes32[](_votersCount);
        for (uint256 i = 0; i < _votersCount; i++) {
            bytes32 hashedCnic = hash(bytes32ToString(_votersCnic[i]));
            if (users[hashedCnic].cnic != hashedCnic) {
                validVoterList = false;
                break;
            }
            tempVotersCnic[i] = users[hashedCnic].cnic;
        }

        require(validCandList == true && validVoterList == true);

        polls[pollsCount].id = pollsCount;
        polls[pollsCount].name = _name;
        polls[pollsCount].candidatesCount = _candidatesCount;
        polls[pollsCount].candidatesCnic = tempCandsCnic;
        polls[pollsCount].votersCount = _votersCount;
        polls[pollsCount].votersCnic = tempVotersCnic;
        polls[pollsCount].votesCount = 0;
        polls[pollsCount].isActive = true;
        pollsCount++;
    }

    function getPollCands(uint256 _pollId)
        public
        view
        returns (bytes32[] memory)
    {
        return polls[_pollId].candidatesCnic;
    }

    function getUser(string memory _cnic) public view returns (User memory) {
        return users[hash(_cnic)];
    }

    function castVote(
        bytes32 _voterCnic,
        bytes32 _candCnic,
        uint256 pollId
    ) public {
        // validate voter
        bool validVoter = false;
        for (uint256 i = 0; i < polls[pollId].votersCount; i++) {
            if (polls[pollId].votersCnic[i] == _voterCnic) {
                validVoter = true;
                break;
            }
        }
        // validate candidate
        bool validCandidate = false;
        for (uint256 i = 0; i < polls[pollId].candidatesCount; i++) {
            if (polls[pollId].candidatesCnic[i] == _candCnic) {
                validCandidate = true;
                break;
            }
        }
        // validate vote
        bool validVote = true;
        for (uint256 i = 0; i < polls[pollId].votesCount; i++) {
            if (polls[pollId].votes[i].voterCnic == _voterCnic) {
                validVote = false;
                break;
            }
        }

        require(
            (pollId < pollsCount && pollId >= 0) &&
                validVoter == true &&
                validCandidate == true &&
                validVote == true
        );

        // Vote storage vote;
        polls[pollId].votes[polls[pollId].votesCount].voteId = polls[pollId].votesCount;
        polls[pollId].votes[polls[pollId].votesCount].voterCnic = _voterCnic;
        polls[pollId].votes[polls[pollId].votesCount].candCnic = _candCnic;
        polls[pollId].votesCount++;
        polls[pollId].candidateVotes[_candCnic] = polls[pollId].candidateVotes[_candCnic] + 1;

        if (polls[pollId].votesCount >= polls[pollId].votersCount) {
            polls[pollId].isActive = false;
        }

        // return polls[pollId].votes[polls[pollId].votesCount];
    }

    function getPollCandVotes(uint pollId, bytes32 _candCnic) public view returns(uint){
        return polls[pollId].candidateVotes[_candCnic];
    }
    
    function getVote(uint256 pollId) public view returns (Vote memory) {
        return polls[pollId].votes[polls[pollId].votesCount - 1];
    }

    // HELPER FUNCTIONS
    function hash(string memory _data) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_data));
    }

    function stringToBytes32(string memory _str)
        public
        pure
        returns (bytes32 result)
    {
        bytes memory _tempBytes = bytes(_str);
        if (_tempBytes.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(_str, 32))
        }
    }

    function bytes32ToString(bytes32 source)
        internal
        pure
        returns (string memory result)
    {
        uint8 length = 0;
        while (source[length] != 0 && length < 32) {
            length++;
        }
        assembly {
            result := mload(0x40)
            // new "memory end" including padding (the string isn't larger than 32 bytes)
            mstore(0x40, add(result, 0x40))
            // store length in memory
            mstore(result, length)
            // write actual data
            mstore(add(result, 0x20), source)
        }
    }
}
