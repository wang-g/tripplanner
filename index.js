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
	console.log("HELLO");
	$('#calendar').fullCalendar('removeEvents');
}

var tripArray=[];
var counter = 0;
function addDest(e){
	//e.preventDefault();
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
