// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FederatedLearningModel11 {
    struct ModelData {
        uint256 fraudScore;
        bytes32[] parameters;
        uint256 timestamp;
        address sourceModel;
        uint256 modelVersion;
        string modelName;
        string description;
    }

    // State variables
    mapping(bytes32 => ModelData) public modelTransfers;
    mapping(address => bool) public authorizedModels;
    mapping(address => string) public modelNames;
    mapping(address => bytes32[]) private modelHistory;

    address public owner;
    bool public paused;
    uint256 public minFraudScore;
    uint256 public maxFraudScore;
    uint256 public minimumAcceptedFraudScore = 70;  // Fraud score threshold (70%)

    // Events
    event DataTransferred(bytes32 indexed transferId, address indexed sourceModel, uint256 fraudScore);
    event ModelAuthorized(address indexed modelAddress, string modelName);
    event ModelDeauthorized(address indexed modelAddress);
    event FraudScoreRangeUpdated(uint256 minScore, uint256 maxScore);
    event ContractPaused(bool isPaused);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event ModelNameUpdated(address indexed modelAddress, string newName);

    constructor() {
        owner = msg.sender;
        minFraudScore = 0;
        maxFraudScore = 100;
    }

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyAuthorizedModel() {
        require(authorizedModels[msg.sender], "Model not authorized");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    // Authorization Functions
    function authorizeModel(address modelAddress, string calldata modelName) external onlyOwner {
        require(!authorizedModels[modelAddress], "Model is already authorized");
        authorizedModels[modelAddress] = true;
        modelNames[modelAddress] = modelName;
        emit ModelAuthorized(modelAddress, modelName);
    }

    function deauthorizeModel(address modelAddress) external onlyOwner {
        require(authorizedModels[modelAddress], "Model is not authorized");
        authorizedModels[modelAddress] = false;
        emit ModelDeauthorized(modelAddress);
    }

    // Setter Functions
    function setOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
        emit ContractPaused(_paused);
    }

    function setFraudScoreRange(uint256 _min, uint256 _max) external onlyOwner {
        require(_min < _max, "Invalid range");
        minFraudScore = _min;
        maxFraudScore = _max;
        emit FraudScoreRangeUpdated(_min, _max);
    }

    function setModelName(address modelAddress, string calldata name) external onlyOwner {
        modelNames[modelAddress] = name;
        emit ModelNameUpdated(modelAddress, name);
    }

    // Getter Functions
    function getOwner() external view returns (address) {
        return owner;
    }

    function getPauseStatus() external view returns (bool) {
        return paused;
    }

    function getFraudScoreRange() external view returns (uint256 min, uint256 max) {
        return (minFraudScore, maxFraudScore);
    }

    function getModelName(address modelAddress) external view returns (string memory) {
        return modelNames[modelAddress];
    }

    function getModelDetails(address modelAddress) external view returns (
        bool isAuthorized,
        string memory name
    ) {
        return (authorizedModels[modelAddress], modelNames[modelAddress]);
    }

    // Core Transfer Function
    function transferModelData(
        uint256 _fraudScore,
        bytes32[] calldata _parameters,
        uint256 _modelVersion,
        string calldata _modelName,
        string calldata _description
    ) external onlyAuthorizedModel whenNotPaused returns (bytes32) {
        require(_parameters.length > 0, "Parameters cannot be empty");
        require(_fraudScore >= minFraudScore && _fraudScore <= maxFraudScore, 
                "Fraud score out of range");

        // Only allow data transfer if the fraud score is greater than or equal to 70
        require(_fraudScore >= minimumAcceptedFraudScore, "Fraud score is too low to transfer");

        bytes32 transferId = keccak256(
            abi.encodePacked(
                msg.sender,
                _fraudScore,
                _modelVersion,
                block.timestamp
            )
        );

        modelTransfers[transferId] = ModelData({
            fraudScore: _fraudScore,
            parameters: _parameters,
            timestamp: block.timestamp,
            sourceModel: msg.sender,
            modelVersion: _modelVersion,
            modelName: _modelName,
            description: _description
        });

        modelHistory[msg.sender].push(transferId);
        emit DataTransferred(transferId, msg.sender, _fraudScore);
        return transferId;
    }

    // Model Creation Function
    function createModel(
        uint256 _initialFraudScore,
        bytes32[] calldata _initialParameters,
        uint256 _initialVersion,
        string calldata _modelName,
        string calldata _description
    ) external {
        require(!authorizedModels[msg.sender], "Model already exists");
        require(bytes(_modelName).length > 0, "Model name cannot be empty");
        require(_initialParameters.length > 0, "Initial parameters cannot be empty");
        require(_initialFraudScore >= minFraudScore && _initialFraudScore <= maxFraudScore, 
                "Initial fraud score out of range");

        authorizedModels[msg.sender] = true;
        modelNames[msg.sender] = _modelName;

        bytes32 transferId = keccak256(
            abi.encodePacked(
                msg.sender,
                _initialFraudScore,
                _initialVersion,
                block.timestamp
            )
        );

        modelTransfers[transferId] = ModelData({
            fraudScore: _initialFraudScore,
            parameters: _initialParameters,
            timestamp: block.timestamp,
            sourceModel: msg.sender,
            modelVersion: _initialVersion,
            modelName: _modelName,
            description: _description
        });

        modelHistory[msg.sender].push(transferId);
        emit DataTransferred(transferId, msg.sender, _initialFraudScore);
        emit ModelAuthorized(msg.sender, _modelName);
    }

    // Query Functions
    function getModelData(bytes32 transferId) 
        external 
        view 
        onlyAuthorizedModel 
        returns (
            uint256 fraudScore,
            bytes32[] memory parameters,
            uint256 timestamp,
            address sourceModel,
            uint256 modelVersion,
            string memory modelName,
            string memory description
        ) 
    {
        ModelData storage data = modelTransfers[transferId];
        require(data.timestamp > 0, "Transfer does not exist");
        
        return (
            data.fraudScore,
            data.parameters,
            data.timestamp,
            data.sourceModel,
            data.modelVersion,
            data.modelName,
            data.description
        );
    }

    function getTransferHistory(address modelAddress) 
        external 
        view 
        returns (bytes32[] memory) 
    {
        return modelHistory[modelAddress];
    }

    function getLatestModelData(address modelAddress) 
        external 
        view 
        returns (
            uint256 fraudScore,
            uint256 timestamp,
            uint256 modelVersion,
            string memory modelName
        ) 
    {
        bytes32[] storage history = modelHistory[modelAddress];
        require(history.length > 0, "No transfers found");
        
        bytes32 latestTransferId = history[history.length - 1];
        ModelData storage latestData = modelTransfers[latestTransferId];
        
        return (
            latestData.fraudScore,
            latestData.timestamp,
            latestData.modelVersion,
            latestData.modelName
        );
    }
}
