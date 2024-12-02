// connectWallet.js
import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // MetaMask is available
  web3 = new Web3(window.ethereum);
} else {
  console.error('MetaMask is not installed!');
}

export const connectWallet = async () => {
  if (web3) {
    try {
      // Request accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      return accounts[0]; // Return the first wallet address
    } catch (error) {
      console.error('User denied wallet connection', error);
    }
  } else {
    console.error('Please install MetaMask!');
  }
};

export default web3;
