$(document).ready(function() {
var eventNum = 0;
// page is now ready, initialize the calendar...

$('#calendar').fullCalendar({
	// put your options and callbacks here
	contentHeight: 350,
	selectable: true,
	selectHelper: true,
	fixedWeekCount: false,
	
	select: function(start, end) {
		//eventOverlap: false,
		//var title = prompt('Event Title:');
		if(!(isOverlapping(start, end))){
			
			var eventData = {
					title: "FREE",
					start: start,
					end: end,
					id: eventNum
			};
			eventNum++;
			$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
		}
		$('#calendar').fullCalendar('unselect');
	},
	eventOverlap: false,
	editable: true,
	eventLimit: true,

	eventClick: function( calEvent, jsEvent, view ) {
		//window.confirm("Remove free block?");
		var r = confirm("Remove free block?");
		if (r == true) {
			console.log(calEvent.id);
   			$('#calendar').fullCalendar('removeEvents', [calEvent.id]);
		}
        // change the border color just for fun
        $(this).css('border-color', 'red');

    }

})

function isOverlapping(start, end){
    var array = $('#calendar').fullCalendar('clientEvents');
    for(i in array){
    	console.log("Start: " + array[i].start);
        if(!((array[i].start) >= end || array[i].end <= start)){
            return true;
        }
    }
    return false;
}


});

function removeAll(){
	$('#calendar').fullCalendar('removeEvents');
}

var tripArray=[];
var counter = 0;
function addDest(e){
	var loc = $('#loc1').val();
	var dur = $('#durr').val();
	if(loc !== "" && dur !== ""){
		tripArray[counter]={"loc":loc,"dur":dur};
		counter++;
		$('#loc1').val("");
		$('#durr').val("");
		var myDiv = $('<div>').append(loc + " ---- " + dur + " Days");
		$('#destForm').append(myDiv);
	}
}

var key = "ccaac64c-a47d-43a4-8e9f-61faf9296fcd";

var _MS_PER_DAY = 1000 * 60 * 60 * 24;
var durationAndDates = [];
// a and b are javascript Date objects
function dateDiffInDays(b, a) {
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function myFunction() {

	var timeBlocks = $('#calendar').fullCalendar('clientEvents');

	for (var i = 0; i < timeBlocks.length; i++) {
		durationAndDates[i] = {"e": timeBlocks[i], "d": dateDiffInDays(timeBlocks[i]._end._d, timeBlocks[i]._start._d)};
	}

	durationAndDates.sort(function(a, b) {return a.d - b.d;});
	tripArray.sort(function(l, d) {return l.dur - d.dur;});

	$('#removeMe').remove();
	console.log("HELLO 1");
	window.location = "results.html";
	console.log("HELLO 2");
	dispResults();
}

function dispResults() {
	console.log("hi");
	for (var j = 0; j < durationAndDates.length; j++) {
		var newDestination = $('<div>').append("HELLO");
		$('#resBody').append(newDestination);
		console.log("hi");
	}
}
