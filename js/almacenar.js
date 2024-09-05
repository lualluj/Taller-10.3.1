//Otenemos elementos a utilizar
const item = document.getElementById("item"); //Input de texto
const agregar = document.getElementById("agregar"); //Botón de agregar
const contenedor = document.getElementById("contenedor"); //Contenedor de tareas
const limpiar = document.getElementById("limpiar"); //Botón de limpiar

//Función para mostrar elementos
function showItems(item) {
    const li = document.createElement("li"); //Creamos una variable li, la cual crea un <li> vacío
    li.textContent = item; //Damos al li recién creado el valor textual de item (parámetro)
    li.setAttribute("class", "list-group-item"); //Damos al li la clase de Bootstrap "list-group-item"
    contenedor.appendChild(li); //Agregamos al li al contenedor
}

//Función para guardar elementos
function saveItems() {
    const items = []; //Definimos array vacía
    const lis = contenedor.getElementsByTagName('li'); //Obtenemos todos los <li> de la página
    for(let li of lis) {
        items.push(li.textContent); //Guardamos todos los <li> en el array items, pusheándolos uno a uno
    }
    localStorage.setItem("items", JSON.stringify(items)); //Guardamos el array con todos los elementos ya pusheados en la key "items" en localStorage, parseándolo en una string
}

//Función para cargar elementos
function loadItems() {
    const savedItems = JSON.parse(localStorage.getItem("items")) || []; //Definimos array con las tareas guardadas, tomándolas del localStorage y devolviendo una array en lugar de una string
    for(let savedItem of savedItems) {
        showItems(savedItem); //Llamamos a la función showItems para mostrar los elementos en la página, dándole como parámetro cada uno de los elementos de la key/array items en localStorage
    }
}

//Listener del botón agregar al clickearlo
agregar.addEventListener("click", () => {
    if(item.value.length <= 0) { //En caso de no escribir nada en el input, lanzar alerta
        alert("Debes escribir al menos un carácter!");
    } else { //En caso contrario
        showItems(item.value); //Ejecutar showItems con el parámetro item.value, que es lo que sea que se haya escrito en el input
        item.value = ""; //Limpiamos el input, para que se pueda escribir una nueva tarea
        saveItems(); //Ejecutamos saveItems para guardar los elementos que vamos creando
    }
});

//Listener del botón de limpiar
limpiar.addEventListener("click", () => {
    localStorage.removeItem("items"); //Borramos la key items de localStorage, efectivamente eliminando todos los valores guardados
    contenedor.innerHTML = ""; //Limpiamnos el contenido del contenedor
});

//Listener al cargar el DOM
document.addEventListener("DOMContentLoaded", loadItems); //Ejecutamos loadItems para cargar los elementos que tenemos guardados en la key items de localStorage y mostrarlos en la página