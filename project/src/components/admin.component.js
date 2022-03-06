import React, { useState } from "react";
import erc20Abi from '../erc20Abi';
require('dotenv').config();

const Web3 = require('web3');
const rAbi = erc20Abi;
const RyuTokenAddress = process.env.RYU_TOKKEN_ADDRESS;
const Address    = process.env.REACT_APP_ADDRESS;
const RpcHttpUrl = "https://rinkeby.infura.io/v3/5e615f36ce9e48aebe567535a3fbbaab"
const web3       = new Web3(new Web3.providers.HttpProvider(RpcHttpUrl));
const Contract = require('web3-eth-contract');
const contract = new Contract(rAbi, RyuTokenAddress)


function Admin(props) {

    const [etherBalance, setEtherBalance] = useState("");
    const [rBalance, setrBalance] = useState("");

    async function etgetBalance(){
        const etbalance = await web3.eth.getBalance(Address);

        const weiBalance = web3.utils.fromWei(etbalance, 'Ether');
        setEtherBalance(weiBalance);
    }

    async function rGetBalance(){
        const rBalance = await contract.methods.balanceOf(Address).call();
        const format = web3.utils.fromWei(rBalance);
        setrBalance(format);
    }

    etgetBalance();
    rGetBalance();

    return(
        <div>
            <div className="hello">
                <h1>Welcome to DappBlocks!</h1>
            </div>
            <div className="admin">
                <h3>Admin Tab</h3>
                Adress    :   {Address}<br/>
                balance   :   {etherBalance} ETH <br/>
                balance   :   {rBalance} RYU
            </div>
        </div>
    )
}

export default Admin;