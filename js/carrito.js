const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
/* console.log(JSON.parse(productosEnCarrito)); //me tira error  */


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
    /* el .lenght para que me tire el no hay productos en carrito */
    if (productosEnCarrito && productosEnCarrito.length > 0) {

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
        actualizarTotal();

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

        Toastify({
            text: "Producto eliminado",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #FF6000, rgb(230, 226, 226))",
              borderRadius: '2rem'
            },
            offset: {
              x: '1.8rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
              y: '1.8rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            onClick: function(){} // Callback after click
          }).showToast();

        const idBoton = parseInt(e.currentTarget.id);
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        
        productosEnCarrito.splice(index, 1);
        cargarProductosCarrito();

        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    } 
    

    /* boton para vaciar carrito*/
    botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: "¡Se van a vaciar todos tus productos del carrito!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, vaciar el carrito',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
            cargarProductosCarrito();
            swalWithBootstrapButtons.fire(
            'Perfecto',
            'Tu carrito fue vaciado exitosamente.',
            'success'
          )
        } else {
          swalWithBootstrapButtons.fire(
            'Abortamos mision',
            'Tu carrito no fue vaciado :)',
            'error'
          )
        }
      })

}

/* actuliza el boton total del carrito */
function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;

} 


/* boton comprar del carrito */
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    Swal.fire({
        title: '¡Muchas gracias por tu compra!',
        text: 'Nos estaremos comunicando a la brevedad para coordinar la entrega',
        imageUrl: './img/logoKT.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Atermicos Kt',
      })

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}