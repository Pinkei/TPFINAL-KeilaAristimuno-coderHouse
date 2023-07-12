/* lleva al producto.json */
let productos = [];
fetch("./js/productos.json")
.then(response => response.json())
.then(data => {
  productos = data;
  cargarProductos(productos);
})

   /* LlAMO A MIS ETIQUETAS HTML para poder manipular el dom */
    const contenedorProductos = document.querySelector("#contenedorProductos");
    const botonesCategorias = document.querySelectorAll(".botonCategoria")
    const tituloPrincipal = document.querySelector("#tituloPrincipal");
    let botonesAgregar = document.querySelectorAll(".producto-agregar");
    const numerito = document.querySelector("#numerito");

    function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";
    
    productosElegidos.forEach(producto => {

        const div = document.createElement("div")
        div.classList.add("producto");
        div.innerHTML = `<img class="productoImagen" src="${producto.img}" alt="${producto.name}">
        <div class="productoDetalles">
            <h3 class="productoTitulo">${producto.name}</h3>
            <p class="productoPrecio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>`;

            contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
    /*  botonesAgregar me tira los 16 lenght bien*/

   }
   cargarProductos(productos);

   /* foreach a los botones categoria, para que me filtre mis ditintos productos */

   botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){        
            const productoCategoria = productos.find (producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton);
        } else {
          /* sino muestra "todos los productos" */
            tituloPrincipal.innerText = "Todos los Productos";
            cargarProductos(productos);
        }

    })
   });


/* cada vez que se ejecuta la funcion de cargar productos, entonces lo traigo del dom cada vez que hago click y llamo un eventlistener que llama a la funcion agregarAlCarrito  */
   function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
      boton.addEventListener("click", agregarAlCarrito);
    });
  }

  let productosEnCarrito;

  let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
  
  if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

/* quiero que agregarAlCarrito agregue esos elementos a un array xq tengo un array de productos agregados al carrito */
    function agregarAlCarrito(e){

      Toastify({
        text: "Se agrego a tu carrito",
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
   console.log(idBoton)
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    /* me fijo que no se repitan productos en mi carrito */
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
      const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
      productosEnCarrito[index].cantidad++;
  } else {
      productoAgregado.cantidad = 1;
      productosEnCarrito.push(productoAgregado);
  }

    actualizarNumerito();

/* ______________GUARDO MIS PRODUCTOS EN LOCAL STORAGE________________ */
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito) )
        }

        /* va a ir actualizando y sumando lo que compren */
        function actualizarNumerito(){
          let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
          numerito.innerText = nuevoNumerito;


        }

/*_________________________ configuracion de api del clima_________________________ */
//esta permite compartir la ubicacion si el usario lo desea:
window.addEventListener('load', ()=>{
  let lon
  let lat
  /* traigo mis elementos del DOM */

  let temperaturaValor = document.getElementById('temperatura-valor')
  let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

  let ubicacion = document.getElementById('ubicacion')
  let iconoAnimado = document.getElementById('icono-animado')

  let vientoVelocidad = document.getElementById('viento-velocidad')



    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(posicion => {
      //console.log(posicion.coords.latitude)
      lon=posicion.coords.longitude
      lat=posicion.coords.latitude
      //ubicaion actual
      //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5981035bd4a5cb58fe7932b4f52ae640`

      //ubicacion por ciudad
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Argentina&lang=es&units=metric&appid=5981035bd4a5cb58fe7932b4f52ae640`
    
      //console.log(url)

      fetch(url)
      .then(response => {return response.json()})
      .then(data => {
        let temp = Math.round(data.main.temp)
        temperaturaValor.textContent = `${temp}ºC`

        let desc = data.weather[0].description
        temperaturaDescripcion.textContent = desc.toUpperCase()

        ubicacion.textContent=data.name

        vientoVelocidad.textContent = `${data.wind.speed} m/s`
        //console.log(data.wind.speed)

        /* para los iconmnos animados */
/*         console.log(data.weather[0].main)
        switch (data.weather[0].main){
          case 'Clear':
            iconoAnimado.src = 'animated/day.svg'
            console.log('SOLEADO')
          break;
          case 'Clouds':
            iconoAnimado.src = 'animated/cloudy-day-1.svg'
            console.log('NUBES')
          break;
          case 'Drizzle':
            iconoAnimado.src='animated/rainy-2.svg'
            console.log('LLOVIZNA');
            break;
          case 'Rain':
            iconoAnimado.src='animated/rainy-7.svg'
            console.log('LLUVIA');
            break;
            case 'Thunderstorm':
              iconoAnimado.src='animated/thunder.svg'
              console.log('TORMENTA');
              break;
            default:
                iconoAnimado.src='animated/day.svg'
                console.log('por defecto');
        } */

      })
      .catch(error => {
        console.log(error)
      })

    });
    
  }
})

