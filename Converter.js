var myApp = angular.module('myApp', []);

var tens = function(num)
{
	num = parseInt(num);
	switch(num)
		{
			case 1: return "ten "; break;
			case 2: return "twenty "; break;
			case 3: return "thirty "; break;
			case 4: return "forty "; break;
			case 5: return "fifty "; break;
			case 6: return "sixty "; break;
			case 7: return "seventy "; break;
			case 8: return "eighty "; break;
			case 9: return "ninety "; break;
			default: break;

		}
}

var tens10to19 = function(num)
{
	num = parseInt(num);
	switch(num)
		{
			case 0: return "ten "; break;
			case 1: return "eleven "; break;
			case 2: return "twelve "; break;
			case 3: return "thirteen "; break;
			case 4: return "fourteen "; break;
			case 5: return "fifteen "; break;
			case 6: return "sixteen "; break;
			case 7: return "seventeen "; break;
			case 8: return "eighteen "; break;
			case 9: return "nineteen " ; break;
			default: break;

		}
};

var toWords= function(num)
{
	num = parseInt(num);
	//console.log("Integer Num =" + num);
	var answerString = "";
	var digitNo=1;
	thousandsPrinted = false;
	while(num>0)
	{
		var numberWord = "";
		var temp = num%10;
		temp  = Math.floor(temp);
		//console.log("Temp ="+temp);
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
		if(numberWord != "") //There was a match
		{
		if(digitNo == 1 || digitNo == 4)     // ones place
			{
				if(num>0 && Math.floor(num%10) == 1)
				{
					numberWord = tens10to19(temp);
					//console.log("Bigger Temp "+ temp);

						if(digitNo == 4 && !thousandsPrinted)
							{answerString = numberWord + "thousand " + answerString;	
							thousandsPrinted= true;
							}
						else						
							answerString = numberWord + answerString;

					num/=10;  //Because we will process one extra;
					digitNo++;
				}
				else
				{                          //The situation when it is not in teens
				if(digitNo == 4 && !thousandsPrinted)
					{answerString = numberWord + "thousand " + answerString;	
					thousandsPrinted= true;
					}
				else						
					answerString = numberWord + answerString;
				}	
		}
		else if (digitNo == 3 || digitNo == 6) {                  //hundreths place
			if(digitNo==6 && !thousandsPrinted)
				{answerString = numberWord + "hundred thousand " + answerString;
				thousandsPrinted= true;
				}
			else
				answerString = numberWord + "hundred " + answerString;
		}
		else if(digitNo == 7)                                  //1 Million place
		{
			answerString = numberWord + "million " + answerString;
		}
		else                                                  //Tens Place
		{
				if(digitNo == 5 && !thousandsPrinted)
				{
					answerString = tens(temp) + "thousand " + answerString; 
					thousandsPrinted= true;
				}
				else
					answerString = tens(temp) + answerString;
		}
		//console.log("NumberWord = "+numberWord);

		}
		digitNo++;	
			
	}
	//console.log("answerString = "+answerString);
	return answerString;
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

var splitNum = function(number)
{	
	var output = "";
	var tempNum = number;
	tempNum = (number + "").split("-");
	if(tempNum.length>1)
	{
		output+="Minus ";
		number = tempNum[1];
	}
	number = (number + "").split(".");
	
	var intNum = parseFloat(number[0]);   //Integer Part
	var dollarsString = toWords(intNum);
	if(dollarsString == "")
		output+="Zero dollars ";
	else if(dollarsString == "one ")
		output+=dollarsString + "dollar "
	else
		output+=toWords(intNum) + "dollars ";
	
	if(number[1].length == 1) //Zero to be added before processing
		{
			number[1]+="0";
		}
	var decNum = parseFloat(number[1]);   //Decimal Part
	
	var decNumWords = toWords(decNum);
		if(decNumWords == "one ")
			output += "and " + decNumWords + " cent";	
		else if(decNumWords == "")
			output += "and zero cents";
		else
			output += "and " + decNumWords + " cents";

	output = capitalizeFirstLetter(output);
	return output;
}

var returnWords = function(tempstr)
{
	var re = / /;
	tempstr = tempstr.split(re);
	return tempstr;
	
};

var parseDollars = function(numStr,dollars)
{
	var output = "";
	var tempNum = numStr;
		if(dollars)             //Means matched to dollars not dollar, dollars=true
			tempNum = numStr.split("dollars");
		else
			{
				tempNum = numStr.split("dollar");	
				var oneMatch = tempNum[0].match(/ *one */);		
				console.log("oneMatch " + oneMatch);
				if(oneMatch && oneMatch[0].length == tempNum[0].length)
					return 1;
				else
					return "Should be dollar(s)";
			}
	var millionMatch = tempNum[0].match(/millions?/);
	var thousandMatch = tempNum[0].match(/thousands?/);
	var oneMatch2 = tempNum[0].match(/ *one */);
	if((millionMatch && millionMatch.length > 1 && millionMatch[0].length != 7) ||(thousandMatch && thousandMatch.length > 1 && thousandMatch.length
	!=8)) ///Appears more than once, not correct
		return "Bad Input 3";
	if(millionMatch)
		{
			var millionString = tempNum[0].split("million");
			millionString = returnWords(millionString[0]);
			//millionString=millionString[0];
			console.log("millionString "+ millionString);
			if(millionString[0] != "one")
				return "Out of range";
			else
				ouput = "one million ";
		}
	if(oneMatch2[0].length == tempNum[0].length)   //For case: "one Dollars"
		return "Should be dollar";
	return "Temporary Dollar output";
}

var splitString = function(numStr)
{
	numStr = numStr.toLowerCase();
	var dollarMatch = numStr.match(/dollars?/);
	var centMatch = numStr.match(/cents?/);
	if(!dollarMatch)		//Should have dollar value
		return "Bad Input";		
	if(!centMatch)				//Should have cents value
		return "Bad Input";
	var output = "";

	//Add minus condition here

	numStr = numStr.split("and");
	var dollarsString = numStr[0];
	var centsString = numStr[1];
	console.log("dollarsString " + dollarsString);
	console.log("centsString "+ centsString);
	console.log("dollarMatch "+ dollarMatch[0].length);
	
	if(dollarMatch[0].length > 6)
		output+=parseDollars(dollarsString, true).toString();
	else
		output+=parseDollars(dollarsString, false).toString();
	return output;
}

myApp.filter('parseCheck',function()
	{
		return function (input) {

			var re = new RegExp("[0-9]*\.[0-9]*");
			var match1 = input.match(/ *-{0,1}[1]?[0-9]{0,6}\.[0-9]{0,2} */); //Perfect check for range between -1 Million to + 1 Million
			var match2 = input.match(/ *[ a-zA-Z]* */);
			var andMatch = input.match(/[aA][nN][dD]/g);
			var multipleSpaceMatch = input.match(/[a-zA-Z] {2,}[a-zA-Z]/);
			if(match1 && match1[0].length == input.length)   //Check if only numbers
				{			
					return splitNum(input);
				}
			else if(multipleSpaceMatch)
				return "Too many spaces";
			else if(match2 && match2[0].length == input.length && andMatch.length == 1)   //Check if words with single 'and'
				{
				//return input;
				return splitString(input);
				}
			else
				return 'Bad Input';

    }
	});


myApp.controller('MainCtrl', ['$scope', function ($scope) {
    
    $scope.inputText = "0.0";
    
}]) 

//Add test for if it is in range