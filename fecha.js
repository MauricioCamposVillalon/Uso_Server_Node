const validarFecha = (data) => {
    if(data < 10){
        data = "0" + data
    }
    return data;
}

/* function validarFecha(data) {
    if(data < 10){
        data = "0" + data
    }
    return data;
} */

let date = new Date();

let dias = date.getDate();
/* if(dias < 10){
    dias = "0" + dias
} */

dias = validarFecha(dias);

let mes = date.getMonth() + 1;

mes = validarFecha(mes);

/* if(mes < 10){
    mes = "0" + mes
} */

let anio = date.getFullYear();

console.log(`${dias}/${mes}/${anio}`);