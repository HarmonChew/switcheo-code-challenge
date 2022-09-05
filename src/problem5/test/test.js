const { ethers } = require("ethers");

const ADDR = "0xbFb5C811fb2F09902266321787289C7f67b77fc6"; // your contract address
const ABI = [
  {
    inputs: [Array],
    name: "getBalances",
    outputs: [Array],
    stateMutability: "view",
    type: "function",
    constant: true,
    payable: undefined,
    signature: "0x6a385ae9",
  },
]; // your contract ABI

const ADDRESS = "…"; // some wallet address with token balance
const TOKENS = [
  // token contract addresses
  "…",
  "…",
];

// you can use your own RPC provider url (no need to deploy to mainnet)
const provider = ethers.providers.JsonRpcProvider(["HTTP://127.0.0.1:7545"]);

const test = async () => {
  const contract = new ethers.Contract(ADDR, ABI, provider);

  const balances = await contract.getBalances(ADDRESS, tokens);

  return balances;
};

test().then(console.log);
