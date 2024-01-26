// variables
let btn_cargar = document.getElementById("btn_cargar_usuarios");
let error_box = document.getElementById('error_box');
let tabla = document.getElementById('tabla');
let loader = document.getElementById("loader");

let usuario_nombre
let usuario_edad
let usuario_pais
let usuario_correo

// funciones
// esta funcion carga los usuarios de la base de datos
function cargarUsuarios(){
    // creamos la tabla del html
    tabla.innerHTML = '<tr><th>ID</th><th>Nombre</th><th>Edad</th><th>Pais</th><th>Correo</th></tr>';

    // creamos la peticion a la base datos
    var peticion = new XMLHttpRequest();
    peticion.open('GET', 'php/leer-datos.php');

    // cuando le agregamos la clase active al loader en lo que carga
    loader.classList.add('active');

    // cuadno la informacion este cargada ejecutaremos una funcion
    peticion.onload = function(){
        // obtener lo datos del usuario y los transformamos en JSON
        let datos = JSON.parse(peticion.responseText);

        // si los datos tiene un error
        if(datos.error){
            // agregamos la clase active para que muestre el mensaje de error
            error_box.classList.add('active');
        } else{
            // si no hay error agregamos todos los datos por un ciclo
            for (let i = 0; i < datos.length; i++) {
                let elemento = document.createElement('tr');
                elemento.innerHTML += ("<td>" + datos[i].id + "</td>");
                elemento.innerHTML += ("<td>" + datos[i].nombre + "</td>");
                elemento.innerHTML += ("<td>" + datos[i].edad + "</td>");
                elemento.innerHTML += ("<td>" + datos[i].pais + "</td>");
                elemento.innerHTML += ("<td>" + datos[i].correo + "</td>");
                // lo inyectamos en la tabla
                tabla.appendChild(elemento);  
            }
        }
    }

    // cuando la peticion se haga haremos una condion
    // si la peticion es igual a 4 y tuvo un estado satisfactorio 200
    // quitaremos la clase 'active' del loader
    peticion.onreadystatechange = function(){
        if(peticion.readyState == 4 && peticion.status == 200){
            loader.classList.remove('active');
        }
    }
    // enviar la peticion
    peticion.send();
};

// funcion de agregar datos
function agregarUsuarios(e){
    // prevenimos el evento default que viene por defecto
    e.preventDefault();

    // hacemos una peticion al archivo insertar usuarios de php
    let peticion = new XMLHttpRequest();
    peticion.open('POST', 'php/insertar-usuario.php');

    // le pasamos el metodo trim para quitar espacio colocados
    usuario_nombre = formulario.nombre.value.trim();
    usuario_edad = parseInt(formulario.edad.value.trim());
    usuario_pais = formulario.pais.value.trim();
    usuario_correo = formulario.correo.value.trim();

    // si el formulario es true entonces:
    if(formulario_valido()){
        // quietamos la clase de 'active' al mensjae de error
        error_box.classList.remove('active');
        // guardamos los parametros
        let parametros = 'nombre=' + usuario_nombre + '&edad=' + usuario_edad + '&pais=' + usuario_pais + '&correo=' + usuario_correo;

        // establecesmo el header de como queremos envair la peticion
        peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        // agregamos el loader en lo que carga el loader
        loader.classList.add('active');
 
        // enviamos los datos
        peticion.onload = function(){
            cargarUsuarios();
            formulario.nombre.value = '';
            formulario.edad.value = '';
            formulario.pais.value = '';
            formulario.correo.value = '';
        }

        // cuando la peticion cambie de estado 200 y que su estado sea 4
        // entonces quitamos el loader y agregamos
        peticion.onreadystatechange = function(){
            if(peticion.readyState == 4 && peticion.status == 200){
                loader.classList.remove('active');
            }
        }
        // enviamos los parametros o datos
        peticion.send(parametros);
    
        // si hay un error agregamos la clase active y mostramos el mensaje de error
    } else {
        error_box.classList.add('active');
        error_box.innerHTML = 'Porfavor completa el formulario';
    }
}

// cuando hagamos click al boton ejecutamos la funcion de cargar usuarios
btn_cargar.addEventListener('click', function(){
    cargarUsuarios();
});

// cuando se haga submit del formulario se ejecutarala funcion agregar usuarios
formulario.addEventListener('submit', function(e){
    agregarUsuarios(e);
})

// esta funcion es una validacion al formulario 
function formulario_valido(){
    if(usuario_nombre == ''){
        return false;
    } else if(isNaN(usuario_edad)){
        return false;
    } else if(usuario_pais == ''){
        return false;
    } else if(usuario_correo == ''){
        return false;
    }
    return true;
}