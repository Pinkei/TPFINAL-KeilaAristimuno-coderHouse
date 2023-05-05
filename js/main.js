const productos =[
    /* placas */
    {
       id: 1,
             name: "BORDE BALLENA 40x40",
             precio: 1350,
             role: "Borde para las pileta de fibra",
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
             role: "Bordes para las piletas de cemento",
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
       role: "Esquienros para pileta de cemento",
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
       role: "Esquineros para pileta con arco romano",
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
       role: "Para una vereda de 60cm",
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
       role: "Para los arco romanos",
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
       role: "Para una vereda de 20cm",
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
        role: "Para una vereda de 20cm",
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
       role: "Para un dia de verano",
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

   function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";
    
    productosElegidos.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("producto");
        div.innerHTML = `<img class="productoImagen" src="${producto.img}" alt="${producto.name}">
        <div class="productoDetalles">
            <h3 class="productoTitulo">${producto.name}</h3>
            <p class="productoPrecio">${producto.precio}</p>
            <button class="productoAgregar" id="${producto.id}">Agregar</button>`;

            contenedorProductos.append(div);
    })
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
            tituloPrincipal.innerText = "Todos los Productos "
            cargarProductos(productos)
        }

    })
   })