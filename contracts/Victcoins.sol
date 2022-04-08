//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Victcoins is ERC20{
    constructor () ERC20 ('VictorisCoins', 'VICT') public{
    _mint(msg.sender, 100000);
}
}