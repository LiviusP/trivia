exports = typeof window !== "undefined" && window !== null ? window : global;



exports.Game = function() {
  var players          = [];
  
  var popQuestions     = [];
  var scienceQuestions = [];
  var sportsQuestions  = [];
  var rockQuestions    = [];

  var currentPlayer    = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function(){
    return !(players[currentPlayer].purse == 6)
  };

  var getCurrentPlayer = function(){
	   
	   return players[currentPlayer];
	   
   };
   
   
  var getCurrentCategory = function(){
    var category ; 
	var currentPlayer = getCurrentPlayer();
	
	switch (currentPlayer.place) {
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

  //initialize question arrays
 
  for(var i = 0; i < 50; i++){
    popQuestions.push("Pop Question "+i);
    scienceQuestions.push("Science Question "+i);
    sportsQuestions.push("Sports Question "+i);
    rockQuestions.push("Rock Question " +i);
  };

  var isPlayable = function(howManyPlayers){
    return howManyPlayers >= 2;
  };

  this.add = function(playerName){
	var playerNumber ;
    
	var player = {
		
		name : playerName,
		place : 0,
		purse : 0,
		inPenaltyBox : false
		
	};
	
	players.push(player);

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  var howManyPlayers = function(){
    return players.length;
  };


   var askQuestion = function(){
	  
	var currentCategory = getCurrentCategory();
	
    if(currentCategory == 'Pop')
      console.log(popQuestions.shift());
    else if(currentCategory == 'Science')
      console.log(scienceQuestions.shift());
    else if(currentCategory == 'Sports')
      console.log(sportsQuestions.shift());
    else if(currentCategory == 'Rock')
      console.log(rockQuestions.shift());
  };

  
   
  
   var movePlayer = function(roll,player){
	  
	  var currentPlayer = player;
	  
	  
	  currentPlayer.place +=  roll;
        if(currentPlayer.place > 11){
          currentPlayer.place = currentPlayer.place - 12;
        }

        console.log(currentPlayer.name + "'s new location is " + currentPlayer.place);
        console.log("The category is " + getCurrentCategory());
        askQuestion();
	  
  };
  
  
   this.roll = function(roll){
	  
	  
	var currentPlayer =getCurrentPlayer();
	
    console.log(currentPlayer.name + " is the current player");
    console.log("They have rolled a " + roll);

    if(currentPlayer.inPenaltyBox){
      if(roll % 2 != 0){
        isGettingOutOfPenaltyBox = true;

        console.log(currentPlayer.name + " is getting out of the penalty box");
		movePlayer(roll,currentPlayer);
        
      }else{
        console.log(currentPlayer.name + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    }else{
      movePlayer(roll,currentPlayer);
    }
  };
  
  var nextPlayer = function(){	  
	currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0; 
  };
  

  this.wasCorrectlyAnswered = function(){
	  
	var currentPlayer = getCurrentPlayer();
	
    if(currentPlayer.inPenaltyBox){
      if(isGettingOutOfPenaltyBox){
        console.log('Answer was correct!!!!');
        currentPlayer.purse += 1;
        console.log(currentPlayer.name + " now has " +
                    currentPlayer.purse  + " Gold Coins.");

        var winner = didPlayerWin();
        nextPlayer(); 
        return winner;
     
   	 }else{
        
		nextPlayer();
        return true;
      }



    }else{

      console.log("Answer was correct!!!!");

      currentPlayer.purse += 1;
      console.log(currentPlayer.name + " now has " +
                  currentPlayer.purse  + " Gold Coins.");

      var winner = didPlayerWin();

      nextPlayer();

      return winner;
    }
  };

  this.wrongAnswer = function(){
	  
	    var currentPlayer = getCurrentPlayer();
		
		console.log('Question was incorrectly answered');
		console.log(currentPlayer.name + " was sent to the penalty box");
		currentPlayer.inPenaltyBox = true;

        nextPlayer();
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
