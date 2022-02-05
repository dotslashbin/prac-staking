// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0;

import "./Dummy_Token.sol"; 
import "./Tether_Token.sol";

contract Staking_Dapp {
	string public name = "Staking Dapp"; 
	address public owner;
	Dummy_Token public dummy_token; 
	Tether_Token public tether_token;

	address[] public stakers;
	mapping(address => uint) public stakingBalance;
	mapping(address => bool) public hasStaked;
	mapping(address => bool) public isStaking;

	constructor(Dummy_Token _dummyToken, Tether_Token _tetherToken) {
		dummy_token = _dummyToken;
		tether_token = _tetherToken; 
		owner = msg.sender;
	}

	function stakeTokens(uint _amount) public {
		require( _amount > 0, "Kinanglan ka'g kwarta i stake");
		tether_token.transferfrom(msg.sender, address(this), _amount ); 
		stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

		if(!hasStaked[msg.sender]) {
			stakers.push(msg.sender);
		}

		isStaking[msg.sender] = true;
		hasStaked[msg.sender] = true;
	}

	function unstakeTokens() public {
		uint balance = stakingBalance[msg.sender];

		require(balance > 0, "wala may gi stake ni nga address"); 

		// Transfer tokens fro the contract address to the sender address
		tether_token.transfer(msg.sender, balance); 

		stakingBalance[msg.sender] = 0;
		isStaking[msg.sender] = false;
	}

	function issueDummy() public {
		require(msg.sender == owner, "ang owner ra sa contract pwede mutawag ani");

		for(uint i = 0; i < stakers.length; i++ ) {
			address recepient = stakers[i];
			uint balance = stakingBalance[recepient];

			if(balance > 0) {
				dummy_token.transfer(recepient, balance);
			}
		}
	}
}