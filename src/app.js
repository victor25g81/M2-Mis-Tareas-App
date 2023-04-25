$(document).ready((event) => {
  $("#crearTarea").on("click", crearTarea);

  $("#fechaHora").datetimepicker({
    timeFormat: 'hh:mm',
    showSecond: false,
    showMillisec: false, // set to false to hide milliseconds
    showMicrosec: false, // set to false to hide microseconds
    controlType: 'select',
    oneLine: true
  });
});

function crearTarea(event) {
  event.preventDefault();

  $("#fechaHora").datetimepicker("show");
  
  console.log("ok");
}
