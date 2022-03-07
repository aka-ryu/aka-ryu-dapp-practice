import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import erc20Abi from "../erc20Abi";

require('dotenv').config();
const rinkeby = process.env.REACT_APP_RPC_HTTPURL;
const adminAddress = "0xE33f5e0C73B19C13F873AC9Ccf1e17F4735cD2FE";
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(rinkeby));
const tokenAddress = "0xbe0b410145b38943c504ee0d0afb23e7c7ad3840";
const rttk = new web3.eth.Contract(erc20Abi, tokenAddress);
const PrivateKey  = "fede98b63377aa7ba0ad8301a58bc5e8f7762318e34c96293fc197f0cddab6c9";




function Admin(props) {

    const [adminEtherBalance, setAdminEtherBalance] = useState("");
    const [adminRttkBalance, setAdminRttkBalace] = useState("");
    const [userEtherBalance, setUserEtherBalance] = useState("unknown");
    const [userRttkBalance, setUserRttkBalance] = useState("unknown");
    const [userConnect, setUserConnect] = useState("Click => Connect Your MetaMask");
    const [userWallet, setUserWallet] = useState("");
    const transferValue = 1;

    async function getAdminWallet() {
        const etherBalance = await web3.eth.getBalance(adminAddress);
        const toWei = web3.utils.fromWei(etherBalance, 'Ether');
        setAdminEtherBalance(toWei);

        rttk.methods.balanceOf(adminAddress).call()
            .then(function (bal){
                const format = bal / 100;
                setAdminRttkBalace(format);
            });
        
    }

    const connectUserWallet = async () => {
        if(window.ethereum) {
            
            const accounts = await window.ethereum.request({method: 'eth_accounts'});
            const chainId = await window.ethereum.request({method: 'eth_chainId'});

            const userAddress = accounts[0];

            if (userAddress == null) {
                window.alert('Please check for Metamask');
                return <Redirect to='/'></Redirect>
            }

            if(chainId !== '0x4'){
                window.alert("please connect to 'Rinkeby network' on Metamask , and try again");

            } else {

                setUserConnect(userAddress);
                setUserWallet(userAddress);

                const etherBalance = await web3.eth.getBalance(userAddress);
                const toWei = web3.utils.fromWei(etherBalance, 'Ether');
                setUserEtherBalance(toWei)

                rttk.methods.balanceOf(userAddress).call()
                    .then(function (bal){
                        const format = bal / 100;
                        setUserRttkBalance(format);
                    });
            }
        } else {
            setUserConnect("Please check for MetaMask")
        }
    }
    
    async function transfer() {
        // const nonce = await web3.eth.getTransactionCount(adminAddress);
        // const data = rttk.methods.transfer(userWallet, transferValue).encodeABI();
        // const transaction = {
        //     'from' : adminAddress,
        //     'gasPrice': 20000000000,
        //     'gasLimit': 78499,
        //     'value' : "0x0",
        //     'to' : userWallet,
        //     'data' : data,
        // }

        // const signTrx = await web3.eth.sendSignedTransaction(transaction, PrivateKey.toString("hex"));

        // web3.eth.sendSignedTransaction(signTrx.rawTransaction, function(err, hash){
        //     if(err) {
            
        //         window.alert("fail");
        //     } else if(hash) {
        //         console.log(hash);
        //         window.alert("succes");
        //     }
        // })
        const nonce = web3.eth.getTransactionCount(adminAddress);
        const data = rttk.methods.transfer(userWallet, 100).encodeABI();
        const tx = {
            from : adminAddress,
            to: tokenAddress,
            gas: 2000000,
            value : 0x0,
            data : data
        };

        const signed = await web3.eth.accounts.signTransaction(tx, `0x${PrivateKey.toString("hex")}`);

        await web3.eth.sendSignedTransaction(signed.rawTransaction)

        try{
            let res = await rttk.methods.transfer(userWallet, 100).send({
                'from': adminAddress,
                'gasPrice': 20000000000,
                'gasLimit': 100000,
            });
            console.log(res);
        }
        catch(e){
            console.log(e);
        }
    }



    // 10.15852932771304092
    // 10.15809788771304092 

    getAdminWallet();
    return(
        <div>
            <h3>This is Ryu's Dapp</h3><br/>
            <div className="admintab">
                <h4>Admin Tab</h4>
                <p>Admin Wallet  :  <strong>0xE33f5e0C73B19C13F873AC9Ccf1e17F4735cD2FE</strong></p>
                <p>Ether balance :  <strong>{adminEtherBalance} ETH</strong></p>
                <p>Rttk balance  : <strong>{adminRttkBalance} RTTK</strong></p>
            </div>
            <br></br>
            <div>
                <h4>User Tab</h4>
                <p>(Connect MetaMask First)</p> 
                <p>Your Wallet : <button onClick = {connectUserWallet}>{userConnect}</button></p>
                <p>Ether balance :  <strong>{userEtherBalance} ETH</strong></p>
                <p>Rttk balance  : <strong>{userRttkBalance} RTTK</strong></p>
            </div>
            <br></br>
            <div>
                <h4>Do you want some RTTK Token?</h4>
                <p>
                    Click the submit! <br/>
                    Then, you get 1RTTK
                </p>
                <button type="submit" onClick={() => transfer()}>submit</button>
            </div>
        </div>
    )
}

export default Admin;