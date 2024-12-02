// contractDetails.js

const contractDetails = {
    contractAddress: "0x0Ed49701f8F69A3f4B00A71749680CB26f06C02E", // Replace with your deployed contract address
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "bool",
            name: "isPaused",
            type: "bool",
          },
        ],
        name: "ContractPaused",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "transferId",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sourceModel",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "fraudScore",
            type: "uint256",
          },
        ],
        name: "DataTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "minScore",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "maxScore",
            type: "uint256",
          },
        ],
        name: "FraudScoreRangeUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "modelAddress",
            type: "address",
          },
          {
            indexed: false,
            internalType: "string",
            name: "modelName",
            type: "string",
          },
        ],
        name: "ModelAuthorized",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "modelAddress",
            type: "address",
          },
        ],
        name: "ModelDeauthorized",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "modelAddress",
            type: "address",
          },
          {
            indexed: false,
            internalType: "string",
            name: "newName",
            type: "string",
          },
        ],
        name: "ModelNameUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "modelAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "modelName",
            type: "string",
          },
        ],
        name: "authorizeModel",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "authorizedModels",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_initialFraudScore",
            type: "uint256",
          },
          {
            internalType: "bytes32[]",
            name: "_initialParameters",
            type: "bytes32[]",
          },
          {
            internalType: "uint256",
            name: "_initialVersion",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_modelName",
            type: "string",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
        ],
        name: "createModel",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "modelAddress",
            type: "address",
          },
        ],
        name: "deauthorizeModel",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getFraudScoreRange",
        outputs: [
          {
            internalType: "uint256",
            name: "min",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "max",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "modelAddress",
            type: "address",
          },
        ],
        name: "getLatestModelData",
        outputs: [
          {
            internalType: "uint256",
            name: "fraudScore",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "modelVersion",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "modelName",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "transferId",
            type: "bytes32",
          },
        ],
        name: "getModelData",
        outputs: [
          {
            internalType: "uint256",
            name: "fraudScore",
            type: "uint256",
          },
          {
            internalType: "bytes32[]",
            name: "parameters",
            type: "bytes32[]",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "sourceModel",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "modelVersion",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "modelName",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "modelAddress",
            type: "address",
          },
        ],
        name: "getModelDetails",
        outputs: [
          {
            internalType: "bool",
            name: "isAuthorized",
            type: "bool",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "modelAddress",
            type: "address",
          },
        ],
        name: "getModelName",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getOwner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getPauseStatus",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "modelAddress",
            type: "address",
          },
        ],
        name: "getTransferHistory",
        outputs: [
          {
            internalType: "bytes32[]",
            name: "",
            type: "bytes32[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maxFraudScore",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "minFraudScore",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "minimumAcceptedFraudScore",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "modelNames",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        name: "modelTransfers",
        outputs: [
          {
            internalType: "uint256",
            name: "fraudScore",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "sourceModel",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "modelVersion",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "modelName",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "paused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_min",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_max",
            type: "uint256",
          },
        ],
        name: "setFraudScoreRange",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "modelAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
        ],
        name: "setModelName",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "setOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bool",
            name: "_paused",
            type: "bool",
          },
        ],
        name: "setPaused",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_fraudScore",
            type: "uint256",
          },
          {
            internalType: "bytes32[]",
            name: "_parameters",
            type: "bytes32[]",
          },
          {
            internalType: "uint256",
            name: "_modelVersion",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_modelName",
            type: "string",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
        ],
        name: "transferModelData",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ]
    };

    export default contractDetails;
      
  