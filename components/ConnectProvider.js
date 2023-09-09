import React, { createContext, useEffect, useState, useContext } from "react";
import abi from "./Escrow.json"
import { ethers } from "ethers";

const ConnectContext = createContext();
const CONTRACT_ADDRESS = "0xea3e1D27A82DC53a960741485b16F9893Ee3b6f1";
const contractABI = abi.abi;

export const useConnect = () => {
    return useContext(ConnectContext);
}

export default function ConnectProvider({ children }) {
    const [ ethereum, setEthereum ] = useState(null);
    const [ walletAddress, setWalletAddress ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ contract, setContract ] = useState(null);
    const [ error, setError ] = useState(null);

    async function connectWallet() {
        setLoading(true);
        setError("");
        if (ethereum) {
            try {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                console.log(accounts);
                setWalletAddress(accounts[ 0 ]);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                console.log(err);
            }
        }
    };

    async function getContract() {
        if (ethereum && walletAddress) {
            try {
                const provider = new ethers.BrowserProvider(ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
                setContract(contract);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                console.log(err);
            }
        }
    };

    useEffect(() => {
        getContract();
    }, [ walletAddress ]);

    useEffect(() => {
        if (window.ethereum) {
            setEthereum(window.ethereum);
        }
    }, []);


    return <ConnectContext.Provider value={{ walletAddress, connectWallet, error, loading, setLoading, ethereum, contract }}>
        {children}
    </ConnectContext.Provider>;
}