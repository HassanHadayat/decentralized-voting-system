import Web3 from "web3";
class Web3Converter {

    static strToBytes1 = (str) => {
        var result = Web3.utils.asciiToHex(str);
        while (result.length < 4) { result += '0'; }
        if (result.length !== 4) { throw new Error("invalid web3 implicit bytes32"); }
        return result;
    };
    static strToBytes2 = (str) => {
      var result = Web3.utils.asciiToHex(str);
      while (result.length < 6) { result += '0'; }
      if (result.length !== 6) { throw new Error("invalid web3 implicit bytes32"); }
      return result;
    };
    static strToBytes3 = (str) => {
      var result = Web3.utils.asciiToHex(str);
      while (result.length < 8) { result += '0'; }
      if (result.length !== 8) { throw new Error("invalid web3 implicit bytes32"); }
      return result;
    };
    static strToBytes8 = (str) => {
      var result = Web3.utils.asciiToHex(str);
      while (result.length < 18) { result += '0'; }
      if (result.length !== 18) { throw new Error("invalid web3 implicit bytes32"); }
      return result;
    };
    static strToBytes12 = (str) => {
      var result = Web3.utils.asciiToHex(str);
      while (result.length < 26) { result += '0'; }
      if (result.length !== 26) { throw new Error("invalid web3 implicit bytes32"); }
      return result;
    };
    static strToBytes16 = (str) => {
      var result = Web3.utils.asciiToHex(str);
      while (result.length < 34) { result += '0'; }
      if (result.length !== 34) { throw new Error("invalid web3 implicit bytes32"); }
      return result;
    };
    static strToBytes32 = (str) => {
      var result = Web3.utils.asciiToHex(str);
      while (result.length < 66) { result += '0'; }
      if (result.length !== 66) { throw new Error("invalid web3 implicit bytes32"); }
      return result;
    };
  
    // // Return Promise
    // static getPromiseData = () => {
    //   return Promise.resolve({ name: "JsMount", id: 123 });
    // };
  }
  
  export default Web3Converter;