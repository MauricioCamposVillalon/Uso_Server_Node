const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (req, res) {

    const params = url.parse(req.url, true).query;
    const archivo = params.archivo;
    const contenido = params.contenido;
    const nombre = params.nombre;
    const nuevoNombre = params.nuevoNombre;

    // Validacion e in clusion de fecha en archivo
    const validarFecha = (data) => {
        if(data < 10){
            data = "0" + data
        }
        return data;
    }
    let date = new Date();
    let dias = date.getDate();
    dias = validarFecha(dias);
    let mes = date.getMonth() + 1;
    mes = validarFecha(mes);
    let year = date.getFullYear();
    let fecha = `${dias}/${mes}/${year}`;

    let linea1 = "Creado con fecha: "+fecha ;
    let linea2 = contenido;
    let tareas = [linea1, linea2]
    let data = "";
    tareas.forEach(tarea => {
        data += tarea + "\n";
    })

        // comienzo de CREAR

    if (req.url.includes("/crear")) {
        fs.writeFile('respuesta/'+ archivo, data, "utf-8", (error) => {
            if (error) {
                res.write("Ha ocurrido un error al crear el archivo.")
            }
            else {
                res.write("Archivo ha sido creado correctamente.")
            }
            res.end();
        })
    }

      // comienzo de LEER

    if (req.url.includes("/leer")) {

        fs.readFile('respuesta/' + archivo, (error, data) => {
            if (error) {
                res.write("Ha ocurrido un error al leer el archivo: " + archivo)
            } else {
                res.write(data)
            }
            res.end();
        })
    }

      // comienzo de RENOMBRAR

    if (req.url.includes("/renombrar")) {

        fs.rename('respuesta/' + nombre, 'respuesta/' + nuevoNombre, (error) => {
            if (error) {
                res.write("Error al renombrar el archivo: " + nombre)
            } else {
                res.write("Exito en la operacion de renombrar")
                res.write("\n")
                res.write("Archivo con nombre " + nombre + " ha sido renombrado correctamente por: " + nuevoNombre)

            }
            res.end();
        })
    }

      // comienzo de ELIMINAR

    if (req.url.includes("/eliminar")) {

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
        fs.unlink('respuesta/' + archivo, (error) => {
            if (error) {
                res.write("Error al eliminar el archivo: " + archivo)
            } else {
                res.write('Tu solicitud de Eliminacion se esta "Procesando"')
                setTimeout(() => {
                    res.write("      ")
                    res.write("\n")
                    res.write(`El archivo ${archivo} ha sido eliminado correctamente.`, () => {
                        return res.end();
                    })
                }, 3000);
            }
        })
    }
}).listen(8080, () => {
    console.log("Servidor funcionando en puerto 8080.");
})



