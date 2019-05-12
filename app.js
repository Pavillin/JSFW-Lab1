const readline = require('readline');

// Create interface to read/write
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//function for selecting random option for computer
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
}

//The valid options the player can choose
const validOptions = ['rock', 'paper', 'scissors'];

//Score keepers
let playerScore = 0;
let ties = 0;
let computerScore = 0;

const game = async () => { 
    let choice = "";

    rl.question(
        `Pick one of the following options:\n\nRock\nPaper\nScissors\n`,
         userChoice => {
             let validChoice = false;
             choice = userChoice.toLowerCase();
             if(validChoice == false && validOptions.includes(choice)){
                 validChoice = true;
             }else{
                 validChoice = false;
             }
             const computerChoice = validOptions[getRandomInt(2)];

             if(validChoice == true){
                 //Tie
                 if(choice === computerChoice){
                     console.log("It's a tie, go again!");
                     ties += 1;
                     game();
                 }else if(
                     //User wins
                     (choice === "rock" && computerChoice === "scissors") ||
                     (choice === "scissors" && computerChoice === "paper") ||
                     (choice === "paper" && computerChoice === "rock"))
                    {
                     console.log("The player won!");
                     playerScore += 1;
                 }else{
                     //Computer wins
                     console.log("The computer won!");
                     computerScore += 1;
                 }

                 const replay = async () => {
                     rl.question(
                         `Would you like to play again? (Y/N)\n`, 
                         userAnswer => {
                             let validAnswer = false;
                             const answer = userAnswer.toLowerCase();
                             if(validAnswer == false && answer.includes("y") || answer.includes("n")){
                                 validAnswer = true;
                             }else{
                                 validAnswer = false;
                             }
                             if(validAnswer){
                                 if(answer == "y"){
                                     game();
                                 }else{
                                     rl.close();
                                     console.log("Thanks for playing, check out the scores below!")
                                     console.log(`Player: ${playerScore} Ties: ${ties} Computer: ${computerScore}`)
                                 }
                             }else{
                                 console.log("Invalid option, please enter \'Y\' or \'N\'");
                                 replay();
                             }
                         }
                     );
                 }
                 replay();
             }else{
                 console.log("Invalid option, please select rock, paper, or scissors");
                 game();
             }
         }
    )
}

game();