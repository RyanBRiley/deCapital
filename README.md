# deCapital

### This is the repository of deCapital, a decentralized credit market. Through the Ethereum blockchain, deCapital will empower both seekers of capital and holders of capital. Individuals will be capable of applying for credit and investors will be able to lend. deCapital will remove the bank and return financial power to the individual.

deCapital works by allowing a user to apply for a loan under the borrow tab. These new applications will show up under the lend tab, where other users can fund the loans. Each user has a dashboard where he or she can make payments on outstanding debt and view the status of their investments.

## To run

0. Ensure truffle and npm are installed and ganache is running and metamask is logged in
1. Clone deCapital in to a local directory
2. cd into deCapital
3. run npm install
4. run truffle compile
5. run truffle migrate
6. run truffle test
7. start the dev server with npm run start
8. navigate to localhost:3000

### Note to Grader:
Sometimes the react app updates before the ethereum blockchain processes the transaction. If you are not seeing updates to the app (ie you created a new loan and it is not showing up in the lend section), Click the deCapital button in the top left of the app to navigate to the home page and refresh the browser. The state will reflect the changes to the development blockchain 
