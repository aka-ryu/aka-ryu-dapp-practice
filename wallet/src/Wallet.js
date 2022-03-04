import {React, useState, useEffect} from "react";
import { ethers } from "ethers";
import styles from './Wallet.module.css';
import simple_token_abi from './Contracts/simple_token_abi.json';
import Interactions from './Interactions';



function Wallet() {

    const contractAddress = "0xC1A7cD7cEcE7BF024c15525a6d0785f53E78c71E";
    const [tokenName, setTokenName]             = useState("Token");
    const [connButtonText, setConnButtonTest]   = useState("Connect Wallet");
    const [errorMessage, setErrorMessage]       = useState("");
    const [defaultAccount, setDefaultAccount]   = useState("");
    const [balance, setBalance]                 = useState("");

    const [provider, setProvider]               = useState("");
    const [signer, setSigner]                   = useState("");
    const [contract, setContrat]                = useState("");

    function connectWalletHandler() {
        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0]);
                setConnButtonTest('Wallet Connected');
            })
            .catch(error=>{
                setErrorMessage(error.message);
            })

        } else {
            console.log('need to install metamask');
            setErrorMessage('Please install MetaMask');
        }
    };

    const accountChangedHandler = (newAddress) => {
        setDefaultAccount(newAddress);
        updateEthers();
    }

    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ertherum);
        let tempSigner = tempProvider.getSigner();
        let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner);

        setProvider(tempProvider);
        setSigner(tempSigner);
        setContrat(tempContract);
    }

    useEffect(() => {

    }, [c])

    return (
        <div>
            <h2>{tokenName + "ERC-20 Wallet"}</h2>
            <button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>

            <div className={styles.walletCard}>
                <div>
                    <h3>Address: {defaultAccount}</h3>
                </div>
                <div>
                    <h3>{tokenName} Balance: {balance}</h3>
                </div>
            </div>
            {errorMessage}
        </div>
    )
}

export default Wallet;