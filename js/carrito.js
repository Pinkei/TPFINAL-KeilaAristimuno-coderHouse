const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");



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
        <button class="carritoProductoEliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    }


