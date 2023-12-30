// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('.saveBtn').click((event) => {
    const blockid = $(event.target).parent().attr('id')
    const value = $(`#${blockid} textarea`).val()
    localStorage.setItem(blockid, value)
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  const currentHour = dayjs().hour()
  $('.time-block').each(function() {
    let id = $(this).attr('id');
    $(`#${id}`).removeClass();
    if(currentHour == id.split("-").at(-1)){
      $(`#${id} textarea`).val("Current hour");
      $(`#${id}`).addClass("row time-block present");
    }else if(currentHour <= id.split("-").at(-1)){
      $(`#${id}`).addClass("row time-block future");
    }else if(currentHour >= id.split("-").at(-1)){
      $(`#${id}`).addClass("row time-block past");
    }
  });


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $('.time-block').each(function() {
    const blockId = $(this).attr('id');
    $(`#${blockId} textarea`).val(localStorage.getItem(blockId))
  })
  

  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").append(getCurrentDate())
});

function getCurrentDate(){
  // Days List
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  // Month list
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
                  , 'October', 'November', 'December']
  
  // Get day and month from the above list
  const currentDay = days[dayjs().day()]
  const currentMonth = months[dayjs().month()]
  
  // Logic for (st, nd, rd and th)
  let currentDate = dayjs().date().toString()
  currentDate += "th"
  if (currentDate < 10 || currentDate > 20) {
    if(currentDate.at(-1) === "1"){
      currentDate += "st"
    }else if(currentDate.at(-1) === "2"){
      currentDate += "nd"
    }else if(currentDate.at(-1) === "3"){
      currentDate += "rd"
    }
  }

  return `${currentDay}, ${currentMonth} ${currentDate}`
}