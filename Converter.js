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
	var checkNum = parseFloat(number);
	if(checkNum > 1000000.00)
		return "Out of Range";
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
	if(tempstr[0].length == 0)
		return tempstr.slice(1);
	return tempstr;
	
};

var returnNum1 = function(numStr)
{
	switch(numStr)
	{
		case "zero": return 0; break;
		case "one": return 1; break;
		case "two" : return 2; break;
		case "three" : return 3; break;
		case "four" : return 4; break;
		case "five" : return 5; break;
		case "six" : return 6; break;
		case "seven" : return 7; break;
		case "eight": return 8; break;
		case "nine" : return 9; break;
		default: return 0;
	}
}

var returnNum2 = function(numStr)
{
	switch(numStr)
	{
		case "ten" : return 10; break;
		case "eleven": return 11; break;
		case "twelve" : return 12; break;
		case "thirteen": return 13; break;
		case "fourteen": return 14; break;
		case "fifteen": return 15; break;
		case "sixteen": return 16; break;
		case "seventeen": return 17;break;
		case "eighteen": return 18; break;
		case "nineteen": return 19; break;
		case "twenty": return 20;break;
		case "thirty": return 30;break;
		case "forty": return 40; break;
		case "fifty": return 50;break;
		case "sixty": return 60; break;
		case "seventy": return 70;break;
		case "eighty": return 80; break;
		case "ninety": return 90; break;
		default: return 0;
	}
}

var returnNum3 = function(numStr)
{
	switch(numStr)
	{		
		case "twenty": return 20;break;
		case "thirty": return 30;break;
		case "forty": return 40; break;
		case "fifty": return 50;break;
		case "sixty": return 60; break;
		case "seventy": return 70;break;
		case "eighty": return 80; break;
		case "ninety": return 90; break;
		default: return 0;
	}
}

var processNum = function(numStr)
{  
	var hundredMatch = numStr.match(/hundred/);
	var outputNum = 0;
	var hundredValue;
	var notHundredValue;
	if(hundredMatch)
		{
			numStr = numStr.split("hundred");
			hundredValue = returnWords(numStr[0]);
			notHundredValue = returnWords(numStr[1]);
			console.log("Hundreds part"+" "+ hundredValue[0]+" "+returnNum1(hundredValue[0]));
			outputNum += returnNum1(hundredValue[0]) * 100;
		}
	else
	{
		notHundredValue = returnWords(numStr);
	}
			//console.log("notHundredValue[0] "+ notHundredValue[0]);
			//console.log("notHundredValue[1] "+ notHundredValue[1].length);
			if(notHundredValue[1].length > 0)
			{
				if(returnNum1(notHundredValue[0])!= 0 && returnNum2(notHundredValue[0])!= 0)
				{
					console.log("Error case");
					return "Bad Input9";
				}
				else 
				{
					if(returnNum3(notHundredValue[0]))     //twenty
					{
						outputNum+=returnNum3(notHundredValue[0]);
						if(returnNum1(notHundredValue[1]))    //one
							{
								outputNum+=returnNum1(notHundredValue[1]);
								console.log("outputNum1" + outputNum);
								return outputNum;	
							}
						else
							{
						return "Bad Input11";
					}

					}
					else
					{
						return "Bad Input10";
					}
				}
			}
			if(returnNum1(notHundredValue[0])) //one, two case
			{
				outputNum+=returnNum1(notHundredValue[0]);
				console.log("outputNum2" + outputNum);
				return outputNum;
			}
			else if(returnNum2(notHundredValue[0]))   // the teens case
			{
				outputNum+=returnNum2(notHundredValue[0]);
				console.log("outputNum3" + outputNum);
				return outputNum;
			}
			else
				return "Bad Input13";
			console.log("Not Hundreds part "+ notHundredValue);	
		
	
}

var parseCents = function(numStr,cents)
{
	var output = "Temporary cent output";
	var outputNum = 0;
	var tempNum = numStr
	if(cents)
		tempNum = numStr.split("cents");
	else
		{
			tempNum = numStr.split("cent");
			var oneMatch = tempNum[0].match(/ *one */);		
				console.log("oneMatch " + oneMatch);
			if(oneMatch != null)
				if(tempNum[0].length == oneMatch[0].length)
					return 1;
			else
				{
					console.log("It should be cent(s)");
					return "It should be cent(s)";
				}
		}
	var tempNum2 = tempNum[0];
	tempNum2 = returnWords(tempNum2);
	console.log("cents words ",tempNum[0]);
	if(tempNum2[2])
	{
		return "Bad Input 18";
	}
	else
		{outputNum = processNum(tempNum[0]);
			return outputNum;
		}
	return output;
}

var parseDollars = function(numStr,dollars)
{
	var output = "Temporary Dollar output";
	var outputNum = 0;
	var tempNum = numStr;
	console.log(" numStr"+ numStr);
		if(dollars)             //Means matched to dollars not dollar, dollars=true
			tempNum = numStr.split("dollars");
		else
			{
				tempNum = numStr.split("dollar");	
				var oneMatch = tempNum[0].match(/ *one */);		
				console.log("oneMatch " + oneMatch);
				if(oneMatch && oneMatch[0].length == tempNum[0].length)
					return 1;
				else           //Does not work?
					return "Should be dollar(s)";
			}
	var millionMatch = tempNum[0].match(/millions?/);
	var thousandMatch = tempNum[0].match(/thousands?/);
	var oneMatch2 = tempNum[0].match(/ *one */);
	if((millionMatch && millionMatch.length > 1 && millionMatch[0].length != 7) ||(thousandMatch && thousandMatch.length > 1 && thousandMatch.length
	!=8)) ///Appears more than once, not correct
		return "Bad Input 3";
	tempNum = tempNum[0];   //Now it has only the dollar string
	if(millionMatch)
		{
			console.log("tempNum[0] "+tempNum);
			var millionString = tempNum.split("million");
			console.log("millionString before return words"+ millionString[1]);
			tempNum = millionString[1];
			millionString = returnWords(millionString[0]);
			//millionString=millionString[0];
			console.log("millionString after return words"+ millionString);
			if(millionString[0] != "one")   // here add cents condition also
				{
					//alert("Out of range");
					return 2000000;
				}
			else
				{
				outputNum += 1000000;
				console.log("one million case detected");
				return outputNum;
				}
		}
	console.log("tempNum after million "+ tempNum);	
	if(thousandMatch)
	{
		var thousandsString =tempNum.split("thousand");
		tempNum = thousandsString[1];
		console.log("Thousands Part "+ thousandsString[0]);
		
		//CHECK IF NOT STRING

		var thousandNum = processNum(thousandsString[0]);
		if (typeof thousandNum === 'string' || thousandNum instanceof String)
		{
			return "Bad Input13";
		}
		else 
			outputNum+= thousandNum * 1000;
	}
	console.log("tempNum after thousand "+ tempNum);
	if(tempNum.length > 1)
	{
		console.log("It has a hundreds part left");
		console.log("onespart " +tempNum);
		var onesNum = processNum(tempNum);
		if(typeof onesNum === 'string' || onesNum instanceof String)
		{
			return "Bad Input 17";
		}
		else
			outputNum+=onesNum;
	}

	//FIX THIS LATER
	/*if(oneMatch2[0].length == tempNum.length)   //For case: "one Dollars"
		return "Should be dollar";
	*/
	return outputNum;
}

var splitString = function(numStr)
{
	numStr = numStr.toLowerCase();
	console.log("numStr at beginning " +numStr);
	var dollarMatch = numStr.match(/dollars?/);
	var centMatch = numStr.match(/cents?/);
	if(!dollarMatch)		//Should have dollar value
		return "Bad Input5";		
	if(!centMatch)				//Should have cents value
		return "Bad Input6";
	var output = "";	

	//Minus condition here
	var minusMatch = numStr.match(/minus/);

	if(minusMatch)
	{
		if(minusMatch.length == 1)
			output = "-";
		else if(minusMatch.length>1)   //minus minus
			return "Bad Input7"; 
		numStr = numStr.split("minus");
		numStr = numStr[1];				
	}
	console.log("numstr after minus"+ numStr);
	numStr = numStr.split(" and ");
	var dollarsString = numStr[0];
	var centsString = numStr[1];
	console.log("dollarsString " + dollarsString);
	console.log("centsString "+ centsString);
	console.log("dollarMatch "+ dollarMatch[0].length);
	
	//Hold the output in an float
	//If it is a string of any sort, it means there is problem
	var outputNum = 0;

	//DOLLAR PART
	if(dollarMatch[0].length > 6)
		outputNum=parseDollars(dollarsString, true);
	else
		outputNum=parseDollars(dollarsString, false);
	if (typeof outputNum === 'string' || outputNum instanceof String)
		return "Check Dollar part";
	if(outputNum > 1000000.00)
		return "Out of range";
	else
		output+=outputNum.toString();
	output+=".";

	//DO not process cents part if above result is string
	//CENTS PART

	if(centMatch[0].length > 4)
		outputNum = parseCents(centsString,true);
	else
		outputNum = parseCents(centsString,false);

	if (typeof outputNum === 'string' || outputNum instanceof String)
		return "Check Cents part";
	else
	{
		if(outputNum < 10)
			output+="0"+outputNum.toString();
		else
			output+=outputNum.toString();
	}

	return output;
}

myApp.filter('parseCheck',function()
	{
		return function (input) {

			var re = new RegExp("[0-9]*\.[0-9]*");
			var match1 = input.match(/ *-{0,1}[0-9]{0,7}\.[0-9]{0,2} */); //Perfect check for range between -1 Million to + 1 Million
			var match2 = input.match(/ *[ a-zA-Z]* */);
			var andMatch = input.match(/ [aA][nN][dD] /g);
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
				console.log("2nd Case match");
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
//Check for order of million thousand hundred match