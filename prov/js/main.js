
/* CREO LA LISTA DE PRODUCTOS*/ 
const listaProductos = document.querySelector(`.lista-productos`);
const tableCarrito = document.querySelector(`#lista-carrito tbody`)
const btnVaciarCarrito =document.querySelector(`#vaciar-carrito`)
const formBuscador = document.querySelector(`#formulario` )

let carrito = [];


/* LIMITO A SELECCIONAR SOLO EL BOTON*/ 
listaProductos.addEventListener(`click`, agregarProducto);
tableCarrito.addEventListener(`click`, borrarProducto);
btnVaciarCarrito.addEventListener(`click`,vaciarCarrito);
formBuscador.addEventListener(`submit`, buscarProductos);


document.addEventListener(`DOMContentLoaded`,()=>{
    

    if(JSON.parse(localStorage.getItem(`carrito`))){
        carrito = JSON.parse(localStorage.getItem(`carrito`))
        insertarCarritoHtml();
    }
 
    renderizarProductosHTML(productos)

    $.ajax({
        url:"js/planes.json",
        method:"GET",
        dataType:"JSON",
    
        success: function(plane, status, jqXHR){
            renderizarPlanes(plane)    
        },
        error: function(jqXHR, status, error){
    
        }
    })
});



/*
document.addEventListener(`DOMContentLoaded`,()=>{
    

    if(JSON.parse(localStorage.getItem(`carrito`))){
        carrito = JSON.parse(localStorage.getItem(`carrito`))
        insertarCarritoHtml();
    }
 
    $.ajax({
        url:"js/productos.json",
        method:"GET",
        dataType:"JSON",
    
        success: function(data, status, jqXHR){
            renderizarProductosHTML(data)    
        },
        error: function(jqXHR, status, error){
    
        }
    })

});
*/


    function buscarProductos(e){
        e.preventDefault()
        const inputBuscador = document.querySelector(`#buscador`).value;
        const inputFiltrado = inputBuscador.trim().toLowerCase()

        const resultado =productos.filter(producto=> producto.nombre.toLowerCase().includes(inputFiltrado))

        renderizarProductosHTML(resultado)

        formBuscador.reset()

    }


    function renderizarProductosHTML(productos){

        listaProductos.innerHTML = ` `;
        productos.forEach(producto => {
            const { imagen, nombre, precio, id} = producto;

            const divCard = document.createElement(`div`);
            divCard.classList.add("card-producto");
            divCard.innerHTML = 
            
            `<img  class="fotoUno" src= ${imagen} alt="">
            <div class="card-info">
                <p>${nombre}</p>
                <button data-id=${id} class="boton-compra">Comprar </button>
                <div class="caja-precio">
                    <P class="precio">${precio}</P>
                </div>`

            listaProductos.appendChild(divCard)
        });
    }

    function vaciarCarrito(e){

        e.preventDefault()
        carrito=[]
        insertarCarritoHtml()
        guardarCarritoStorage();
    }


    function borrarProducto(e){
        e.preventDefault()

        if(e.target.classList.contains("borrar-producto")){
            const productoSeleccionado = e.target.parentElement.parentElement;
            const productoId = e.target.getAttribute(`data-id`);
           
            /* BORRO DEL HTML*/ 
            productoSeleccionado.remove();

            /* BORRAR DE LA VARIABLE*/ 
            carrito= carrito.filter(producto=>producto.id !== productoId);

            guardarCarritoStorage();

    }
}
    
    function agregarProducto(e){
        e.preventDefault()

        if(e.target.classList.contains("boton-compra")){
            const cardProducto = e.target.parentElement.parentElement;
           
            obtenerDatosProducto(cardProducto);
        }
    }

/* TOMO LOS DATOS DE EL PRODUCTO SELECCIONADO*/ 

    function obtenerDatosProducto(cardProducto){
        const productoAgregado = {
            imagen: cardProducto.querySelector(`img`).src,
            nombre: cardProducto.querySelector(`p`).textContent,
            precio: cardProducto.querySelector(`.caja-precio p`).textContent,
            cantidad:1,
            id:cardProducto.querySelector(`button`).getAttribute(`data-id`),
        };

        const existe = carrito.some( producto => producto.id === productoAgregado.id )

        if(existe){
            const nucvoCarrito = carrito.map(producto=>{
                if(producto.id === productoAgregado.id){
                    producto.cantidad++;
                    producto.precio = `$${Number(productoAgregado.precio.slice(1)) *producto.cantidad }`
                    //return producto;
                }else{
                    //return producto;
                }
                return producto;
            })

            /* spread operator */
            carrito =[...nucvoCarrito]

        }else{
             /* carrito.push(productoAgregado) */
             carrito =[...carrito, productoAgregado]
          
        }


        guardarCarritoStorage();

        insertarCarritoHtml();
    }

    function insertarCarritoHtml(){

        borrarCarritoHtml();

        carrito.forEach(producto=>{

            const {imagen, nombre, precio,cantidad,id} = producto;

            const row = document.createElement(`tr`);
            row.innerHTML=`
            <td>
                <img src="${imagen}" width=100>
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> 
                <a href="#" class="borrar-producto" data-id= "${id}">X </a>
            </td>
        `
        tableCarrito.appendChild(row)

        })
            
    };

    function borrarCarritoHtml(){
        /*otra forma
        tableCarrito.innerHTML=` `*/


        while(tableCarrito.firstChild){
            tableCarrito.removeChild(tableCarrito.firstChild)
        }
    }

    function guardarCarritoStorage(){
        localStorage.setItem(`carrito`, JSON.stringify(carrito))
    };