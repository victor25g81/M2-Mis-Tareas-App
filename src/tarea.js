class Tarea {
    constructor(contenido, fecha, hora){
        this.terminado = false;
        this.contenido = contenido;
        this.fecha = fecha;
        this.hora = hora;
    }
}

const mitarea = new Tarea('comprar bebidas', '01-05-2023', '10:00');

console.log(mitarea.contenido);
console.log(mitarea.fecha);
console.log(mitarea.hora);