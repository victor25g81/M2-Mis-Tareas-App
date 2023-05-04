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

    const template = `
    <div class="container" style="margin-top: 2px">
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="form-check">
                        <input class="form-check-input custom-control-input" type="checkbox" value="" id="defaultCheck1">
                        <label class="form-check-label" for="defaultCheck1">
                            <i class="fas fa-clock"></i>${tarea.hora} - ${tarea.contenido}
                        </label>
                    </div>
                    <div>
                        <label for="label"></label>
                    </div>
                    <div>
                        <button type="button" class="btn btn-warning" onclick="${eliminarTarea()}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    const tareasHoy = $('#tareasHoy');
    const liTarea =$('<li></li>');

    liTarea.html(template);

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

function eliminarTarea(){

    const tarea = document.querySelector("#tareasHoy");

    // Agregar un event listener a ese elemento para escuchar los clicks en los elementos <li>
    tarea.addEventListener("click", function(event) {
        // Obtener el elemento <li> que se ha clickeado
        const li = event.target;

        console.log(li);

        // Eliminar el elemento <li> de la lista de tareas
        $(li).parent().parent().parent().parent().parent().remove();
    });

    console.log(this);
}