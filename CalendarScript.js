// Define the month object
function Month() {
	this.name = "";
	this.number = NaN;
}

//Define the year collection
var year = [];

// Define the months of the year and add them to the year collection
var jan = new Month; jan.name = "January"; jan.number = 1; year.push(jan);
var feb = new Month; feb.name = "February"; feb.number = 2; year.push(feb);
var mar = new Month; mar.name = "March"; mar.number = 3; year.push(mar);
var apr = new Month; apr.name = "April"; apr.number = 4; year.push(apr);
var may = new Month; may.name = "May"; may.number = 5; year.push(may);
var jun = new Month; jun.name = "June"; jun.number = 6; year.push(jun);
var jul = new Month; jul.name = "July"; jul.number = 7; year.push(jul);
var aug = new Month; aug.name = "August"; aug.number = 8; year.push(aug);
var sep = new Month; sep.name = "September"; sep.number = 9; year.push(sep);
var oct = new Month; oct.name = "October"; oct.number = 10; year.push(oct);
var nov = new Month; nov.name = "November"; nov.number = 11; year.push(nov);
var dec = new Month; dec.name = "December"; dec.number = 12; year.push(dec);

// Sort year based on month name
function alphabetize(){
	year.sort(function(a,b){return a.name.localeCompare(b.name);});
	refreshDisplay();
}

// Sort year based on month number
function numerical(){
	year.sort(function(a,b){return a.number-b.number;});
	refreshDisplay();
}

// Adds the properly colored months to the display
function displayMonths(){
	var monthList = document.getElementById("monthList");
	
	for(var i = 0; i < year.length ; i++){
		var monthDiv = document.createElement("div");
		// Set month object to an attribute in the div for use in the click event
		monthDiv.month = year[i];
		monthDiv.innerHTML = year[i].name;
		// Check if this month is the current month and display it in red if it is, otherwise blue
		if(year[i] == BirthdayMonth.getMonth()){
			monthDiv.setAttribute("style", "background-color:red;border-style:solid;border-width:1px");
		} else {
			monthDiv.setAttribute("style", "background-color:deepskyblue;border-style:solid;border-width:1px");
		}
		monthDiv.addEventListener("click", clickListener, false);
		monthList.appendChild(monthDiv);
	}
}

// Triggers when a month is clicked
// Sets the current month to the one that was clicked and refreshes the display.
function clickListener(e){
	BirthdayMonth.setMonth(e.target.month);
	refreshDisplay();
}

// Removes the months from the display and calls displayMonths() again to have them appear in the proper order
function refreshDisplay(){
	var monthList = document.getElementById("monthList");
	while(monthList.hasChildNodes()){
		// Remove listeners from the node before removing it altogether
		monthList.firstChild.removeEventListener("click", clickListener, false);
		monthList.removeChild(monthList.firstChild);
	}
	
	displayMonths();
}

// BirthdayMonth module pattern
var BirthdayMonth = (function(){
	// private variable that stores the current month, defaults to April (my birth month)
	var currentMonth = apr;
	
	// public functions
	return {
		// Returns the current month
		getMonth:function(){
			return currentMonth;
		},
		// Sets the current month
		setMonth:function(newMonth){
			currentMonth = newMonth;
			console.log(newMonth.name + " has been set to the new birth month.");
		}
	};
}());