// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Escrow is ReentrancyGuard {
    address public escAcc;
    uint256 public totalItems = 0;

    mapping(uint256 => ItemStruct) private items;
    mapping(address => ItemStruct[]) private itemsOf;
    mapping(uint256 => address) public ownerOf;

    enum Status {
        OPEN,
        PENDING,
        DELIVERY,
        SETTLED,
        REFUNDED
    }

    struct ItemStruct {
        uint256 itemId;
        string purpose;
        uint256 amount;
        uint256 timestamp;
        address owner;
        address provider;
        Status status;
        bool provided;
        bool confirmed;
    }


    constructor() {
        escAcc = msg.sender;
    }

    function createItem(
        string calldata purpose
    ) payable external returns (bool) {
        require(bytes(purpose).length > 0, "Purpose cannot be empty");
        require(msg.value > 0 ether, "Item cannot be zero ethers");

        uint256 itemId = totalItems++;
        ItemStruct storage item = items[itemId];

        item.itemId = itemId;
        item.purpose = purpose;
        item.amount = msg.value;
        item.timestamp = block.timestamp;
        item.owner = msg.sender;
        item.status = Status.OPEN;

        itemsOf[msg.sender].push(item);
        ownerOf[itemId] = msg.sender;

        return true;
    }

    function getItems()
        external
        view
        returns (ItemStruct[] memory props) {
        props = new ItemStruct[](totalItems);

        for (uint256 i = 0; i < totalItems; i++) {
            props[i] = items[i];
        }
    }

    function provideItem(
        uint256 itemId,
        address provider
    ) external returns (bool) {
        require(msg.sender != ownerOf[itemId], "Owner not allowed");

        items[itemId].status = Status.PENDING;
        items[itemId].provider = provider;

        return true;
    }

    function performDelievery(uint256 itemId) external returns (bool) {
        require(msg.sender == items[itemId].provider, "Service not awarded to you");
        require(!items[itemId].provided, "Service already provided");
        require(!items[itemId].confirmed, "Service already confirmed");

        items[itemId].provided = true;
        items[itemId].status = Status.DELIVERY;

        return true;
    }

    function confirmDelivery(
        uint256 itemId,
        bool provided
    ) external returns (bool) {
        require(msg.sender == items[itemId].owner, "Only owner allowed");
        require(items[itemId].provided, "Service not provided");
        require(items[itemId].status != Status.REFUNDED, "Already refunded, create a new Item");

        if(provided) {
            items[itemId].confirmed = true;
            payTo(items[itemId].provider, items[itemId].amount);
            items[itemId].status = Status.SETTLED;
        }else {
            payTo(items[itemId].owner, items[itemId].amount);
            items[itemId].status = Status.REFUNDED; 
        }

        return true;
    }

    function payTo(
        address to, 
        uint256 amount
    ) internal returns (bool) {
        (bool success,) = payable(to).call{value: amount}("");
        require(success, "Payment failed");
        return true;
    }
}