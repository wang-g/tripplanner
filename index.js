$(document).ready(function() {

// page is now ready, initialize the calendar...

$('#calendar').fullCalendar({
// put your options and callbacks here
contentHeight: 500,
selectable: true,
	selectHelper: true,
	select: function(start, end) {
		//eventOverlap: false,
		//var title = prompt('Event Title:');
		if(!(isOverlapping(start, end))){
			
			var eventData = {
					title: "FREE",
					start: start,
					end: end
			};
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
   			$('#calendar').fullCalendar('removeEvents', calEvent.id);
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
