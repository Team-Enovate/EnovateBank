// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./EnovateToken.sol";

contract EnovateBank {
    address public owner;
    EnovateToken private enovateToken;
    //mapping that will track the time the user deposits
    mapping(address => uint) public depositStart;
    //mapping that tracks the Total interest gotten by the user
    mapping(address => uint) public TotalInterest;
    //mapping that tracks the Ether balance of each user
    mapping(address => uint) public etherBalanceOf;
    //mapping that tracks the Collateral deposited by the borrower in ether
    mapping(address => uint) public collateralEther;
    //mapping that tracks the total deposit made by the user
    mapping(address => uint) public totalDeposit;
    //mapping that tracks the total token minted by the user 
    mapping(address => uint) public totalTokensMinted;
    
    mapping(address => bool) public isDeposited;
    mapping(address => bool) public isBorrowed;
    // contract events 
    event Deposit(address indexed user, uint etherAmount, uint timeStart);
    event Withdraw(address indexed user, uint etherAmount);
    event Borrow(address indexed user, uint collateralEtherAmount, uint borrowedTokenAmount);
    event PayOff(address indexed user, uint fee);
    event TokenBurn(address indexed user, uint tokenAmount);

     address[] depositors;


    modifier onlyOwner() {
        require(msg.sender == owner, "Error: Caller is not the owner of the contract.");
        _;
    }

    constructor(EnovateToken _enovateToken) {
        owner = msg.sender;
        enovateToken = _enovateToken;
    }

   // This function allows the borrower to deposit ETH for savings
    function depositETH() payable public {
        require(msg.value > 0, 'Error, invalid amount');
        uint256 depositAmount = msg.value;
        etherBalanceOf[msg.sender] += depositAmount;
        depositStart[msg.sender] = block.timestamp;
        totalDeposit[msg.sender] += depositAmount;
        isDeposited[msg.sender] = true; //activate deposit status
        depositors.push(msg.sender);
        emit Deposit(msg.sender, depositAmount, block.timestamp);
    }
   // This function calculate the interest that will be gotten by the user at the time of savings withdrawal
   //It also sends the interest gotten when the withdraw function is triggered
    function CalculateInterest(address userAdd) internal {
        uint256 INTEREST_RATE = 1; // 1% interest of intial deposit per second
        uint256 currentDeposit = etherBalanceOf[userAdd];
        
        require (etherBalanceOf[userAdd] != 0, "no valid deposit yet");

        uint256 periodOfDeposite = block.timestamp - depositStart[userAdd];

        uint256 interest = currentDeposit * INTEREST_RATE * periodOfDeposite; 
        enovateToken.transfer(msg.sender, interest);
        

        TotalInterest[userAdd] += interest;

         if (etherBalanceOf[msg.sender] < 0){
            depositStart[msg.sender] = 0;
        } else{
            depositStart[msg.sender] = block.timestamp;
        }
    }

  // This function allows the user to withdraw ETH deposited and interest will also be sent with the ETH deposited
    function withdrawETH(uint256 _amount) public {
        require(isDeposited[msg.sender] == true, 'Error: no previous deposit');
        require(etherBalanceOf[msg.sender] >= _amount, 'Error: invalide amount');
        CalculateInterest(msg.sender);
        etherBalanceOf[msg.sender] = etherBalanceOf[msg.sender] - _amount;

        if (etherBalanceOf[msg.sender] <= 0){
            isDeposited[msg.sender] = false; //reset deposit status
        }
        address payable recipient = payable(msg.sender);
        recipient.transfer(_amount);

        emit Withdraw(msg.sender, _amount);
    }
   // User can borrow ENOVATE tokens here by depositing ether, 1 Ether ==100 ENOVATE tokens
    function borrow() public payable {
        require(msg.sender != address(0) && msg.value > 0, 'Error: invalid address, amount, or value sent');
        require(isBorrowed[msg.sender] == false, 'Error: loan already active');
        uint _amountBorrowed=msg.value*100;
        uint tokensToMint = _amountBorrowed; //Mint the same value as the collateral
        enovateToken.transfer(msg.sender, tokensToMint);
        collateralEther[msg.sender] =msg.value ;
        isBorrowed[msg.sender] = true;
        totalTokensMinted[msg.sender] += tokensToMint;

        emit Borrow(msg.sender,msg.value, tokensToMint);
    }
    // This functions handles when the user want to pay back the loan, 90% of the Collateral is returned back has the 
    //bank service charge, and 5% of the Token that was borrowed is given to the user has a gift
    function payoffToken() public{
        require(isBorrowed[msg.sender], 'Error: no active loan');
         uint tokensToBurn = totalTokensMinted[msg.sender] * 95 / 100; //Transfers 95% back to the bank contract
         require(enovateToken.transferFrom(msg.sender,address(this),tokensToBurn));
        uint transferAmount= collateralEther[msg.sender] * 90/ 100; //takes a service fee of 10%
        totalTokensMinted[msg.sender] -= tokensToBurn;
        payable(msg.sender).transfer(transferAmount);
        collateralEther[msg.sender] = 0;
        isBorrowed[msg.sender] = false;

        emit PayOff(msg.sender, transferAmount);
        emit TokenBurn(msg.sender, tokensToBurn);
    }

    function getETHBalanceOf(address userAdd) public view returns (uint256) {
        return etherBalanceOf[userAdd];
    }

    function getTotalInterest(address userAdd) public view returns (uint256) {
        return TotalInterest[userAdd];
    }
     function getEnovateToken(address Useradd) public view returns (uint) {
        return enovateToken.balanceOf(Useradd);
    }
  
    function getContractEtherBalance() public view returns (uint256) {
      return address(this).balance;
    }

    function getAddresses() public view returns (address[] memory) {
        return depositors;
    }


}