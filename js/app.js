
$(document).ready(function(){
	var last_guess;
	var random_number;
	var guess_num=0;

	function game_init(){
		random_number=Math.floor((Math.random() * 100));		
		console.log("guessed number is "+random_number);
		delete last_guess;	
		guess_num=0;
		$("#count").html(guess_num);
		$("#guessButton").show();
		$("#userGuess").show();
		$("#guessList").empty();
		$("#feedback").html("Make your Guess!");
	}
	game_init();

	function validation_check(value){
		if (!value) {
			$("#feedback").html("your guess is empty please recheck");
			return false;
		}
		if (!isNaN(value)){
			return true;
		} else {
			$("#feedback").html("your guess is not a number please recheck");
			return false;
		}
	}

	function delta_handle(value){
		delta=Math.abs(value - random_number);
		console.log("delta is "+delta);
		if (delta==0) {
			$("#feedback").html("Bingo! the number was "+value);
			$("#userGuess").hide();
			$("#guessButton").hide();
			return true;
		}
		if ( delta > 50 ) {
			$("#feedback").html("Ice cold");
		} else if ((delta <= 50) && (delta >30 )) {
			$("#feedback").html("cold");
		} else if ((delta <= 30) && (delta >=20 )) {
			$("#feedback").html("warm");
		} else if ((delta <= 10) && (delta >=1)) {
			$("#feedback").html("very hot");
		}

	}

	function handle_guess(value){
		$("#guessList").append("<li>"+value+"</li>")
		delta_handle(value);
		last_guess=value;
		guess_num++;
		$("#count").html(guess_num);

	}
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
  	$("#guessButton").on("click",function(e){
  		e.preventDefault();   
  		var input=$("#userGuess").val();
  		console.log("input was"+input);

  		$("#userGuess").val("");
  		if (validation_check(input)){
  			handle_guess(input);
  		}
  	})
  	$(".new").on("click",function(e){
  		e.preventDefault();  
  		game_init();
  	});
});


