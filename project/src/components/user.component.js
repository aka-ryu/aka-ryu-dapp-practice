// import React, { useState } from "react";
// import GetWeb3 from "./web3.component";

// let web3;

// function User() {

//     //set params
//     const [ethBalance, setEthbalance]   =    useState("");
//     const [account, setAccount]         =    useState("");
    

//     async function getAccount() {
//         web3             =   await GetWeb3();
//         const accounts   =   await web3.eth.getAccounts();
//         setAccount(accounts[0]);
//     }

//     //get balance function
//     async function getBalance(){
//         // return in wei                     wei = 이더리움의 가장 작은 단위
//         const balance            =  await web3.eth.getBalance(account);
//         // convert wei to eth                fromWei 의 parameter 는 2개여야함. balance, unit=단위
//         const ethBalance         =  web3.utils.fromWei(balance.toString(), 'Ether')
//         setEthbalance(ethBalance);
//     }

    
//     getAccount();
//     getBalance() ;

//     return(
//         <div className="admin">
//                 <h3>Your Tab</h3>
//                 Adress    :   {account}<br/>
//                 balance   :   {ethBalance} ETH
//         </div>
//     )
// }

// export default User;