$(document).ready(() => {
  document
    .querySelector("#modalFechaHora")
    .addEventListener("show.bs.modal", function () {
      const fechaHoraActual = moment();

      document.querySelector("#fecha").value =
        fechaHoraActual.format("YYYY-MM-DD");
      document.querySelector("#fecha").min =
        fechaHoraActual.format("YYYY-MM-DD");

      fechaHoraActual.add(1, "m");
      document.querySelector("#hora").min = fechaHoraActual.format("HH:mm");

      fechaHoraActual.hours(fechaHoraActual.hours() + 1);
      fechaHoraActual.minutes(0);
      document.querySelector("#hora").value = fechaHoraActual.format("HH:mm");
    });


});

function checkInput() {
  var input = document.getElementById("contenido").value.trim();
  var button = document.getElementById("crearTarea");

  if (input.length > 0) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}
