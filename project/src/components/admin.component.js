import React, { useState } from "react";
require('dotenv').config();
const Web3 = require('web3');

const Address    = process.env.REACT_APP_ADDRESS;
const RpcHttpUrl = "https://rinkeby.infura.io/v3/5e615f36ce9e48aebe567535a3fbbaab"
const web3       = new Web3(new Web3.providers.HttpProvider(RpcHttpUrl));


function Admin(props) {

    const [etherBalance, setEtherBalance] = useState("");

    async function getBalance(){
        const balance = await web3.eth.getBalance("0x6202E5Ad8FF6bf1B8002c49011127eadFf38dD88");

        const weiBalance = web3.utils.fromWei(balance, 'Ether');
        setEtherBalance(weiBalance);
    }
    getBalance();

    return(
        <div>
            <div className="hello">
                <h1>Welcome to DappBlocks!</h1>
            </div>
            <div className="admin">
                <h3>Admin Tab</h3>
                Adress    :   {Address}<br/>
                balance   :   {etherBalance} ETH
            </div>
        </div>
    )
}

export default Admin;