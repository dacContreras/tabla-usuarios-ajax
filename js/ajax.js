// accedo a los siguientes elementos
let btn = document.getElementById("btn_cargar_usuarios");
let loader = document.getElementById("loader");

// agrego un add event listener par decirle que cuando le den click
//  al boton haga la peticion
btn.addEventListener('click', function(){
    // hacemos una nueva instancia para las peticiones
    let peticion = new XMLHttpRequest();
    peticion.open('GET', 'php/leer-datos.php');
    // peticion.open('GET', 'https://api.npoint.io/654839a1578efade998c');

    // le agrego la clase active (la ruedita)
    loader.classList.add('active'); 

    // cargamos codigo cuando un codigo ya cargo
    peticion.onload = function(){

        let datos = JSON.parse(peticion.responseText);

        // creamos toda la informacion y la insertamos en la tabla
        for (let i = 0; i < datos.length; i++) {
                    let elemento = document.createElement('tr');
             elemento.innerHTML += ("<td>" + datos[i].id + "</td>");
             elemento.innerHTML += ("<td>" + datos[i].nombre + "</td>");
             elemento.innerHTML += ("<td>" + datos[i].edad + "</td>");
             elemento.innerHTML += ("<td>" + datos[i].pais + "</td>");
             elemento.innerHTML += ("<td>" + datos[i].correo + "</td>");
             document.getElementById('tabla').appendChild(elemento);
        }

    }

    // nos permite una ejecutar cada que nuestro estado de ejecucion
    // o peticion cambia
    peticion.onreadystatechange = function(){
        // si la peticion a sido finalizada y tambien esta en estado 200 
        // le quitamos las clase active al loader
        if(peticion.readyState == 4 && peticion.status == 200){
            loader.classList.remove('active');
        }
    }

    // envaimos la peticion
    peticion.send();
});