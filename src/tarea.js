class Tarea {
  constructor(contenido, fecha, hora) {
    this.id = generarCadenaAleatoria();
    this.terminado = false;
    this.contenido = contenido;
    this.fecha = fecha;
    this.hora = hora;
  }
}

function generarCadenaAleatoria() {
  let caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let longitud = 16;
  let cadenaAleatoria = "";
  for (let i = 0; i < longitud; i++) {
    let indice = Math.floor(Math.random() * caracteres.length);
    cadenaAleatoria += caracteres.charAt(indice);
  }
  return cadenaAleatoria;
}
