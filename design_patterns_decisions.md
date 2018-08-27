# Design Pattern Choices

deCapital utilizes the following design patterns:

1. Fail early and fail loud - this was used to stop unnecessary code execution given failing conditions.
It was implemented using require statments in the beginning of funcionts.
2. Restricting access - this was used to prevent unwanted accounts accessing critical contract elements. This was achieved by creating an onlyOwner modifier and using on critical functions. Internal functions are marked private. The member variables could also be marked private but were deemed necessary to expose to the public. 
3. Mortal - deCapital has a killContract function that self-destructs if the owner executes. If a fatal bug is found in the contract, the owner can destroy the instance. 
4. Circuit Breaker - deCapital has a circuit breaker modifier that puts all loans on hold during an emergency. If the owner needs time to figure out why something is not as it should be, the circuit breaker can be utilized by toggling the emergency variable. 
5. State machine - while the contract itself is not a state machine, deCapital handles loans as state machines, changing there state if they are unfunded, funded or settled. This allows users and the app to keep track of the appropriate loans. 


The following design patterns were not used:

1. Speed bump - since deCapital is not at risk of reentrancy concerns and the contract holds no funds, a time limit was not necessary.
2. Auto Deprecation - this was not used because deCapital is supposed to exist for an undefined period of time. There is no set expiration as there would be in a voting dApp, for example. 
3. Pull over push payments- This pattern could have been implemented but was not because of the relatively few transactions deCapital will have to process. If there were a larger volume of transactions as in an ICO this would have been more useful