$(document).ready(() => {
    

    document.querySelector('#modalFechaHora').addEventListener('show.bs.modal', function() {
        const fechaHoraActual = moment();
        
        document.querySelector('#fecha').value = fechaHoraActual.format('YYYY-MM-DD');
        document.querySelector("#fecha").min = fechaHoraActual.format('YYYY-MM-DD');
        
        fechaHoraActual.hours(fechaHoraActual.hours() + 1);
        fechaHoraActual.minutes(0);
        document.querySelector('#hora').value = fechaHoraActual.format('HH:mm');
    });
});

//var horaseleccionada = document.querySelector('#hora').value = fechaHoraActual.format('HH:mm');

horaseleccionada.addEventListener("change", function(){

    document.querySelector('#hora').value = fechaHoraActual.format('HH:mm');

    if(horaseleccionada.isBefore(hora)){

        alert("la hora y minutos no pueden ser inferiores a la hora actual");

        this.value = fechaHoraActual.format("HH:mm");
    }

});


function validar() {
    var contenido = document.getElementById("contenido").value;
    if (contenido === "") {
      alert("Por favor, ingrese su nombre");
      addEventListener.preventDefault(); // evita que se envíe el formulario
    }
  };