pragma solidity ^0.8.3;
import "./BioNFT2.sol";
import "./Victcoins.sol";

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
  

    function purchase(address contractAddr,address coinAddr, uint256 tokenId, uint256 amount)public {
        Listing memory item = listings[contractAddr][tokenId];
        Victcoins coins=Victcoins(coinAddr);
        bool success = coins.transferFrom(msg.sender, item.seller, item.price*amount);
        if (success){BioNFT2 token=BioNFT2(contractAddr);
        token.transferFrom(address(this),msg.sender,tokenId);}
        
       
    }

    // function withdraw(uint256 amount, address payable destAddr)public{
    //     require(amount <= balances[msg.sender],"Insufficient funds");
    //     balances[msg.sender] -=amount;
    //     destAddr.transfer(amount);
    // }

}