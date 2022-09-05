// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Utility {

    struct TokenBalance {
        address token;
        uint256 balance;
    }

    function getBalances(address owner, address[] memory tokenAddresses) external view returns (TokenBalance[] memory) {
        uint8 i = 0;
        TokenBalance[] memory balances = new TokenBalance[](tokenAddresses.length);

        while(i < tokenAddresses.length) {
            balances[i] = getBalance(owner, tokenAddresses[i]);
            i++;
        }
        
        return balances;
    }

    function getBalance(address owner, address tokenAddress) internal view returns (TokenBalance memory) {
        IERC20 token = IERC20(tokenAddress);
        return TokenBalance(tokenAddress, token.balanceOf(owner));
    }
}




/* Problems faced
Hard to test
Returns array of array as opposed to array of objects in json
*/