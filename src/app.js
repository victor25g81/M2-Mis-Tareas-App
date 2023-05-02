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

    $('#guardarTarea').on('click', guardarTarea)
});

function guardarTarea(event) {
    event.preventDefault();

    const contenido = $('#contenido').val();
    const fecha = $('#fecha').val();
    const hora = $('#hora').val();

    const tarea = new Tarea(contenido, fecha, hora);
    
    mostrarTarea(tarea);
}

function mostrarTarea(tarea){

    const tareasHoy = $('#tareasHoy');
    const liTarea =$('<li></li>');
    const checkboxTarea = $('<input type = "checkbox">');
    const botonEliminar = $('<button class="eliminar-tarea"><i class="fas fa-trash-alt"></i></button>');
    botonEliminar.on('click', function() {
        liTarea.remove();
    });
    liTarea.append(checkboxTarea);
    liTarea.append(tarea.contenido);
    liTarea.append(botonEliminar);
    tareasHoy.append(liTarea);
}

/*function mostrarTarea(tarea) {
    const tareasHoy = $('#tareasHoy');
    const liTarea = $('<li></li>');
    liTarea.text(tarea.contenido);
    tareasHoy.append(liTarea);
}
*/
function checkInput() {
  var input = document.getElementById("contenido").value.trim();
  var button = document.getElementById("crearTarea");

  if (input.length > 0) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}
