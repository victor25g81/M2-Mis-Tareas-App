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

  $("#guardarTarea").on("click", guardarTarea);

  cargarTareas();
  cargarTareasFinalizadas();

  $(".btn-eliminar").on("click", eliminarTarea);
  $('.form-check-input').on('change', marcarComoFinalizada)
});

function guardarTarea(event) {
  event.preventDefault();

  const contenido = $("#contenido").val();
  const fecha = $("#fecha").val();
  const hora = $("#hora").val();

  const tarea = new Tarea(contenido, fecha, hora);

  almacenarTarea(tarea);

  mostrarTarea(tarea);
}

function mostrarTarea(tarea) {
  const template = `
    <div class="container" style="margin-top: 2px">
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="form-check">
                        <input class="form-check-input custom-control-input" type="checkbox" value="" tareaIdCheckbox="${tarea.id}">
                        <label class="form-check-label" for="defaultCheck1">

                        <i class="fas fa-clock"></i>${tarea.hora} - ${tarea.contenido}
                                 
                        </label>
                    </div>
                    <div>
                        <label for="label"></label>
                    </div>
                    <div>
                        <button type="button" class="btn btn-warning btn-eliminar" tareaId="${tarea.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

  const clasificacion = clasificarTareaPorFecha(tarea.fecha);

  const tareasHoy = $("#" + clasificacion);
  const liTarea = $("<li></li>");

  liTarea.html(template);

  tareasHoy.append(liTarea);
}

function marcarComoFinalizada(event) {
  const btnEliminar = $(this);
  const tareaId = $(btnEliminar).attr("tareaIdCheckbox");
  
  btnEliminar.parent().parent().parent().parent().parent().remove();


  marcarTareaComoFinalizada(tareaId);
}

function marcarTareaComoFinalizada(tareaId) {
  let tareas = JSON.parse(localStorage.getItem("tareas"));

  const tarea = tareas.find((t) => t.id === tareaId);
  tarea.terminado = true;

  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function checkInput() {
  var input = document.getElementById("contenido").value.trim();
  var button = document.getElementById("crearTarea");

  if (input.length > 0) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

function eliminarTarea() {
  const btnEliminar = $(this);
  btnEliminar.parent().parent().parent().parent().parent().remove();

  const tareaId = $(btnEliminar).attr("tareaId");

  eliminarTareaDesdeLocalStorage(tareaId);
}

function eliminarTareaDesdeLocalStorage(tareaId) {
  let tareas = JSON.parse(localStorage.getItem("tareas"));

  tareas = tareas.filter((t) => t.id !== tareaId);

  localStorage.setItem("tareas", JSON.stringify(tareas));
}

/*function clasificarTarea(tarea) {
  const fechaTarea = moment(tarea.fecha, 'YYYY-MM-DD').startOf('day');

  if (fechaTarea.isSame(hoy, 'day')) {
    tarea.categoria = 'Hoy';
  } else if (fechaTarea.isSame(manana, 'day')) {
    tarea.categoria = 'Mañana';
  } else {
    tarea.categoria = 'Otro día';
  }

  return tarea;
}*/

function almacenarTarea(tarea) {
  if (!localStorage.getItem("tareas")) {
    localStorage.setItem("tareas", JSON.stringify([]));
  }

  const tareas = JSON.parse(localStorage.getItem("tareas"));

  tareas.push(tarea);

  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function clasificarTareaPorFecha(fecha) {
  const hoy = moment();

  if (hoy.format("YYYY-MM-DD") == fecha) {
    return "tareasHoy";
  }

  const manana = hoy.add(1, "days");

  if (manana.format("YYYY-MM-DD") == fecha) {
    return "tareasManana";
  }

  return "tareasSiguientesDias";
}

function cargarTareas() {
  const tareas = JSON.parse(localStorage.getItem("tareas"));

  for (const t of tareas) {
    if (!t.terminado) {
      mostrarTarea(t);
    }
  }
}

function cargarTareasFinalizadas() {
  const tareas = JSON.parse(localStorage.getItem("tareas"));

  for (const t of tareas) {
    if (t.terminado) {
      mostrarTareaFinalizada(t);
    }
  }
}

function mostrarTareaFinalizada(tarea) {
  const template = `
    <div class="container" style="margin-top: 2px">
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="form-check">
                        <input class="form-check-input custom-control-input" type="checkbox" value="" disabled checked>
                        <label class="form-check-label" for="defaultCheck1">

                        <i class="fas fa-clock"></i>${tarea.hora} - ${tarea.fecha} - ${tarea.contenido}
                                 
                        </label>
                    </div>
                    <div>
                        <label for="label"></label>
                    </div>
                    <div>
                        <button type="button" class="btn btn-warning btn-eliminar" tareaId="${tarea.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    const tareasFinalizadas = $("#tareasFinalizadas");
    const liTarea = $("<li></li>");

    liTarea.html(template);

    tareasFinalizadas.append(liTarea);
}

/*Codigo de Prueba
function cambiarTarea() {
  var tarea = document.getElementById("tareaId");
  if (tarea.checked) {
    const liTarea = $("<li></li>");

    liTarea.html(template);

    tareasHoy.append(liTarea);
}
};
*/
