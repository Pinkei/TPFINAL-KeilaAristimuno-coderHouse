const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
console.log(JSON.parse(productosEnCarrito)); //me tira error 

/* me devuelve todo el producto bien: console.log(localStorage.getItem("productos-en-carrito")); */

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");



function cargarProductosCarrito(){
    if (productosEnCarrito ) {

        /* para que cargue bien por las dudas que localStorage falle */
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        /* para que este vacio siempre de entrada: */
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carritoProductoImagen" src="${producto.img}" alt="${producto.name}">
            <div class="carritoProductoTitulo">
            <small>Titulo</small>
            <h3>${producto.name}</h3>
        </div>
        <div class="carritoProductoCantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carritoProductoPrecio">
            <small>Precio</small>
            <p>$${producto.precio}</p>
        </div>
        <div class="carritoProductoSubtotal">
            <small>Subtotal</small>
            <p>$${producto.precio * producto.cantidad}</p>
        </div>
        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })

        actualizarBotonesEliminar();

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}
    cargarProductosCarrito();

    function actualizarBotonesEliminar() {
        botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", eliminarDelCarrito);
        });
    }

    /* tachito de basura, para borrar mis productos: */
    function eliminarDelCarrito(e){
        const idBoton = parseInt(e.currentTarget.id);
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        
        productosEnCarrito.splice(index, 1);
        cargarProductosCarrito();

        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    } 
    


