import Web3 from "web3";

// get web3 connection
async function GetWeb3() {

    let web3;

    // MetaMask 에 연결
    if (window.ethereum) {
        web3                =   new Web3(window.ethereum);
        await window.ethereum.enable();

    } else {
        // connect to local
        window.alert('메타마스크 연결을 확인해 주세요.')

    }
    
    return web3;
}

export default GetWeb3;