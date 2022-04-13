pragma solidity ^0.8.3;
import "./BioNFT2.sol";

contract NFTtrader{
    mapping(address=> mapping(uint256=>Listing))public listings;
    mapping(address => uint256)public balances;
    struct Listing{
        uint256 price;
        address seller;
    }
    
    function addListing(uint256 price, address contractAddr, uint256 tokenId) public{
        listings[contractAddr][tokenId]=Listing(price,msg.sender);
        BioNFT2 token=BioNFT2(contractAddr);
        //token.approve(address(this), tokenId);
        //need to check if its owner??
        token.transferFrom(msg.sender,address(this),tokenId);
    }
    function fetchMarketItems(uint tokenId,address contractAddr) public view returns (Listing[] memory) {
        Listing memory Item=listings[contractAddr][tokenId];
        return Item;
    }

    function purchase(address contractAddr,uint256 tokenId, uint256 amount)public payable{
        Listing memory item = listings[contractAddr][tokenId];
        require(msg.value >= item.price *amount,"insufficient funds");
        balances[item.seller] += msg.value;
        BioNFT2 token=BioNFT2(contractAddr);
        token.transferFrom(address(this),msg.sender,tokenId);
    }

    function withdraw(uint256 amount, address payable destAddr)public{
        require(amount <= balances[msg.sender],"Insufficient funds");
        balances[msg.sender] -=amount;
        destAddr.transfer(amount);
    }

}