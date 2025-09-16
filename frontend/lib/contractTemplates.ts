export interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  category: 'token' | 'nft' | 'defi' | 'dao' | 'game' | 'utility';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  abi: any[];
  bytecode?: string;
  sourceCode: string;
  constructorParams: {
    name: string;
    type: string;
    description: string;
    required: boolean;
    defaultValue?: any;
  }[];
  deploymentCost: {
    ethereum: string;
    polygon: string;
    bsc: string;
  };
}

export const CONTRACT_TEMPLATES: ContractTemplate[] = [
  {
    id: 'erc20-basic',
    name: 'Basic ERC20 Token',
    description: 'Simple ERC20 token with basic transfer functionality',
    category: 'token',
    difficulty: 'beginner',
    tags: ['ERC20', 'Token', 'Basic'],
    abi: [
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function totalSupply() view returns (uint256)',
      'function balanceOf(address owner) view returns (uint256)',
      'function transfer(address to, uint256 amount) returns (bool)',
      'function transferFrom(address from, address to, uint256 amount) returns (bool)',
      'function approve(address spender, uint256 amount) returns (bool)',
      'function allowance(address owner, address spender) view returns (uint256)',
      'event Transfer(address indexed from, address indexed to, uint256 value)',
      'event Approval(address indexed owner, address indexed spender, uint256 value)'
    ],
    sourceCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BasicERC20 {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * 10**decimals;
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    function approve(address spender, uint256 amount) public returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
        
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        
        emit Transfer(from, to, amount);
        return true;
    }
}`,
    constructorParams: [
      {
        name: 'name',
        type: 'string',
        description: 'Token name (e.g., "My Token")',
        required: true
      },
      {
        name: 'symbol',
        type: 'string',
        description: 'Token symbol (e.g., "MTK")',
        required: true
      },
      {
        name: 'totalSupply',
        type: 'uint256',
        description: 'Total supply of tokens (without decimals)',
        required: true,
        defaultValue: 1000000
      }
    ],
    deploymentCost: {
      ethereum: '0.05',
      polygon: '0.001',
      bsc: '0.005'
    }
  },
  {
    id: 'erc721-nft',
    name: 'Basic NFT Collection',
    description: 'Simple ERC721 NFT contract with minting functionality',
    category: 'nft',
    difficulty: 'intermediate',
    tags: ['ERC721', 'NFT', 'Collection'],
    abi: [
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function tokenURI(uint256 tokenId) view returns (string)',
      'function balanceOf(address owner) view returns (uint256)',
      'function ownerOf(uint256 tokenId) view returns (address)',
      'function mint(address to, string memory uri) returns (uint256)',
      'function transferFrom(address from, address to, uint256 tokenId)',
      'function approve(address to, uint256 tokenId)',
      'function setApprovalForAll(address operator, bool approved)',
      'function getApproved(uint256 tokenId) view returns (address)',
      'function isApprovedForAll(address owner, address operator) view returns (bool)',
      'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
      'event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)',
      'event ApprovalForAll(address indexed owner, address indexed operator, bool approved)'
    ],
    sourceCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BasicNFT {
    string public name;
    string public symbol;
    uint256 private _tokenId;
    address public owner;
    
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    mapping(uint256 => string) private _tokenURIs;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        owner = msg.sender;
    }
    
    function balanceOf(address tokenOwner) public view returns (uint256) {
        require(tokenOwner != address(0), "Invalid address");
        return _balances[tokenOwner];
    }
    
    function ownerOf(uint256 tokenId) public view returns (address) {
        address tokenOwner = _owners[tokenId];
        require(tokenOwner != address(0), "Token does not exist");
        return tokenOwner;
    }
    
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_owners[tokenId] != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }
    
    function mint(address to, string memory uri) public onlyOwner returns (uint256) {
        require(to != address(0), "Invalid address");
        
        _tokenId++;
        uint256 newTokenId = _tokenId;
        
        _owners[newTokenId] = to;
        _balances[to]++;
        _tokenURIs[newTokenId] = uri;
        
        emit Transfer(address(0), to, newTokenId);
        return newTokenId;
    }
    
    function approve(address to, uint256 tokenId) public {
        address tokenOwner = ownerOf(tokenId);
        require(to != tokenOwner, "Cannot approve to current owner");
        require(msg.sender == tokenOwner || isApprovedForAll(tokenOwner, msg.sender), "Not authorized");
        
        _tokenApprovals[tokenId] = to;
        emit Approval(tokenOwner, to, tokenId);
    }
    
    function getApproved(uint256 tokenId) public view returns (address) {
        require(_owners[tokenId] != address(0), "Token does not exist");
        return _tokenApprovals[tokenId];
    }
    
    function setApprovalForAll(address operator, bool approved) public {
        require(operator != msg.sender, "Cannot approve to self");
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }
    
    function isApprovedForAll(address tokenOwner, address operator) public view returns (bool) {
        return _operatorApprovals[tokenOwner][operator];
    }
    
    function transferFrom(address from, address to, uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not authorized");
        require(from == ownerOf(tokenId), "From address is not owner");
        require(to != address(0), "Invalid to address");
        
        _tokenApprovals[tokenId] = address(0);
        _balances[from]--;
        _balances[to]++;
        _owners[tokenId] = to;
        
        emit Transfer(from, to, tokenId);
    }
    
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address tokenOwner = ownerOf(tokenId);
        return (spender == tokenOwner || getApproved(tokenId) == spender || isApprovedForAll(tokenOwner, spender));
    }
}`,
    constructorParams: [
      {
        name: 'name',
        type: 'string',
        description: 'NFT collection name',
        required: true
      },
      {
        name: 'symbol',
        type: 'string',
        description: 'NFT collection symbol',
        required: true
      }
    ],
    deploymentCost: {
      ethereum: '0.08',
      polygon: '0.002',
      bsc: '0.008'
    }
  },
  {
    id: 'simple-staking',
    name: 'Simple Staking Contract',
    description: 'Basic staking contract with rewards mechanism',
    category: 'defi',
    difficulty: 'advanced',
    tags: ['Staking', 'DeFi', 'Rewards'],
    abi: [
      'function stakingToken() view returns (address)',
      'function rewardToken() view returns (address)',
      'function rewardRate() view returns (uint256)',
      'function totalStaked() view returns (uint256)',
      'function balanceOf(address account) view returns (uint256)',
      'function earned(address account) view returns (uint256)',
      'function stake(uint256 amount)',
      'function withdraw(uint256 amount)',
      'function getReward()',
      'function exit()',
      'event Staked(address indexed user, uint256 amount)',
      'event Withdrawn(address indexed user, uint256 amount)',
      'event RewardPaid(address indexed user, uint256 reward)'
    ],
    sourceCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract SimpleStaking {
    IERC20 public stakingToken;
    IERC20 public rewardToken;
    
    address public owner;
    uint256 public rewardRate; // Reward tokens per second
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;
    uint256 public totalStaked;
    
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public balances;
    
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }
    
    constructor(
        address _stakingToken,
        address _rewardToken,
        uint256 _rewardRate
    ) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        rewardRate = _rewardRate;
        owner = msg.sender;
        lastUpdateTime = block.timestamp;
    }
    
    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        return rewardPerTokenStored + (
            (block.timestamp - lastUpdateTime) * rewardRate * 1e18 / totalStaked
        );
    }
    
    function earned(address account) public view returns (uint256) {
        return (balances[account] * (rewardPerToken() - userRewardPerTokenPaid[account]) / 1e18) + rewards[account];
    }
    
    function stake(uint256 amount) external updateReward(msg.sender) {
        require(amount > 0, "Cannot stake 0");
        
        totalStaked += amount;
        balances[msg.sender] += amount;
        
        stakingToken.transferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }
    
    function withdraw(uint256 amount) public updateReward(msg.sender) {
        require(amount > 0, "Cannot withdraw 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        totalStaked -= amount;
        balances[msg.sender] -= amount;
        
        stakingToken.transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }
    
    function getReward() public updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardToken.transfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }
    
    function exit() external {
        withdraw(balances[msg.sender]);
        getReward();
    }
    
    function setRewardRate(uint256 _rewardRate) external onlyOwner updateReward(address(0)) {
        rewardRate = _rewardRate;
    }
    
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}`,
    constructorParams: [
      {
        name: 'stakingToken',
        type: 'address',
        description: 'Address of the token to be staked',
        required: true
      },
      {
        name: 'rewardToken',
        type: 'address',
        description: 'Address of the reward token',
        required: true
      },
      {
        name: 'rewardRate',
        type: 'uint256',
        description: 'Reward tokens per second',
        required: true,
        defaultValue: 1000000000000000000 // 1 token per second
      }
    ],
    deploymentCost: {
      ethereum: '0.12',
      polygon: '0.003',
      bsc: '0.01'
    }
  },
  {
    id: 'multisig-wallet',
    name: 'Multi-Signature Wallet',
    description: 'Secure wallet requiring multiple signatures for transactions',
    category: 'utility',
    difficulty: 'advanced',
    tags: ['MultiSig', 'Security', 'Wallet'],
    abi: [
      'function owners(uint256) view returns (address)',
      'function required() view returns (uint256)',
      'function transactionCount() view returns (uint256)',
      'function isOwner(address) view returns (bool)',
      'function submitTransaction(address destination, uint256 value, bytes memory data) returns (uint256)',
      'function confirmTransaction(uint256 transactionId)',
      'function revokeConfirmation(uint256 transactionId)',
      'function executeTransaction(uint256 transactionId)',
      'function getConfirmationCount(uint256 transactionId) view returns (uint256)',
      'function getTransactionCount(bool pending, bool executed) view returns (uint256)',
      'function isConfirmed(uint256 transactionId) view returns (bool)',
      'event Submission(uint256 indexed transactionId)',
      'event Confirmation(address indexed sender, uint256 indexed transactionId)',
      'event Revocation(address indexed sender, uint256 indexed transactionId)',
      'event Execution(uint256 indexed transactionId)'
    ],
    sourceCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MultiSigWallet {
    struct Transaction {
        address destination;
        uint256 value;
        bytes data;
        bool executed;
    }
    
    address[] public owners;
    uint256 public required;
    mapping(address => bool) public isOwner;
    
    Transaction[] public transactions;
    mapping(uint256 => mapping(address => bool)) public confirmations;
    
    event Submission(uint256 indexed transactionId);
    event Confirmation(address indexed sender, uint256 indexed transactionId);
    event Revocation(address indexed sender, uint256 indexed transactionId);
    event Execution(uint256 indexed transactionId);
    event ExecutionFailure(uint256 indexed transactionId);
    event Deposit(address indexed sender, uint256 value);
    
    modifier onlyWallet() {
        require(msg.sender == address(this), "Only wallet can call");
        _;
    }
    
    modifier ownerDoesNotExist(address owner) {
        require(!isOwner[owner], "Owner already exists");
        _;
    }
    
    modifier ownerExists(address owner) {
        require(isOwner[owner], "Owner does not exist");
        _;
    }
    
    modifier transactionExists(uint256 transactionId) {
        require(transactionId < transactions.length, "Transaction does not exist");
        _;
    }
    
    modifier confirmed(uint256 transactionId, address owner) {
        require(confirmations[transactionId][owner], "Transaction not confirmed");
        _;
    }
    
    modifier notConfirmed(uint256 transactionId, address owner) {
        require(!confirmations[transactionId][owner], "Transaction already confirmed");
        _;
    }
    
    modifier notExecuted(uint256 transactionId) {
        require(!transactions[transactionId].executed, "Transaction already executed");
        _;
    }
    
    modifier notNull(address _address) {
        require(_address != address(0), "Invalid address");
        _;
    }
    
    modifier validRequirement(uint256 ownerCount, uint256 _required) {
        require(ownerCount <= 20 && _required <= ownerCount && _required != 0 && ownerCount != 0, "Invalid requirement");
        _;
    }
    
    constructor(address[] memory _owners, uint256 _required)
        validRequirement(_owners.length, _required)
    {
        for (uint256 i = 0; i < _owners.length; i++) {
            require(!isOwner[_owners[i]] && _owners[i] != address(0), "Invalid owner");
            isOwner[_owners[i]] = true;
        }
        owners = _owners;
        required = _required;
    }
    
    receive() external payable {
        if (msg.value > 0) {
            emit Deposit(msg.sender, msg.value);
        }
    }
    
    function submitTransaction(address destination, uint256 value, bytes memory data)
        public
        ownerExists(msg.sender)
        notNull(destination)
        returns (uint256 transactionId)
    {
        transactionId = addTransaction(destination, value, data);
        confirmTransaction(transactionId);
    }
    
    function confirmTransaction(uint256 transactionId)
        public
        ownerExists(msg.sender)
        transactionExists(transactionId)
        notConfirmed(transactionId, msg.sender)
    {
        confirmations[transactionId][msg.sender] = true;
        emit Confirmation(msg.sender, transactionId);
        executeTransaction(transactionId);
    }
    
    function revokeConfirmation(uint256 transactionId)
        public
        ownerExists(msg.sender)
        confirmed(transactionId, msg.sender)
        notExecuted(transactionId)
    {
        confirmations[transactionId][msg.sender] = false;
        emit Revocation(msg.sender, transactionId);
    }
    
    function executeTransaction(uint256 transactionId)
        public
        ownerExists(msg.sender)
        confirmed(transactionId, msg.sender)
        notExecuted(transactionId)
    {
        if (isConfirmed(transactionId)) {
            Transaction storage txn = transactions[transactionId];
            txn.executed = true;
            (bool success, ) = txn.destination.call{value: txn.value}(txn.data);
            if (success) {
                emit Execution(transactionId);
            } else {
                emit ExecutionFailure(transactionId);
                txn.executed = false;
            }
        }
    }
    
    function isConfirmed(uint256 transactionId) public view returns (bool) {
        uint256 count = 0;
        for (uint256 i = 0; i < owners.length; i++) {
            if (confirmations[transactionId][owners[i]]) {
                count += 1;
            }
            if (count == required) {
                return true;
            }
        }
        return false;
    }
    
    function addTransaction(address destination, uint256 value, bytes memory data)
        internal
        notNull(destination)
        returns (uint256 transactionId)
    {
        transactionId = transactions.length;
        transactions.push(Transaction({
            destination: destination,
            value: value,
            data: data,
            executed: false
        }));
        emit Submission(transactionId);
    }
    
    function getConfirmationCount(uint256 transactionId) public view returns (uint256 count) {
        for (uint256 i = 0; i < owners.length; i++) {
            if (confirmations[transactionId][owners[i]]) {
                count += 1;
            }
        }
    }
    
    function getTransactionCount(bool pending, bool executed) public view returns (uint256 count) {
        for (uint256 i = 0; i < transactions.length; i++) {
            if (pending && !transactions[i].executed || executed && transactions[i].executed) {
                count += 1;
            }
        }
    }
    
    function getOwners() public view returns (address[] memory) {
        return owners;
    }
    
    function getConfirmations(uint256 transactionId) public view returns (address[] memory _confirmations) {
        address[] memory confirmationsTemp = new address[](owners.length);
        uint256 count = 0;
        for (uint256 i = 0; i < owners.length; i++) {
            if (confirmations[transactionId][owners[i]]) {
                confirmationsTemp[count] = owners[i];
                count += 1;
            }
        }
        _confirmations = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            _confirmations[i] = confirmationsTemp[i];
        }
    }
    
    function transactionCount() public view returns (uint256) {
        return transactions.length;
    }
}`,
    constructorParams: [
      {
        name: 'owners',
        type: 'address[]',
        description: 'Array of owner addresses',
        required: true
      },
      {
        name: 'required',
        type: 'uint256',
        description: 'Number of required confirmations',
        required: true,
        defaultValue: 2
      }
    ],
    deploymentCost: {
      ethereum: '0.15',
      polygon: '0.004',
      bsc: '0.015'
    }
  }
];

export const getTemplatesByCategory = (category: ContractTemplate['category']) => {
  return CONTRACT_TEMPLATES.filter(template => template.category === category);
};

export const getTemplateById = (id: string) => {
  return CONTRACT_TEMPLATES.find(template => template.id === id);
};

export const getTemplatesByDifficulty = (difficulty: ContractTemplate['difficulty']) => {
  return CONTRACT_TEMPLATES.filter(template => template.difficulty === difficulty);
};