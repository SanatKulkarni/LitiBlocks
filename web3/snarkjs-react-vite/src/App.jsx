import React from "react";

function App() {
  const snarkjs = window.snarkjs; // Access SnarkJS from the window object

  const handleGenerateProof = async () => {
    try {
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        { a: 11, b: 3 }, // Inputs
        "/circuit.wasm", // WASM file path
        "/circuit.zkey" // ZKey file path
      );
      console.log("Proof:", proof);
      console.log("Public Signals:", publicSignals);
      alert("Proof generation successful! Check console for details.");
    } catch (error) {
      console.error("Error generating proof:", error);
      alert("Error generating proof. Check console for details.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>SnarkJS with Vite</h1>
      <button onClick={handleGenerateProof}>Generate Proof</button>
    </div>
  );
}

export default App;
