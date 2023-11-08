/*
TODO: PETICIONES <-> GET POST PUT DELETE
JQUERY -> AJAX
jQuery Selectores  --> $("#agregar")

jQuery <-> AJAX:  PETICIONES
fetch 
axios


const info = axios.get("https://jsonplaceholder.typicode.com/users/1")

const info = fetch.get("https://jsonplaceholder.typicode.com/users/1")

const info = $.get("https://jsonplaceholder.typicode.com/users/1")
*/

var button = document.getElementById("agregar")
var lista = document.getElementById("usuarios")

function createList(){
    lista.innerHTML = ""
    $.get("https://jsonplaceholder.typicode.com/users", (res)=>{
        console.log("-----> ", res)
        res.forEach(element => {
            let li = document.createElement("li")
            li.innerHTML = element.name 
            lista.appendChild(li)
        });
    })
    console.log("luego del evento de petición que hicimos con jquery")
}

button.addEventListener("click", createList)

/*
* Uso del DELETE en jquery
$.ajax({
    url: `${URL}`,
    method: "DELETE",
    dataType: "json",
    success: function (response) {
      console.log(response);
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });


todo: HomeWork
* Recordar se debe instalar dependencias y levantar el server para probar nuestra app
*/
