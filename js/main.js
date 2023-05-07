const productos =[
    /* placas */
    {
            id: 1,
             name: "BORDE BALLENA 40x40",
             precio: 1350,
             categoria:{
                nombre: "Placas",
                id:"placas"
             },
             img:"./img/placas/bordeballena40x40.png"
             
   },
   {
              id: 2,
             name: "BORDE L",
             precio: 1400,
             categoria:{
                nombre: "Placas",
                id:"placas"
             },
             img:"./img/placas/bordeL.png"
   },
   {
       id: 3,
       name: "ESQUINERO BORDE L",
       precio: 1550,
       categoria:{
        nombre: "Placas",
        id:"placas"
     },
       img:"./img/placas/esquinerobordeL.png"
     },
     {
       id: 4,
       name: "CONTRACURVA",
       precio: 1350,
       categoria:{
        nombre: "Placas",
        id:"placas"
     },
       img: "./img/placas/contacurvo.png"
     },
     {
       id: 5,
       name: "BORDE BALLENA 40x60",
       precio: 1350,
       categoria:{
        nombre: "Placas",
        id:"placas"
     },
       img: "./img/placas/bordeballena40x60.png"
     },
     {
       id: 6,
       name: "SOLARIUM",
       precio: 1220,
       categoria:{
        nombre: "Placas",
        id:"placas"
     },
       img: "./img/placas/solarium40x40.png"
     },
     {
       id: 7,
       name: "BORDE BALLENA 40X20",
       precio: 1020,
       categoria:{
        nombre: "Placas",
        id:"placas"
     },
       img: "./img/placas/bordeballena40x20.png"
     },
     {
        id: 8,
        name: "REjILLA",
        precio: 1020,
        categoria:{
         nombre: "Placas",
         id:"placas"
      },
        img: "./img/placas/rejillaGrande.png"
      },

     /* Piletasss */
     {
       id: 9,
       name: "Pileta-01",
       img: "./img/piletas/pileta1.png",
       categoria:{
        nombre: "Piletas",
        id:"piletas"
     },
       precio: 2000,
     },

     {
        id: 10,
        name: "Pileta-02",
        img: "./img/piletas/pileta2.png",
        categoria:{
         nombre: "Piletas",
         id:"piletas"
      },
        precio: 2000,
      },

      {
        id: 11,
        name: "Pileta-03",
        img: "./img/piletas/pileta3.png",
        categoria:{
         nombre: "piletas",
         id:"Piletas"
      },
        precio: 2000,
      },
      {
        id:12,
        name: "Pileta-04",
        img: "./img/piletas/pileta4.png",
        categoria:{
         nombre: "Piletas",
         id:"piletas"
      },
        precio: 2000,
      },
      {
        id: 13,
        name: "Antihumedad-01",
        img: "./img/antihumedad/antihumedad-01.jpg",
        categoria:{
         nombre: "Antihumedad",
         id:"antihumedad"
      },
        precio: 2000,
      },
      {
        id: 14,
        name: "Antihumedad-02",
        img: "./img/antihumedad/antihumedad-02.jpg",
        categoria:{
         nombre: "Antihumedad",
         id:"antihumedad"
      },
        precio: 2000,
      },
      {
        id: 15,
        name: "Antihumedad-03",
        img: "./img/antihumedad/antihumedad-03.jpg",
        categoria:{
         nombre: "Antihumedad",
         id:"antihumedad"
      },
        precio: 2000,
      },
      {
        id: 16,
        name: "Antihumedad-04",
        img: "./img/antihumedad/antihumedad-04.jpg",
        categoria:{
         nombre: "Antihumedad",
         id:"antihumedad"
      },
        precio: 2000,
      },
   ]

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
            tituloPrincipal.innerText = "Todos los Productos";
            cargarProductos(productos);
        }

    })
   });

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

/* aca creo que arranco el problema xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
   function agregarAlCarrito(e){
    /* productoAgregado creo que es el problema, no me aparece directamente cuando hago clg en la consola tampoco */

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    console.log(productoAgregado)

    /* me fijo que no se repitan productos en mi carrito */

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
      const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
      productosEnCarrito[index].cantidad++;
  } else {
    /*________________________ me marca aca el error en consola_____________ */
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



