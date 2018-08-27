#Avoiding Common Attacks

deCapital utilizes the following methods to avoid common attack vectors:

1. Unit testing - this ensures that the logic of the contract works as intended, protecting against potential exploitation of logic bugs.
2. Reentrancy - reentrant attacks, like the famous DAO example, are thrwarted by avoiding recursive calls.
3. Integer overflow/underflow - this was avoiding by use the SafeMath library from Open Zeppelin. All math functions are protected from overflows and underflows.
4. Poison data- pertinent inputs are sanitized by being run through require statements
5. Exposure - exposure was limited to critical functions by using an onlyOwner modifier.  
6. Miner vulnerabilities - deCapital currently does use block.timestamp for stub in creating interests rates. This would be changed if the dApp went into production. 
7. TX origins and gas limits - msg.sender was used instead of tx.origin and there are no loops. 


Future improvements: 
Currently, the contract owner has too much power and puts the contract at risk of the malicious admin vulnerability. Implement multi-sig functionality for critical operations is a desired future improvement.