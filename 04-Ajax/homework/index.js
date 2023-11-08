//!Declaro todas las constantes
const users = document.getElementById('boton');
const list = document.getElementById("lista");
const button = document.getElementById('search');
const deleteA = document.getElementById('delete');
const url = "http://localhost:5000/amigos";

//!Esta funcion muestra la lista de amigos
function viewList() {
    list.innerHTML = "";
    $.get(`${url}`, (res)=>{
        res.forEach(element => {
            let li = document.createElement("li")
            li.innerHTML = element.name 
            list.appendChild(li)
        });
    });
};

users.addEventListener("click", viewList);

//!Esta funcion busca amigos por ID
function search() {
    const [input] = $('#input');
    var id = input.value; 
    // input.innerHTML = ""; 
    input.value = "";

    $.get(`${url}/${id}`, (res) => {
        const amigo = document.getElementById('amigo')// => const [amigo] = $('#amigo');
        amigo.innerHTML = res.name;
    });
};


button.addEventListener("click", search);

//!Esta funcion borra amigos
function deleteFriends () {
    const [inputDelete] = $('#inputDelete');
    var id = inputDelete.value; 
    inputDelete.value = "";

    $.ajax({
        url: `${url}/${id}`,
        method: "DELETE",

        success: function (response) {
            viewList(response);
            const success = document.getElementById('success');
            success.innerHTML = 'Tu amigo fue borrado xd'
        },
    });
};

deleteA.addEventListener("click", deleteFriends);