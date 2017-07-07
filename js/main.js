//CWD 3200 Assignment 4

//Nick Fernandes

//The purpose of this script is to set up a slot machine game in index.html, now using Jquery, SVG elements, HTML5 APIs and audio

/*Sounds Used

All downloaded from http://soundbible.com

Cashout sound: Many Wolves Howling recorded by fws.gov in the public domain. Shortened and altered.

http://soundbible.com/278-Many-Wolves-Howling.html

Win sound: Evil Laugh Male 6 recorded by Himan in the public domain. Unaltered.

http://soundbible.com/2055-Evil-Laugh-Male-6.html

Load sound: Clock Strikes Twelve recorded by Clock Man in the public domain. Altered.

http://soundbible.com/1617-Clock-Strikes-Twelve.html

Spinning sound: Incoming Suspense by Maximilien in the public domain. Unaltered.

http://soundbible.com/2046-Incoming-Suspense.html

*/

//The code starts here, an onload function that forms the basis of the program

//   GLOBAL VARIABLES//



	//GLOBAL FOR BETTING RADIO BUTTONS
	
	//Audio constants
	
	var winSound =	document.getElementById("win");
	 var spinSound = document.getElementById("spin");
	var startSound = document.getElementById("start");
	var cashSound =	document.getElementById("cash");

	
	const betInput = ('[name="bet"]');
	//GLOBAL FOR THREE PICTURES
	const picOne = ('#pic1');
	
	const picTwo = ('#pic2');
	
	const picThree = ('#pic3');
	//GLOBAL FOR ALL THREE PICTURES AS A GROUP
	const picsAll = ('[name="picture"]');
	
	//CONSTANT FOR STATUS MESSAGES
	const message = ('#status');	
	
	//CONSTANT FOR CREDITS INPUT FIELD
	const credits = ('#credits');
	
	//VARIABLE FOR USER'S ID
	var yourId = window.localStorage.userName;	
	
	//CONSTANT FOR DEPOSIT
	const deposit = ('[name="creds"]');
	
	//const deposit = ("[name='creds']");
	
	//THE PLAY BUTTON
	const playButton = ('#play');
	
	// THE CASHOUT BUTTON
	const cashOut = ('#cashout');
	
	//THE CONSTANTS FOR REWARDS
	const oneGold = 10;
	
	const twoGold = 25;
	
	const threeGold = 500;
	
	const shapeWin = 2;
	
	const colorWin = 2;
	
	var yourId = window.localStorage.userName;
	
	const shapecolorWin = 10;
	var credTotal = 0;
	
	//THESE ARE THE OBJECTS FOR PICUTRES
	const pic = new Array(20); 
					//Aside from storing the URL for the image. 
					//Each object in the array also has values to be compared for scoring. 
					//ShapeColor is the value for getting a both shape and color match
					
					//the black square lacks these values since it is the default
					pic [0] = { image: "images/blackSquare.png",
								
								};
					
					pic [1] = { image: "images/wolfblue.svg",
								color: "blue",
								shapeColor: "bluewolf",
								shape: "wolf"
								};
					pic [2] = { image: "images/wolfblue.svg",
								color: "blue",
								shapeColor: "bluewolf",
								shape: "wolf"
								};
					
					pic [3] = { image: "images/frankblue.svg",
								color: "blue",
								shapeColor: "bluefranken",
								shape: "franken"
								};
								
					pic [4] = { image: "images/frankblue.svg",
								color: "blue",
								shapeColor: "bluefranken",
								shape: "franken"
								};
					
					pic [5] = { image: "images/vampblue.svg",
								color: "blue",
								shapeColor: "bluevamp",
								shape: "vamp"
								};
								
					pic [6] = { image: "images/vampblue.svg",
								color: "blue",
								shapeColor: "bluevamp",
								shape: "vamp"
								};
					
					pic [7] = { image: "images/vampgreen.svg",
								color: "green",
								shapeColor: "greenvamp",
								shape: "vamp"
								};
					pic [8] = { image: "images/vampgreen.svg",
								color: "green",
								shapeColor: "greenvamp",
								shape: "vamp"
								};
					pic [9] = { image: "images/frankgreen.svg",
								color: "green",
								shapeColor: "greenfranken",
								shape: "franken"
								};
					 pic [10] = { image: "images/frankgreen.svg",
								color: "green",
								shapeColor: "greenfranken",
								shape: "franken"
								};
					pic [11] = { image: "images/wolfgreen.svg",
								shapeColor: "greenwolf",
								color: "green",
								shape: "wolf"
								};
				 	pic [12] = { image: "images/wolfgreen.svg",
								shapeColor: "greenwolf",
								color: "green",
								shape: "wolf"
								};
					
					
					pic [13] = { image: "images/vampred.svg",
								color: "red",
								shapeColor: "redvamp",
								shape: "vamp"
								};
					pic [14] = { image: "images/vampred.svg",
								color: "red",
								shapeColor: "redvamp",
								shape: "vamp"
								};
					
					pic [15] = { image: "images/frankred.svg",
								color: "red",
								shapeColor: "redfranken",
								shape: "franken"
								};
					pic [16] = { image: "images/frankred.svg",
								color: "red",
								shapeColor: "redfranken",
								shape: "franken"
								};
					pic [17] = { image: "images/wolfred.svg",
								color: "red",
								shapeColor: "redwolf",
								shape: "wolf"
								};
					pic [18] = { image: "images/wolfred.svg",
								color: "red",
								shapeColor: "redwolf",
								shape: "wolf"
								};
					
					//the yellow skull lacks shape and color since it only matches with other yellow diamonds
					pic [19] = { image: "images/skull.svg",
									shapeColor:"skull",
									shape: "",
									color: "" };
									
					

									
									
//     FUNCTIONS 

//FUNCTION FOR OUTCOMES PASSING THE VARIABLES FOR THE BET AND RANDOM NUMBERS
function outcome(randNum1, randNum2, randNum3, bet) {
	
		var outcomeSwitch;
		//THE OUTCOME FUNCTION SPLITS OFF INTO TWO PATHS FOR THE GOLD SKULLS OR THE NORMAL OUTCOME
	
				//THIS CHECKS IF ONE OF THE PIC ELEMENTS CONTAINS "SKULL" IN IT'S CUSTOM SHAPECOLOR ATTRIBRUTE
			
			
				if ($(picOne).attr("data-shapecolor") === "skull" || $(picTwo).attr("data-shapecolor") === "skull" || $(picThree).attr("data-shapecolor") === "skull") {
					outcomeSwitch = 1;
			
					}
			
					else {
		
						outcomeSwitch = 2;
			
				};
			
		//Switch to determine which functino is played.
			switch (outcomeSwitch) {
				case 1:
				
					goldOutcome(randNum1, randNum2, randNum3, bet);
			
				break;
				
				case 2:
				normalOutcome(randNum1, randNum2, randNum3, bet);
				
				break;
			};
		
		};
		
		//$(credits).val(credTotal);
		

	
	//FUNCTION FOR THE OUTCOME FOR GOLD SKULLS
	function goldOutcome(randNum1, randNum2, randNum3, bet) {
		document.getElementById("win").volume = .5;
		//IT CALCULATES THE REWARD AHEAD OF TIME BY MULTIPLYING THE BET WITH THE REWARDS 
		//THESE ARE PUT INTO VARIABLES
		var gold1 = parseInt(oneGold) * parseInt(bet);
		
		var gold2 = parseInt(twoGold) * parseInt(bet);
		
		var gold3 = parseInt(threeGold) * parseInt(bet);
		
		//OUTCOMECOUNT IS A COUNTER THAT ALLOWS THE PROGRAM TOTELL HOW MANY SKULLS THERE ARE
		var outcomeCount = 0;
		
		$('[name="picture"]').each (function() {
			//IT LOOPS THROUGH THE PICTURES AND INCREMENTS OUTCOME COUNT 
			//EVERY TIME THE VALUE INPUT INTO THE HTML DATA ATTRIBUTE MATCHES SKULL
			
			if ($(this).attr("data-shapecolor") === "skull") {
  				outcomeCount= outcomeCount + 1;
  				
  				};
  				
  				
			})
			
			//IF STATEMENTS TO CALCULATE THE WIN BASED ON THE NUMBER OF OUTCOMECOUNT
			if (outcomeCount === 1) {
				$(credits).val(credTotal + gold1);
				$(message).html("you win " + gold1 + " credits!");
				document.getElementById("win").play();
				
			
			}
			
			else if (outcomeCount === 2) {
				$(credits).val(credTotal + gold2);
				$(message).html("you win " + gold2 + " credits!");
				document.getElementById("win").play();
				
			
			}
			
			else if (outcomeCount === 3) {
				$(credits).val(credTotal + gold3);
				$(message).html("you win " + gold3 + " credits!");
				document.getElementById("win").play();
				
			};
			//at the end of the game the current state of the game is saved	
			 save();
			
						
			
	};
	

	
	//NORMAL OUTCOME
	function normalOutcome(randNum1, randNum2, randNum3, bet) {
		document.getElementById("win").volume = .5;
		var creds = $(credits).val();
		//CALCULATES PRIZES FIRST AGAIN
		var prize1 = parseInt(shapeWin) * parseInt(bet);
		
		var prize2 = parseInt(colorWin) * parseInt(bet);
		
		var prize3 = parseInt(shapecolorWin) * parseInt(bet);
			//VARIABLES FOR ALL THE DIFFERENT ELEMENTS THAT DETERMINES WINS
			var shape1 = $(picOne).attr("data-shape");
			
			var shape2 = $(picTwo).attr("data-shape");
			
			var shape3 = $(picThree).attr("data-shape");
	
			var color1 = $(picOne).attr("data-color");
			
			var color2 = $(picTwo).attr("data-color");
			
			var color3 = $(picThree).attr("data-color");
	
			var shapeColor1 = $(picOne).attr("data-shapecolor");
			
			var shapeColor2 = $(picTwo).attr("data-shapecolor");
			
			var shapeColor3 = $(picThree).attr("data-shapecolor");
	
			//CHECKS ALL THE DIFFERENT FACTORS WITH IF STATEMENTS TO DETERMINE SCORE
			if (shape1 === shape2 && shape2 === shape3)
				{
					$(credits).val(credTotal + prize1);
					$(message).html("you win " + prize1 + " credits!");
		
			
					document.getElementById("win").play();
				
				}
			else if (color1 === color2 && color2 === color3)
				{
					$(credits).val(credTotal + prize2);
					$(message).html("you win " + prize2 + " credits!");
				
					document.getElementById("win").play();
				
				}
				
			else if (shapeColor1 === shapeColor2 && shapeColor2 === color3)
				{
					$(credits).val(credTotal + prize3);
					$(message).html("you win " + prize3 + " credits!");
			
					document.getElementById("win").play();
				
				}
				
				else {
					$(message).html("YOU LOSE");
				};		
				//at the end of the game the current state of the game is saved		
				 save();
	};
	
	//FUNCTION TO CASH OUT CREDITS
	function cashIt() {
		
		//Endcreds is used just to help output a message to the player telling how much they won
		var endcreds = $(credits).val();
		alert("You cashed out with " + endcreds + " credits!"); 
		//LOCAL STORAGE CLEARS OUT ALL ITEMS AND SETS UI TO DEFAULT
		localStorage.removeItem('keyName');
		
		localStorage.removeItem("credits");
		
		 $('input[name=bet]:checked').val(1);
		 
		localStorage.removeItem("pict1");
	
		localStorage.removeItem("pict2");
	
		localStorage.removeItem("pict3");
		localStorage.removeItem("storageCheck");
		
		localStorage.setItem('storageCheck', 0);
		//AND CLEARS THE VALUES
		$(credits).val(0);
		$(picOne).attr('src',pic[0].image);
		$(picTwo).attr('src',pic[0].image);
		$(picThree).attr('src',pic[0].image);
			$(message).html("Please deposit some credits, make a bet, and press play!")
		document.getElementById("cash").volume = .5;
		document.getElementById("cash").play();
		 
	};
	

					
	//FUNCTION TO SAVE
	function save(){
	

		//PUTS VALUES IN LOCAL STORAGE
		
		
		var creds = $(credits).val();
		//THIS IS A SAFETY TO MAKE SURE THAT IF THE CREDITS ENDS UP NULL IT'S SET TO ZERO INSTEAD
		if (creds === "") {
			creds === 0;
		}
		localStorage.setItem("credits", creds);
		//TO SAVE THE PICTURES I DIRECTLY PUT THE SRC TO LOCAL STORAGE
		localStorage.setItem("pict1", $('#pic1').attr('src'));
	
		localStorage.setItem("pict2", $('#pic2').attr('src'));
	
		localStorage.setItem("pict3", $('#pic3').attr('src'));
		//STORAGECHECK IS A FLAG USED TO TELL IF THERE IS SAVE INFORMATION THE NEXT TIME THE WINDOW LOADS.
		 localStorage.setItem('storageCheck', 1);
	};
	//function for loading values
	function load() {
		
		var credGet = (localStorage.getItem('credits'));
		
		//ANOTHER IF ELSE MEASURE TO MAKE SURE THE CREDITS IN THE INPUT WONT BE NULL
		if (credGet === "" || credGet === null || credGet === undefined) {
			$(credits).val(0);
		}
		
		else {
		$(credits).val(credGet);
		}
		//THIS SETS THE VALUES FROM THE SAVE FUNCTION TO THE MARKUP
		var picA = (localStorage.getItem('pict1'));
		var picB = (localStorage.getItem('pict2'));
		var picC = (localStorage.getItem('pict3'));
		$('#pic1').attr('src',picA);
		$('#pic2').attr('src',picB);
		$('#pic3').attr('src',picC);
	
		$(credits).val(credGet);
		var creds = $(credits).val();
		
		//This is again to make sure there's atleast zero in the credits input
		if ($(credits).val() === "") {
				$(credits).val(0)
		}
	
					
		
	
	};
	
	function introAnimation() {
	var flag = $("#startIt").val("data-flag");
	
		$("#intro").fadeIn('slow');
		$("#skipIt").fadeIn('slow');
		$("#skipIt").bind("click", function () {
		
		$("#startIt").data("flag", 1);
			$("#startIt").fadeOut('slow');
			$("#skipIt").fadeOut('slow');
			$(".intro").fadeOut('slow');
			$("#wholething").fadeIn('slow');
			$("#entire").addClass("full");
			document.getElementById("start").play();	
			document.getElementById("start").volume = .2;
		});
		if (flag === 0) {
		setTimeout(function() {
			
						$("#startIt").fadeOut('slow');
			$("#skipIt").fadeOut('slow');
			$("#intro").fadeOut('slow');
			$("#wholething").fadeIn('slow');
			$("#entire").addClass("full");
			document.getElementById("start").play();	
			document.getElementById("start").volume = .2;
			$(".intro").fadeOut('slow');
		},45000);

		};
	};

function better() {
				$('[name="bet"]').removeClass("miniButton2");
				var getBet = $(this).data('value');
				$('.bet').data("bet", getBet);
				$(this).addClass("miniButton2");
				var bet = $('.bet').data("bet");
		
			};
			
	
$(document).ready(function(){
		 $('[name="bet"]').bind("click", better);
		
		$(".blackbox").addClass("wholething2");
		$("#skipIt").hide();
			
			$("#full").addClass("wholething2");
			
			$("#wholething").hide();
			$("#intro").hide();
			$( "#audioDiv" ).hide()
		 			 
		 			 
		 introAnimation();
		 			 
	$("#startIt").bind("click", function () {
		
		
		
		
		
		});
	
	 
	 var checkStorage = localStorage.getItem('storageCheck');
	 //THIS CHECKS IF THERE IS A SAVE FILE PRESENT IN THE LOCAL STORAGE
	 //CHECKSTORAGE IS A VARIABLE FROM THE LOCAL STORAGE MEANT AS A FLAG TO TELL IF THERE LOCAL STORAGE
	if	(checkStorage != 1)	{
	
				localStorage.removeItem('keyName');
				localStorage.removeItem("credits");
	
				localStorage.removeItem("pict1");
	
				localStorage.removeItem("pict2");
	
				localStorage.removeItem("pict3");
				localStorage.removeItem("userName");
				//AND CLEARS THE VALUES
				$(credits).val(0);
				$(picOne).attr('src',pic[0].image);
				$(picTwo).attr('src',pic[0].image);
				$(picThree).attr('src',pic[0].image);
				
				
			//IF THIS IS CLEARED THE INTRO STARTS AS NORMAL	
			}	
			
		else	{
	
				
				load();	
			
				
		};
	//This checks if there are already credits in the machine and binds the play button early if so
		$(playButton).bind('click', getBet);

		$('[name="creds"]').click(function(){
		$('[name="creds"]').removeClass('miniButton2');
		$(this).addClass('miniButton2');
		var depositSum = $(this).data("val");
		
		 credDeposit(depositSum);
		
		} );
   		
		
			
			//THIS NEXT BLOCK OF CODE IS A BUFFER TO PREVENT MISTAKES WITH THE LOCALSTORAGE
			
			
			//IF THE LOCAL STORAGE ID IS EITHER NULL, UNDEFINED, OR IS AN EMPTY SPACE EVERYTHING IS RESET
			//THIS IS TO MAKE SURE THAT VALUES CAN ONLY BE SAVED WITH A VALID USERNAME
		
	//THIS SETS CASHOUT BUTTON
	$(cashOut).bind("click", function () {
									
						
									cashIt();
						
								}
							);

	
//This sets the default for the status text. 
	$(message).html("Please deposit some credits, make a bet, and press play!");
	
	//THIS SETS HOVERS FOR THE TWO BUTTONS
	$(".playbutton").hover(
						  function () {
							  	$(playButton).removeClass('playbutton');
								$(this).addClass('playbutton2');
								$(".playButton2 h3").css({'color':'#CCCCCC'});
						  }, 
						  function () {
								$(this).removeClass('playbutton2');
								$(playButton).addClass('playbutton');
								$(".playButton h3").css({'color':'#353333'});
						  }
		 			 );

	$(".cashbutton").hover(
						  function () {
							  	$(cashOut).removeClass('cashbutton');
								$(this).addClass('cashbutton2');
								$(".cashButton2 h3").css({'color':'#CCCCCC'});
						  }, 
						  function () {
								$(this).removeClass('cashbutton2');
								$(cashOut).addClass('cashbutton');
								$(".cashButton h3").css({'color':'#353333'});
						  }
		 			 );

		
	
	//THIS FUNCTION IS FOR DEPOSITING CREDITS WITH THE DROPDOWN
	function credDeposit(depositSum) {
		
		
		//THIS MAKES SURE THAT THE PALYER CAN ONLY PUT CREDITS IN THE MACHINE ONCE 
		if ($(credits).val() > 0)
		{
			//IF THERE ARE ALREADY CREDITS PRESENT IT RETURNS THE PROGRAM
			$(message).html("You already have credits!");
			return;
		}
		
		else {
			//OTHERWISE THE CREDITS ARE CALCULATED AND PUT INTO THE MACHINE
			//var depositInput = $('#deposit option:selected').val();
		
			var credAdd = $(credits).val();
		
			$(credits).val(parseInt(credAdd)+parseInt(depositSum));
	
			credTotal = credTotal + depositSum;
			
			/*document.getElementById('play').onclick = getBet;*/
		};
		
	//	document.getElementById('deposit').onchange = null;
					
	};
		
					
//THIS IS A FUNCTION THAT GRABS THE BUT WHEN THE PLAY BUTTON IS CLICKED
function getBet() {
		
		//THIS IS MY MEASURE TO PREVENT THE GAME FROM BEING PLAYED WITHOUT CREDITS OR BET. 
		
		
			//THIS CODE CALCULATES THE PROJECTED OUTCOME IF THE GAME WERE TO BE PLAYED
			
			var bet = $('.bet').data('bet');
			
			var creds = $(credits).val()
		
			var credSum = parseInt(creds) - parseInt(bet);
		//IF CREDITS EQUALS ZERO THEN THE GAME REFUSES TO RUN
		if ($(credits).val() === 0) {
			$(message).html("Please deposit credits!");
			return;
		}
		//IF NO BET IS CHOSEN THEN THE PROGRAM ALSO ABORTS
		else {
		var bet = $('.bet').data('bet');
			if (bet === undefined) {
			$(message).html("Please Choose a bet!");
			return;
		
		} 
		 //THIS IS TO ACCOUNT FOR THE PLAYER HAVING CREDITS, BUT NOT ENOUGH FOR THEIR BET
		 //IT TAKES THE PROJECTED OUTCOME OF THE GAME AND CHECKS IF IT'S LESS THAN ZERO.
		 //THE PRIMARY PURPOSE OF THIS IS ACTUALLY TO PREVENT THE CREDITS FROM GOING INTO NEGATIVE INTEGERS
		else if (credSum < 0) {
			var bet = $('.bet').data("bet");
			$(message).html("Not enough credits!");
			return;
		}
		
		//IF ALL THE CHECKPOINTS HAVE BEEN CLEARED THE GAME CAN RUN
			else {
			var bet = $('.bet').data('bet');
			//IT PASSES TO THE NEXT VARIABLE WITH THE BET
			spinSlots(bet);
		};
	};
};
	
		
	//THIS IS THE FUNCTION THAT SPINS THE SLOTS.
function spinSlots (bet) {
		document.getElementById("spin").volume = .6;
		
		//THIS IS A NESTED FUNCTION TO ANIMATE THE SPINNING
		function animateSlots()	
		
			{
				//THE SOUND EFFECT FOR THE SPINNING
				document.getElementById("spin").play();
				//THIS MESSAGE ONLY APPEARS WHILE IT'S SPINNING
				$(message).html("Spinning!");
				
				//THE PROGRAM GENERATES A RANDOM NUMBER BETWEEN 1 AND 19
				var randNumA = Math.floor(Math.random() * 19) +1;
	
				var randNumB = Math.floor(Math.random() * 19) +1;
	
				var randNumC = Math.floor(Math.random() * 19) +1;
	 
			
				//AND THEN ACCESSES THE OBJECT WITH THE CORRESPONDING SVG
				$(picOne).attr('src',pic[randNumA].image);
	
						//THESE ARE THE VALUES USED TO DETERMIN WINS, STORED IN THE HTML CUSTOM ATTRIBUTES PARCELED WITH JQUERY
						$(picOne).attr("data-shape", pic[randNumA].shape)
	
						$(picOne).attr("data-color", pic[randNumA].color)
	
						$(picOne).attr("data-shapecolor", pic[randNumA].shapeColor)
	
						$(picOne).attr("data-num", randNumA)
				
				$(picTwo).attr('src',pic[randNumB].image);
	
						$(picTwo).attr("data-shape", pic[randNumB].shape)
	
						$(picTwo).attr("data-color", pic[randNumB].color)
	
						$(picTwo).attr("data-shapecolor", pic[randNumB].shapeColor)
				
						$(picTwo).attr("data-num", randNumB)
	
				$(picThree).attr('src',pic[randNumC].image);
	
						$(picThree).attr("data-shape", pic[randNumC].shape)
	
						$(picThree).attr("data-color", pic[randNumC].color)
	
						$(picThree).attr("data-shapecolor", pic[randNumC].shapeColor)
				
						$(picThree).attr("data-num", randNumC)
			
						//alert('done');
				
				};
				
	
		
		//THIS SETS THE VALUES FOR TIMER FOR THE ANIMATION TO RUN
		var startTimer = 150;
		
		var endTimer = 2600;
		
		//THIS CALCULATES AND INPUTS THE NEW TOTAL OF CREDITS
		credTotal = $(credits).val();
		
		credTotal = credTotal - bet;
		
		$(credits).val(credTotal);
		
		//THIS SETS THE TIMER
		var timer = window.setInterval(animateSlots, startTimer);
		//AND THIS RUNS IT
		setTimeout(stopSlots, endTimer); 
		
		//THIS STOPS THE SLOT MACHINE AND RUNS THE OUTCOMES
		function stopSlots() {
			clearInterval(timer);
			var randNum1 = $(picOne).attr("data-num");
	
			var randNum2 = $(picTwo).attr("data-num");
	
			var randNum3 = $(picThree).attr("data-num");
		
			  outcome(randNum1, randNum2, randNum3, bet) //works
			
			
		};
	
		
		
	};
	
	

	
		

	});