exports = typeof window !== "undefined" && window !== null ? window : global;



exports.Game = function() {
  var players          = new Array();
  var places           = new Array(6);
  var purses           = new Array(6);
  var inPenaltyBox     = new Array(6);

  var popQuestions     = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions  = new Array();
  var rockQuestions    = new Array();

  var currentPlayer    = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function(){
    return !(purses[currentPlayer] == 6)
  };

  var currentCategory = function(){
    var category ; 
	
	switch (places[currentPlayer]) {
		case 0:
		    category = "Pop";
			break;
		case 1:
			category = "Science";
			break;
		case 2:
			category = "Sports";
			break;
		case 3:
			category = "Rock";
			break;
		case 4:
			category = "Pop";
			break;
		case 5:
			category = "Science";
			break;
		case 6:
			category = "Sports";
			break;
		case 7: 
			category = "Rock";
		    break;
		case 8:
			category = "Pop";
			break;
		case 9:
			category = "Science";
			break;
		case 10:
			category = "Sports";
		    break;
		default:
			category = "Rock";
	}
	return category;	
  };

 
  for(var i = 0; i < 50; i++){
    popQuestions.push("Pop Question "+i);
    scienceQuestions.push("Science Question "+i);
    sportsQuestions.push("Sports Question "+i);
    rockQuestions.push("Rock Question " +i);
  };

  this.isPlayable = function(howManyPlayers){
    return howManyPlayers >= 2;
  };

  this.add = function(playerName){
	var playerNumber ;
    players.push(playerName);
	playerNumber = this.howManyPlayers() - 1;
    places[playerNumber] = 0;
    purses[playerNumber] = 0;
    inPenaltyBox[playerNumber] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  this.howManyPlayers = function(){
    return players.length;
  };


  this.askQuestion = function(){
    if(currentCategory() == 'Pop')
      console.log(popQuestions.shift());
    else if(currentCategory() == 'Science')
      console.log(scienceQuestions.shift());
    else if(currentCategory() == 'Sports')
      console.log(sportsQuestions.shift());
    else if(currentCategory() == 'Rock')
      console.log(rockQuestions.shift());
  };

  this.movePlayer = function(roll){
	  
	  places[currentPlayer] +=  roll;
        if(places[currentPlayer] > 11){
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        console.log("The category is " + currentCategory());
        this.askQuestion();
	  
  }
  
  
  this.roll = function(roll){
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if(inPenaltyBox[currentPlayer]){
      if(roll % 2 != 0){
        isGettingOutOfPenaltyBox = true;

        console.log(players[currentPlayer] + " is getting out of the penalty box");
		this.movePlayer(roll);
        
      }else{
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    }else{
      this.movePlayer(roll);
    }
  };
  
  this.nextPlayer = function(){	  
	currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0; 
  }
  

  this.wasCorrectlyAnswered = function(){
    if(inPenaltyBox[currentPlayer]){
      if(isGettingOutOfPenaltyBox){
        console.log('Answer was correct!!!!');
        purses[currentPlayer] += 1;
        console.log(players[currentPlayer] + " now has " +
                    purses[currentPlayer]  + " Gold Coins.");

        var winner = didPlayerWin();
        this.nextPlayer(); 
        return winner;
     
   	 }else{
        
		this.nextPlayer();
        return true;
      }



    }else{

      console.log("Answer was correct!!!!");

      purses[currentPlayer] += 1;
      console.log(players[currentPlayer] + " now has " +
                  purses[currentPlayer]  + " Gold Coins.");

      var winner = didPlayerWin();

      this.nextPlayer();

      return winner;
    }
  };

  this.wrongAnswer = function(){
		console.log('Question was incorrectly answered');
		console.log(players[currentPlayer] + " was sent to the penalty box");
		inPenaltyBox[currentPlayer] = true;

        this.nextPlayer();
		return true;
  };
};

var notAWinner = false;

var game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');

do{

  game.roll(Math.floor(Math.random()*6) + 1);

  if(Math.floor(Math.random()*10) == 7){
    notAWinner = game.wrongAnswer();
  }else{
    notAWinner = game.wasCorrectlyAnswered();
  }

}while(notAWinner);
