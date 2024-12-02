import React, { useState } from "react";
import Web3 from "web3";
import contractDetails from "../contractDetails";

const CreateModel = () => {
  // State variables for the form
  const [modelName, setModelName] = useState("");
  const [description, setDescription] = useState("");
  const [initialFraudScore, setInitialFraudScore] = useState("");
  const [initialVersion, setInitialVersion] = useState("");
  const [parameters, setParameters] = useState("");
  const [status, setStatus] = useState("");
  const [account, setAccount] = useState("");

  // Web3 and Contract Initialization
  let web3;
  let contract;

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(
      contractDetails.abi,
      contractDetails.contractAddress
    );
  }

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setStatus("Wallet connected successfully!");
    } catch (error) {
      setStatus(`Wallet connection failed: ${error.message}`);
    }
  };

  // Helper function to convert string to bytes32
  const toBytes32 = (str) => {
    return web3.utils.asciiToHex(str).padEnd(66, "0");
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!web3 || !contract) {
      setStatus("Web3 or contract instance not available.");
      return;
    }

    try {
      // Split parameters and convert to bytes32 format
      const parsedParameters = parameters
        .split(",")
        .map((param) => toBytes32(param.trim()));

      const response = await contract.methods
        .createModel(
          parseInt(initialFraudScore),
          parsedParameters,
          parseInt(initialVersion),
          toBytes32(modelName),
          toBytes32(description)
        )
        .send({ from: account });

      setStatus(`Model created successfully! Transaction: ${response.transactionHash}`);
    } catch (error) {
      setStatus(`Error creating model: ${error.message}`);
    }
  };

  // UI
  return (
    <div className="create-model-container">
      <h1>Create New Model</h1>
      {!account && (
        <button onClick={connectWallet} className="wallet-button">
          Connect Wallet
        </button>
      )}
      {account && <p>Connected Account: {account}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="modelName">Model Name:</label>
          <input
            type="text"
            id="modelName"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="initialFraudScore">Initial Fraud Score:</label>
          <input
            type="number"
            id="initialFraudScore"
            value={initialFraudScore}
            onChange={(e) => setInitialFraudScore(e.target.value)}
            min="0"
            max="100"
            required
          />
        </div>
        <div>
          <label htmlFor="initialVersion">Initial Version:</label>
          <input
            type="number"
            id="initialVersion"
            value={initialVersion}
            onChange={(e) => setInitialVersion(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="parameters">Parameters (comma-separated):</label>
          <input
            type="text"
            id="parameters"
            value={parameters}
            onChange={(e) => setParameters(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Create Model
        </button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default CreateModel;
