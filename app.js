//game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesleft = 3;

//ui element
const game = document.getElementById('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// assign min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listner
guessBtn.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
        // console.log("hello");
    }
});

//listen  for guess 
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    //validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`please enter a number between ${min} and ${max}`,'red');
    }

    //check if won
    if(guess === winningNum){
        //game over - won
        
        gameOver(true, `${winningNum} is correct, YOU WIN !`);

    }else {
        //wrong number 
        guessesleft -= 1;

        if(guessesleft === 0){
            //game over -loss
            
            gameOver(false, `Game Over, you lost. the correct number was ${winningNum}`);
        }else {
            //game continues - answer wrong
            //change border color
            guessInput.style.borderColor = 'red';

            //clear input
            guessInput.value = '';
            //tell user its wrong number
            setMessage(`${guess} is not correct, ${guessesleft} guesses left`,'red');
        }

    }

});



//game over 
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    //disable input
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = color;
    //set textcolor
    message.style.color = color;
    //set message
    setMessage(msg);

    //play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//get winning number
function getRandomNum(){
    return Math.floor(Math.random()*(max-min+1)+min);
    
    
}

//set message
function setMessage(msg , color){
    message.style.color = color;
    message.textContent = msg;
}