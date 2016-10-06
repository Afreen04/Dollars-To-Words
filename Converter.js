var myApp = angular.module('myApp', []);

var toWords= function(num)
{
	num = parseInt(num);
	console.log("Integer Num =" + num);
	var answerString = "";
	while(num>0)
	{
		var numberWord = "";
		var temp = num%10;
		temp  = Math.floor(temp);
		console.log("Temp ="+temp);
		switch(temp)
		{
			case 1: numberWord = "one "; break;
			case 2: numberWord += "two "; break;
			case 3: numberWord += "three "; break;
			case 4: numberWord += "four "; break;
			case 5: numberWord += "five "; break;
			case 6: numberWord += "six "; break;
			case 7: numberWord += "seven "; break;
			case 8: numberWord += "eight "; break;
			case 9: numberWord += "nine "; break;
			default: break;

		}
		num/=10;
		answerString = numberWord + answerString;
		console.log("NumberWord = "+numberWord);
		console.log("answerString = "+answerString);		
	}

	
}

var splitNum = function(number)
{	
	var output = "";
	var tempNum = number;
	tempNum = (number + "").split("-");
	if(tempNum.length>1)
	{
		output+='Minus ';
		number = tempNum[1];
	}
	number = (number + "").split(".");
	var intNum = parseFloat(number[0]);   //Integer Part
	toWords(intNum);
	var decNum = parseFloat(number[1]);   //Decimal Part
	console.log(output);
	console.log(intNum);
	console.log(decNum);
	return number;
}

//PUT IN FILTER TO TAKE OUT COMMAS

myApp.filter('parseCheck',function()
	{
		return function (input, uppercase) {

			var re = new RegExp("[0-9]*\.[0-9]*");
			var match1 = input.match(/ *-{0,1}[0-9]*\.[0-9]{0,2} */); 
			var match2 = input.match(/ *[ a-zA-Z]* */);
			var andMatch = input.match(/[aA][nN][dD]/g);
			if(match1 && match1[0].length == input.length)   //Check if only numbers
				{
					splitNum(input);
					return match1[0];
				}
			else if(match2 && match2[0].length == input.length && andMatch.length == 1)   //Check if words with single 'and'
				return input;
			else
			return 'Bad Input';

    }
	});

myApp.controller('MainCtrl', ['$scope', function ($scope) {
    
    $scope.text = '-003451.34';
    
}]) 