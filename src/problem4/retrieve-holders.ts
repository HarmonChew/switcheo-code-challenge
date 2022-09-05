import { BscscanProvider } from "@ethers-ancillary/bsc";
import { ethers } from "ethers";
import { BigNumber } from "bignumber.js";

//Array containing addresses to query
const addresses = [
  "0xfe808b079187cc460f47374580f5fb47c82b87a5",
  "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
  "0x123d475e13aa54a43a7421d94caa4459da021c77",
];

// A provider is a connection to the network, this one specifically connecting to bsc mainnet
const provider = new BscscanProvider();

//Shows what methods are available, how to encode and decode the data
const SWTHAbi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
];

//Abstraction of the code that lives on the chain
const token = new ethers.Contract(
  "0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c",
  SWTHAbi,
  provider
);

// Print the address as well as the balance of SWTH of each of the specified addresses
// balanceOf() returns a Promise containing the hexadecimal balance, converted using BigNumber
addresses.forEach((address) => {
  token.balanceOf(address).then((res) => {
    console.log(address, new BigNumber(res._hex).c[0]);
  });
});

// Problems
// - I believe SWTH has moved to a new address so the output of my script differs from the output
// shown in the problem statement
// - When I do the query it returns a hexadecimal that when converted does not include the decimal. Hence
// my output contains all digits of the balance, without the decimal placing
