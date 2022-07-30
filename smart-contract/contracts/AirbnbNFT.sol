//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract AirbnbNFT is ERC721URIStorage{
    constructor() ERC721("MyAirbnb", "MAB"){
    }
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;


    struct ListedToken{
        uint256 tokenId;
        address owner;
        string [] datesBooked;
    }
    event TokenListedSuccess(
        uint256 indexed tokenId,
        address owner,
        string [] datesBooked
    );
  
    mapping(uint256 => ListedToken) private idToListedToken;

     ///=============== CREATE NFT TOKEN FUNCTION ====================
    function createToken(string memory tokenURI,string [] memory newBookings) public payable returns(uint){
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender,newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createListedToken(newTokenId,newBookings);
        return newTokenId;
    }

    function createListedToken(uint256 tokenId,string [] memory newBookings)private{
        idToListedToken[tokenId] = ListedToken(
            tokenId,
            address(this),
            newBookings
        );

        emit TokenListedSuccess(tokenId, msg.sender, newBookings);
    }

    function getMyNFTs() public view returns(ListedToken[]memory){
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i=0; i<totalItemCount; i++){
            if(idToListedToken[i+1].owner == msg.sender){
                itemCount +=1;
            }
        }

        ListedToken[] memory items = new ListedToken[](itemCount);
        for(uint i=0; i< totalItemCount; i++){
            if(idToListedToken[i+1].owner==msg.sender){
                uint currentId=i+1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex +=1;
            }
        }
        return items;
    }
}
