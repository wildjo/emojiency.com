/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node slack_bot.js
    
# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "who are you?"

  The bot will tell you its name, where it is running, and for how long.

  Say: "Call me <nickname>"

  Tell the bot your nickname. Now you are friends.

  Say: "who am I?"

  The bot will tell you your nickname, if it knows one for you.

  Say: "shutdown"

  The bot will ask if you are sure, and then shut itself down.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit
    
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/





/*
 * Function to calculate the absolute difference in days, months and years between 2 days taking into account variable month lengths and leap years
 * It ignores any time component (ie hours, minutes and seconds)
 *
 * https://gist.github.com/adamphillips/612587
 *
 */
 
 
function dateDiffAdamPhillips(dt1, dt2)
{
    /*
     * setup 'empty' return object
     */
    var ret = {days:0, months:0, years:0};

    /*
     * If the dates are equal, return the 'empty' object
     */
    if (dt1 == dt2) return ret;

    /*
     * ensure dt2 > dt1
     */
    if (dt1 > dt2)
    {
        var dtmp = dt2;
        dt2 = dt1;
        dt1 = dtmp;
    }

    /*
     * First get the number of full years
     */

    var year1 = dt1.getFullYear();
    var year2 = dt2.getFullYear();

    var month1 = dt1.getMonth();
    var month2 = dt2.getMonth();

    var day1 = dt1.getDate();
    var day2 = dt2.getDate();

    /*
     * Set initial values bearing in mind the months or days may be negative
     */

    ret['years'] = year2 - year1;
    ret['months'] = month2 - month1;
    ret['days'] = day2 - day1;

    /*
     * Now we deal with the negatives
     */

    /*
     * First if the day difference is negative
     * eg dt2 = 13 oct, dt1 = 25 sept
     */
    if (ret['days'] < 0)
    {
        /*
         * Use temporary dates to get the number of days remaining in the month
         */
        var dtmp1 = new Date(dt1.getFullYear(), dt1.getMonth() + 1, 1, 0, 0, -1);

        var numDays = dtmp1.getDate();

        ret['months'] -= 1;
        ret['days'] += numDays;

    }

    /*
     * Now if the month difference is negative
     */
    if (ret['months'] < 0)
    {
        ret['months'] += 12;
        ret['years'] -= 1;
    }

    return ret;
}



// jsDate.js
// http://slingfive.com/pages/code/jsDate/jsDate.js

/*
Name: jsDate
Desc: VBScript native Date functions emulated for Javascript
Author: Rob Eberhardt, Slingshot Solutions - http://slingfive.com/
Note: see jsDate.txt for more info
*/

// constants
vbGeneralDate=0; vbLongDate=1; vbShortDate=2; vbLongTime=3; vbShortTime=4;  // NamedFormat
vbUseSystemDayOfWeek=0; vbSunday=1; vbMonday=2; vbTuesday=3; vbWednesday=4; vbThursday=5; vbFriday=6; vbSaturday=7;	// FirstDayOfWeek
vbUseSystem=0; vbFirstJan1=1; vbFirstFourDays=2; vbFirstFullWeek=3;	// FirstWeekOfYear

// arrays (1-based)
Date.MonthNames = [null,'January','February','March','April','May','June','July','August','September','October','November','December'];
Date.WeekdayNames = [null,'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];




Date.IsDate = function(p_Expression){
	return !isNaN(new Date(p_Expression));		// <-- review further
}

Date.CDate = function(p_Date){
	if(Date.IsDate(p_Date)){ return new Date(p_Date); }

	var strTry = p_Date.replace(/\-/g, '/').replace(/\./g, '/').replace(/ /g, '/');	// fix separators
	strTry = strTry.replace(/pm$/i, " pm").replace(/am$/i, " am");	// and meridian spacing
	if(Date.IsDate(strTry)){ return new Date(strTry); }

	var strTryYear = strTry + '/' + new Date().getFullYear();	// append year
	if(Date.IsDate(strTryYear)){ return new Date(strTryYear); }
	

	if(strTry.indexOf(":")){	// if appears to have time
		var strTryYear2 = strTry.replace(/ /, '/' + new Date().getFullYear() + ' ');	// insert year
		if(Date.IsDate(strTryYear2)){ return new Date(strTryYear2); }

		var strTryDate = new Date().toDateString() + ' ' + p_Date;	// pre-pend current date
		if(Date.IsDate(strTryDate)){ return new Date(strTryDate); }
	}
	
	return false;	// double as looser IsDate
	//throw("Error #13 - Type mismatch");	// or is this better? 
}
 


Date.DateAdd = function(p_Interval, p_Number, p_Date){
	if(!Date.CDate(p_Date)){	return "invalid date: '" + p_Date + "'";	}
	if(isNaN(p_Number)){	return "invalid number: '" + p_Number + "'";	}	

	p_Number = new Number(p_Number);
	var dt = Date.CDate(p_Date);
	
	switch(p_Interval.toLowerCase()){
		case "yyyy": {
			dt.setFullYear(dt.getFullYear() + p_Number);
			break;
		}
		case "q": {
			dt.setMonth(dt.getMonth() + (p_Number*3));
			break;
		}
		case "m": {
			dt.setMonth(dt.getMonth() + p_Number);
			break;
		}
		case "y":			// day of year
		case "d":			// day
		case "w": {		// weekday
			dt.setDate(dt.getDate() + p_Number);
			break;
		}
		case "ww": {	// week of year
			dt.setDate(dt.getDate() + (p_Number*7));
			break;
		}
		case "h": {
			dt.setHours(dt.getHours() + p_Number);
			break;
		}
		case "n": {		// minute
			dt.setMinutes(dt.getMinutes() + p_Number);
			break;
		}
		case "s": {
			dt.setSeconds(dt.getSeconds() + p_Number);
			break;
		}
		case "ms": {	// JS extension
			dt.setMilliseconds(dt.getMilliseconds() + p_Number);
			break;
		}
		default: {
			return "invalid interval: '" + p_Interval + "'";
		}
	}
	return dt;
}



Date.DateDiff = function(p_Interval, p_Date1, p_Date2, p_FirstDayOfWeek){
	if(!Date.CDate(p_Date1)){	return "invalid date: '" + p_Date1 + "'";	}
	if(!Date.CDate(p_Date2)){	return "invalid date: '" + p_Date2 + "'";	}
	p_FirstDayOfWeek = (isNaN(p_FirstDayOfWeek) || p_FirstDayOfWeek==0) ? vbSunday : parseInt(p_FirstDayOfWeek);	// set default & cast

	var dt1 = Date.CDate(p_Date1);
	var dt2 = Date.CDate(p_Date2);

	// correct DST-affected intervals ("d" & bigger)
	if("h,n,s,ms".indexOf(p_Interval.toLowerCase())==-1){
		if(p_Date1.toString().indexOf(":") ==-1){ dt1.setUTCHours(0,0,0,0) };	// no time, assume 12am
		if(p_Date2.toString().indexOf(":") ==-1){ dt2.setUTCHours(0,0,0,0) };	// no time, assume 12am
	}


	// get ms between UTC dates and make into "difference" date
	var iDiffMS = dt2.valueOf() - dt1.valueOf();
	var dtDiff = new Date(iDiffMS);

	// calc various diffs
	var nYears  = dt2.getUTCFullYear() - dt1.getUTCFullYear();
	var nMonths = dt2.getUTCMonth() - dt1.getUTCMonth() + (nYears!=0 ? nYears*12 : 0);
	var nQuarters = parseInt(nMonths / 3);	//<<-- different than VBScript, which watches rollover not completion
	
	var nMilliseconds = iDiffMS;
	var nSeconds = Math.round(iDiffMS / 1000);
	var nMinutes = Math.round(nSeconds / 60);
	var nHours = Math.round(nMinutes / 60);
	var nDays  = Math.round(nHours / 24);	// <-- now fixed for DST switch days
	var nWeeks = Math.round(nDays / 7);


	if(p_Interval.toLowerCase()=='ww'){
			// set dates to 1st & last FirstDayOfWeek
			var offset = Date.DatePart("w", dt1, p_FirstDayOfWeek)-1;
			if(offset){	dt1.setDate(dt1.getDate() +7 -offset);	}
			var offset = Date.DatePart("w", dt2, p_FirstDayOfWeek)-1;
			if(offset){	dt2.setDate(dt2.getDate() -offset);	}
			// recurse to "w" with adjusted dates
			var nCalWeeks = Date.DateDiff("w", dt1, dt2) + 1;
	}
	// TODO: similar for 'w'?
	
	
	// return difference
	switch(p_Interval.toLowerCase()){
		case "yyyy": return nYears;
		case "q": return nQuarters;
		case "m":	return nMonths;
		case "y":			// day of year
		case "d": return nDays;
		case "w": return nWeeks;
		case "ww":return nCalWeeks; // week of year	
		case "h": return nHours;
		case "n": return nMinutes;
		case "s": return nSeconds;
		case "ms":return nMilliseconds;	// not in VBScript
		default : return "invalid interval: '" + p_Interval + "'";
	}
}




Date.DatePart = function(p_Interval, p_Date, p_FirstDayOfWeek){
	if(!Date.CDate(p_Date)){	return "invalid date: '" + p_Date + "'";	}

	var dtPart = Date.CDate(p_Date);
	
	switch(p_Interval.toLowerCase()){
		case "yyyy": return dtPart.getFullYear();
		case "q": return parseInt(dtPart.getMonth() / 3) + 1;
		case "m": return dtPart.getMonth() + 1;
		case "y": return Date.DateDiff("y", "1/1/" + dtPart.getFullYear(), dtPart) + 1;	// day of year
		case "d": return dtPart.getDate();
		case "w": return Date.Weekday(dtPart.getDay()+1, p_FirstDayOfWeek);		// weekday
		case "ww":return Date.DateDiff("ww", "1/1/" + dtPart.getFullYear(), dtPart, p_FirstDayOfWeek) + 1;	// week of year
		case "h": return dtPart.getHours();
		case "n": return dtPart.getMinutes();
		case "s": return dtPart.getSeconds();
		case "ms":return dtPart.getMilliseconds();	// <-- JS extension, NOT in VBScript
		default : return "invalid interval: '" + p_Interval + "'";
	}
}



Date.MonthName = function(p_Month, p_Abbreviate){
	if(isNaN(p_Month)){	// v0.94- compat: extract real param from passed date
		if(!Date.CDate(p_Month)){	return "invalid month: '" + p_Month + "'";	}
		p_Month = DatePart("m", Date.CDate(p_Month));
	}

	var retVal = Date.MonthNames[p_Month];
	if(p_Abbreviate==true){	retVal = retVal.substring(0, 3)	}	// abbr to 3 chars
	return retVal;
}


Date.WeekdayName = function(p_Weekday, p_Abbreviate, p_FirstDayOfWeek){
	if(isNaN(p_Weekday)){	// v0.94- compat: extract real param from passed date
		if(!Date.CDate(p_Weekday)){	return "invalid weekday: '" + p_Weekday + "'";	}
		p_Weekday = DatePart("w", Date.CDate(p_Weekday));
	}
	p_FirstDayOfWeek = (isNaN(p_FirstDayOfWeek) || p_FirstDayOfWeek==0) ? vbSunday : parseInt(p_FirstDayOfWeek);	// set default & cast

	var nWeekdayNameIdx = ((p_FirstDayOfWeek-1 + parseInt(p_Weekday)-1 +7) % 7) + 1;	// compensate nWeekdayNameIdx for p_FirstDayOfWeek
	var retVal = Date.WeekdayNames[nWeekdayNameIdx];
	if(p_Abbreviate==true){	retVal = retVal.substring(0, 3)	}	// abbr to 3 chars
	return retVal;
}


// adjusts weekday for week starting on p_FirstDayOfWeek
Date.Weekday=function(p_Weekday, p_FirstDayOfWeek){	
	p_FirstDayOfWeek = (isNaN(p_FirstDayOfWeek) || p_FirstDayOfWeek==0) ? vbSunday : parseInt(p_FirstDayOfWeek);	// set default & cast

	return ((parseInt(p_Weekday) - p_FirstDayOfWeek +7) % 7) + 1;
}





Date.FormatDateTime = function(p_Date, p_NamedFormat){
	if(p_Date.toUpperCase().substring(0,3) == "NOW"){	p_Date = new Date()	};
	if(!Date.CDate(p_Date)){	return "invalid date: '" + p_Date + "'";	}
	if(isNaN(p_NamedFormat)){	p_NamedFormat = vbGeneralDate	};

	var dt = Date.CDate(p_Date);

	switch(parseInt(p_NamedFormat)){
		case vbGeneralDate: return dt.toString();
		case vbLongDate:		return Format(p_Date, 'DDDD, MMMM D, YYYY');
		case vbShortDate:		return Format(p_Date, 'MM/DD/YYYY');
		case vbLongTime:		return dt.toLocaleTimeString();
		case vbShortTime:		return Format(p_Date, 'HH:MM:SS');
		default:	return "invalid NamedFormat: '" + p_NamedFormat + "'";
	}
}


Date.Format = function(p_Date, p_Format, p_FirstDayOfWeek, p_firstweekofyear) {
	if(!Date.CDate(p_Date)){	return "invalid date: '" + p_Date + "'";	}
	if(!p_Format || p_Format==''){	return dt.toString()	};

	var dt = Date.CDate(p_Date);

	// Zero-padding formatter
	this.pad = function(p_str){
		if(p_str.toString().length==1){p_str = '0' + p_str}
		return p_str;
	}

	var ampm = dt.getHours()>=12 ? 'PM' : 'AM'
	var hr = dt.getHours();
	if (hr == 0){hr = 12};
	if (hr > 12) {hr -= 12};
	var strShortTime = hr +':'+ this.pad(dt.getMinutes()) +':'+ this.pad(dt.getSeconds()) +' '+ ampm;
	var strShortDate = (dt.getMonth()+1) +'/'+ dt.getDate() +'/'+ new String( dt.getFullYear() ).substring(2,4);
	var strLongDate = Date.MonthName(dt.getMonth()+1) +' '+ dt.getDate() +', '+ dt.getFullYear();		//

	var retVal = p_Format;
	
	// switch tokens whose alpha replacements could be accidentally captured
	retVal = retVal.replace( new RegExp('C', 'gi'), 'CCCC' ); 
	retVal = retVal.replace( new RegExp('mmmm', 'gi'), 'XXXX' );
	retVal = retVal.replace( new RegExp('mmm', 'gi'), 'XXX' );
	retVal = retVal.replace( new RegExp('dddddd', 'gi'), 'AAAAAA' ); 
	retVal = retVal.replace( new RegExp('ddddd', 'gi'), 'AAAAA' ); 
	retVal = retVal.replace( new RegExp('dddd', 'gi'), 'AAAA' );
	retVal = retVal.replace( new RegExp('ddd', 'gi'), 'AAA' );
	retVal = retVal.replace( new RegExp('timezone', 'gi'), 'ZZZZ' );
	retVal = retVal.replace( new RegExp('time24', 'gi'), 'TTTT' );
	retVal = retVal.replace( new RegExp('time', 'gi'), 'TTT' );

	// now do simple token replacements
	retVal = retVal.replace( new RegExp('yyyy', 'gi'), dt.getFullYear() );
	retVal = retVal.replace( new RegExp('yy', 'gi'), new String( dt.getFullYear() ).substring(2,4) );
	retVal = retVal.replace( new RegExp('y', 'gi'), Date.DatePart("y", dt) );
	retVal = retVal.replace( new RegExp('q', 'gi'), Date.DatePart("q", dt) );
	retVal = retVal.replace( new RegExp('mm', 'gi'), (dt.getMonth() + 1) );	
	retVal = retVal.replace( new RegExp('m', 'gi'), (dt.getMonth() + 1) );	
	retVal = retVal.replace( new RegExp('dd', 'gi'), this.pad(dt.getDate()) );
	retVal = retVal.replace( new RegExp('d', 'gi'), dt.getDate() );
	retVal = retVal.replace( new RegExp('hh', 'gi'), this.pad(dt.getHours()) );
	retVal = retVal.replace( new RegExp('h', 'gi'), dt.getHours() );
	retVal = retVal.replace( new RegExp('nn', 'gi'), this.pad(dt.getMinutes()) );
	retVal = retVal.replace( new RegExp('n', 'gi'), dt.getMinutes() );
	retVal = retVal.replace( new RegExp('ss', 'gi'), this.pad(dt.getSeconds()) ); 
	retVal = retVal.replace( new RegExp('s', 'gi'), dt.getSeconds() ); 
	retVal = retVal.replace( new RegExp('t t t t t', 'gi'), strShortTime ); 
	retVal = retVal.replace( new RegExp('am/pm', 'g'), dt.getHours()>=12 ? 'pm' : 'am');
	retVal = retVal.replace( new RegExp('AM/PM', 'g'), dt.getHours()>=12 ? 'PM' : 'AM');
	retVal = retVal.replace( new RegExp('a/p', 'g'), dt.getHours()>=12 ? 'p' : 'a');
	retVal = retVal.replace( new RegExp('A/P', 'g'), dt.getHours()>=12 ? 'P' : 'A');
	retVal = retVal.replace( new RegExp('AMPM', 'g'), dt.getHours()>=12 ? 'pm' : 'am');
	// (always proceed largest same-lettered token to smallest)

	// now finish the previously set-aside tokens 
	retVal = retVal.replace( new RegExp('XXXX', 'gi'), Date.MonthName(dt.getMonth()+1, false) );	//
	retVal = retVal.replace( new RegExp('XXX',  'gi'), Date.MonthName(dt.getMonth()+1, true ) );	//
	retVal = retVal.replace( new RegExp('AAAAAA', 'gi'), strLongDate ); 
	retVal = retVal.replace( new RegExp('AAAAA', 'gi'), strShortDate ); 
	retVal = retVal.replace( new RegExp('AAAA', 'gi'), Date.WeekdayName(dt.getDay()+1, false, p_FirstDayOfWeek) );	// 
	retVal = retVal.replace( new RegExp('AAA',  'gi'), Date.WeekdayName(dt.getDay()+1, true,  p_FirstDayOfWeek) );	// 
	retVal = retVal.replace( new RegExp('TTTT', 'gi'), dt.getHours() + ':' + this.pad(dt.getMinutes()) );
	retVal = retVal.replace( new RegExp('TTT',  'gi'), hr +':'+ this.pad(dt.getMinutes()) +' '+ ampm );
	retVal = retVal.replace( new RegExp('CCCC', 'gi'), strShortDate +' '+ strShortTime ); 

	// finally timezone
	tz = dt.getTimezoneOffset();
	timezone = (tz<0) ? ('GMT-' + tz/60) : (tz==0) ? ('GMT') : ('GMT+' + tz/60);
	retVal = retVal.replace( new RegExp('ZZZZ', 'gi'), timezone );

	return retVal;
}



// ====================================

/* if desired, map new methods to direct functions
*/
IsDate = Date.IsDate;
CDate = Date.CDate;
DateAdd = Date.DateAdd;
DateDiff = Date.DateDiff;
DatePart = Date.DatePart;
MonthName = Date.MonthName;
WeekdayName = Date.WeekdayName;
Weekday = Date.Weekday;
FormatDateTime = Date.FormatDateTime;
Format = Date.Format;



/* and other capitalizations for easier porting
isDate = IsDate;
dateAdd = DateAdd;
dateDiff = DateDiff;
datePart = DatePart;
monthName = MonthName;
weekdayName = WeekdayName;
formatDateTime = FormatDateTime;
format = Format;

isdate = IsDate;
dateadd = DateAdd;
datediff = DateDiff;
datepart = DatePart;
monthname = MonthName;
weekdayname = WeekdayName;
formatdatetime = FormatDateTime;

ISDATE = IsDate;
DATEADD = DateAdd;
DATEDIFF = DateDiff;
DATEPART = DatePart;
MONTHNAME = MonthName;
WEEKDAYNAME = WeekdayName;
FORMATDATETIME = FormatDateTime;
FORMAT = Format;
*/

// jsDate.js

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var os = require('os');

var controller = Botkit.slackbot({
	json_file_store: './timebot_json_database',
    debug: true
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();


// written_month(String01-12)
// helper function for extracting the name of the month from a two-character string that represents the month
// takes an string in the format: 01, 02, 03 ... 11, 12
// returns a string such as "January"
// otherwise returns a string containing "Error"

function written_month(strint_month) {
		        
	        switch (strint_month) {
		        case "01":
		        return("January");
		        break;
		        case "02":
		        return("February");
		        break;
		        case "03":
		        return("March");
		        break;
		        case "04":
		        return("April");
		        break;
		        case "05":
		        return("May");
		        break;
		        case "06":
		        return("June");
		        break;
		        case "07":
		        return("July");
		        break;
		        case "08":
		        return("August");
		        break;
		        case "09":
		        return("September");
		        break;
		        case "10":
		        return("October");
		        break;
		        case "11":
		        return("November");
		        break;
		        case "12":
		        return("December");
		        break;
		        default:
		        return("Error");
		        break;
	        }

	}


// utility function to add an s to a word if the number it refers to is plural
// takes the integer number
// returns a string that is either "" (empty) or "s"

function add_s(num) {
	var ret_str = "s";
	if (num == 1) {
		ret_str = "";
		}
	return(ret_str);
	}
	
	
	

// calc_and_print_time(milliseconds)
// takes an integer: milliseconds
// returns a string containing a description of time in Years, Months, and Days.

function calc_and_print_time(dd, dd_now) {
	
	console.log("calc_and_print_time() entered.");
	
	var add_comma = false;

	var return_string = "";
	
	var ymd = dateDiffAdamPhillips(dd, dd_now);
	
	diff_years = ymd.years;
	diff_months = ymd.months;
	diff_days = ymd.days;
		
	if ( diff_years > 0 ) {
							
		return_string = return_string + diff_years.toString() + " year" + add_s(diff_years.toString());
		
		add_comma = true;
								
		}
			
	if ( diff_months > 0 ) {
				
		if (add_comma) {
			return_string = return_string + ", ";
			}
			
		return_string = return_string + diff_months.toString() + " month" + add_s(diff_months.toString());
					
		add_comma = true;
						
		}
		
	if ( diff_days > 0 || (diff_years == 0 && diff_months == 0 && diff_days == 0)) {
				
		if (add_comma) {
			return_string = return_string + ", ";
			}
			
		return_string = return_string + diff_days.toString() + " day" + add_s(diff_days.toString());
		
		add_comma = true; // in case we later want to add hours, minutes, seconds, etc, but currently unused further down
				
		}
	
	return(return_string);
	
	}


// Help message

controller.hears(['help'], 'direct_message, direct_mention, mention', function(bot, message) { 
		
	bot.reply(message, 'I accept dates in the past, in mm/dd/yyyy format. Include the words "set" and "date" in the command to activate. e.g. "Set the date to 10/11/2012."');
	bot.reply(message, 'Ask me who you are and I`ll remember your name. Try saying, "Who am I?"');
	bot.reply(message, 'Ask how many, or how long it`s been since the saved date and I`ll respond with the answer. You can ask how many days, weeks, months, years, or total. If you ask for a "total", I`ll respond with the length in years, months, and days. e.g. "How long is that in months?", or "How many months is that?", or "How long is that in total?"');
	bot.reply(message, 'Tell me to shutdown and I`ll turn myself off to save energy.');

	});
	
	
// Direct command to set date in "memory"
	
// This works great! captures [MM] [DD] [YYYY]
controller.hears(['[Set|set|Save|save].*date.*(0[1-9]|1[012])[- /.]([1-30]|0[1-9]|[12][0-9]|3[01])[- /.]([1-2][0-9][0-9][0-9])'], 'direct_message, direct_mention, mention', function(bot, message) { 
	
		
		controller.storage.users.get(message.user, function(err, user) {
	   	     if (!user) {
		     	user = { id: message.user, };
		     	}
		     	user.date_month = message.match[1];
		     	user.date_day = message.match[2];
		     	user.date_year = message.match[3];
		     	
		     	var d = new Date();
			 	d.setFullYear(parseInt(user.date_year), parseInt(user.date_month - 1), parseInt(user.date_day));
			 	d.setHours(0);
			 	d.setMinutes(0);
			 	d.setSeconds(0);
			 	d.setMilliseconds(1);

		     	if (d <= new Date()) {
			     
			     	bot.startConversation(message, function(err, convo) {
				     	if (!err) {
	                    	convo.ask('Should I save ' + written_month(user.date_month) + " " + user.date_day + ", " + user.date_year + " for you?" , [
	                            {
	                                pattern: 'yes',
	                                callback: function(response, convo) {
		                                
	                    		     	controller.storage.users.save(user, function(err, id) {
									 		bot.reply(message, 'Saved.');
									 		});
	
	                                    // since no further messages are queued after this,
	                                    // the conversation will end naturally with status == 'completed'
	                                    convo.next();
	                                }
	                            },
	                            {
	                                pattern: 'no',
	                                callback: function(response, convo) {
		                                bot.reply(message, 'I`ll forget you ever mentioned it.');
		                                
	                                    // stop the conversation. this will cause it to end with status == 'stopped'
	                                    convo.stop();
	                                }
	                            },
	                            {
	                                default: true,
	                                callback: function(response, convo) {
	                                    convo.repeat();
	                                    convo.next();
	                                }
	                            }
		                    	
		                    	]
		                    	);
				     	}
			     	
				     	});

		     		} else {
			     		bot.reply(message, "I'm sorry, I don't do time travel into the future.");
		     		}
			     	
     		});

	});
	
	
// What's saved?

controller.hears(['what','when'], 'direct_message, direct_mention, mention', function(bot, message) { 
	
		var the_name = "whoever you are";

		controller.storage.users.get(message.user, function(err, record) {
        	if (record && record.date_year) {
	        		        	
	        	if (record.name) {
		        	the_name = record.name;
		        	}
	        	
	            bot.reply(message, 'The date I am remembering is ' + written_month(record.date_month) + " " + record.date_day + ", " + record.date_year + ', ' + the_name + '.');
	                              
				} else {
	        
				bot.reply(message, 'I may not have that information. Type "help" for help.');
       	     
        		}
   			});

	   });



// Time from when? weeks, years, days, months, total

controller.hears(['How.*(many|long).*(week|year|day|month|total)'], 'direct_message, direct_mention, mention', function(bot, message) {
		
	controller.storage.users.get(message.user, function(err, record) {
    	if (record) {        	
        	if (record.name) {
	        	the_name = record.name;
	        	} else {
		        the_name = "whoever you are"; // No name saved
		        }
		        
		     if (record.date_year) { 
					var d = new Date();
					d.setFullYear(parseInt(record.date_year), parseInt(record.date_month - 1), parseInt(record.date_day));
							
					var d_now = new Date();
										
					exact_months_elapsed = DateDiff("m", d, d_now, 0);
											
					switch (message.match[2]) {
						
						case "day":
							var rounded_days = DateDiff("d", d, d_now, 0);
							bot.reply(message, 'It has been ' + rounded_days + ' day' + add_s(rounded_days) + ' since ' + Format(d, "dddd, mmmm d, yyyy", 0) + '.');
						break;
						
						case "week":
							var rounded_weeks = DateDiff("w", d, d_now, 0);				
							bot.reply(message, 'It has been about ' + rounded_weeks + ' week' + add_s(rounded_weeks) + ' since ' + Format(d, "dddd, mmmm d, yyyy", 0) + '.');			
						break;
						
						case "month":
							var rounded_months = DateDiff("m", d, d_now, 0);													
							bot.reply(message, 'It has been about ' + rounded_months + ' month' + add_s(rounded_months) + ' since ' + Format(d, "dddd, mmmm d, yyyy", 0) + '.');
						break;
						
						case "year":
							var rounded_years =DateDiff("yyyy", d, d_now, 0);	
							bot.reply(message, 'It has been about ' + rounded_years + ' year' + add_s(rounded_years) + ' since ' + Format(d, "dddd, mmmm d, yyyy", 0) + '.');
						break;
						
						case "total":
							bot.reply(message, 'It has been ' + calc_and_print_time(d, d_now) + ' since ' + Format(d, "dddd, mmmm d, yyyy", 0) + '.');
						break;
						
						default:
							bot.reply(message, 'Not quite sure what you`re getting at.')
						break;
						
						}
                              
			 	} else { // No date information
				 	
			 		bot.reply(message, 'I may not have that information. Type "help" for help.');
		    	}

			} else { // No record saved
				
				bot.reply(message, 'I may not have that information. Type "help" for help.');

			}

		});
		
	});






// Original howdybot commands

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });


    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hello.');
        }
    });
});

controller.hears(['call me (.*)', 'my name is (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
    var name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        controller.storage.users.save(user, function(err, id) {
            bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
        });
    });
});

controller.hears(['what is my name', 'who am i'], 'direct_message,direct_mention,mention', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name + ".");
        } else {
            bot.startConversation(message, function(err, convo) {
                if (!err) {
                    convo.say('I do not know your name yet!');
                    convo.ask('What should I call you?', function(response, convo) {
                        convo.ask('You want me to call you `' + response.text + '`?', [
                            {
                                pattern: 'yes',
                                callback: function(response, convo) {
                                    // since no further messages are queued after this,
                                    // the conversation will end naturally with status == 'completed'
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'no',
                                callback: function(response, convo) {
                                    // stop the conversation. this will cause it to end with status == 'stopped'
                                    convo.stop();
                                }
                            },
                            {
                                default: true,
                                callback: function(response, convo) {
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        convo.next();

                    }, {'key': 'name'}); // store the results in a field called nickname

                    convo.on('end', function(convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'OK! I will update my dossier....');

                            controller.storage.users.get(message.user, function(err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    };
                                }
                                user.name = convo.extractResponse('name');
                                controller.storage.users.save(user, function(err, id) {
                                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                                });
                            });



                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, nevermind!');
                        }
                    });
                }
            });
        }
    });
});



controller.hears(['shutdown'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.startConversation(message, function(err, convo) {

        convo.ask('Are you sure you want me to shutdown?', [
            {
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    convo.say('Bye!');
                    convo.next();
                    setTimeout(function() {
                        process.exit();
                    }, 3000);
                }
            },
        {
            pattern: bot.utterances.no,
            default: true,
            callback: function(response, convo) {
                convo.say('*Phew!*');
                convo.next();
            }
        }
        ]);
    });
});


controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', function(bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            ':robot_face: I am a bot named <@' + bot.identity.name +
             '>. I have been running for ' + uptime + ' on ' + hostname + '.');

    });

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}
