var myApp = angular.module('myApp', []);

var toWords= function(num)
{
	num = parseInt(num);
	console.log(num);
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
    
    $scope.text = '-1.34';
    
}]) 