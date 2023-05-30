let total = 0;
let carrito = [];
const divMain = document.getElementById ('container');
const divCarrito = document.getElementById('carrito');
const divTotalCarrito = document.getElementById('totalCarrito');
const carritoGeneral = document.getElementById('carritoGeneral');


class Cliente {
  constructor(nombre, direccion, mail) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.mail = mail;
  }
}


//busqueda  DE PRODUCTOS EN EL HTML


const input = document.getElementById('input'); 
const output = document.getElementById('container');

// Evento que se ejecuta cuando hay cambios en el input
input.addEventListener('input', () => {
  // Obtener el valor del input
  const searchTerm = input.value.trim().toLowerCase();
  
  // Obtener los datos del archivo .json
  fetch('js/inventario.json')
    .then(response => response.json())
    .then(data => {
      // Filtrar los datos que coinciden con el término de búsqueda
      const filteredData = data.filter(elem => {
        return elem.nombre.toLowerCase().includes(searchTerm);
      });
      
      // Crear el HTML con los datos filtrados
      const html = filteredData.map(elem => {
        return `
        <div class="card-body" id="wrap">
        <img src="${elem.imagen}" class="card-img-top" alt="...">
          <h5 class="card-title">${elem.nombre}</h5>
          <p class="card-text">$${elem.precio}.-</p>
          <a href="#carrito" class="btn btn-primary" id="agregar${elem.id}">DISPONIBLE EN LA TIENDA</a>
        </div>`;
      }).join('');
      
      // Actualizar el output con el HTML creado
      if (html.length > 0) {
      output.innerHTML = html;
    }
      else
      { Swal.fire({
        title: '¡No hay productos con esta descripcion!',
        text: "",
        icon: 'warning',
        showCancelButton: false,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '¡volver a intentar!'
      }).then((result) => {
        if (result.isConfirmed){
             location.reload();
        }
      })
        }
  
    })
});

function refreshPage() {
  if (document.getElementById("input").value.length === 0) {
    location.reload();
  }
}
// menu hamburg

const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownToggle = document.querySelector('.dropdown');

    // Añadir eventos para mostrar y ocultar el menú desplegable
    dropdownToggle.addEventListener('click', () => {
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
    dropdownMenu.addEventListener('mouseleave', () => {
      dropdownMenu.style.display = 'none';
    });

// menu carrito

const carroMenu = document.querySelector('.carrito');
    const carroToggle = document.querySelector('.menu #carro');

    // Añadir eventos para mostrar y ocultar el menú desplegable
    carroToggle.addEventListener('click', () => {
      carroMenu.style.display = carroMenu.style.display === 'block' ? 'none' : 'block';
    });
    carroMenu.addEventListener('', () => {
      carroMenu.style.display = 'none';
    });

//TARJETA DE PRODUCTOS EN EL HTML

const imprimirProductos = async() => {
  const datos  = await fetch('js/inventario.json');
  const inventario = await datos.json();


  inventario.forEach ((elem) => {
    const divProductos = document.createElement('div');
    divProductos.classList.add("card", "col-sm-6", "col-lg-4", "text-bg-white", "border-light");
    divProductos.innerHTML = `
      <img src="${elem.imagen}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${elem.nombre}</h5>
        <p class="card-text">$${elem.precio}.-</p>
        <a href="#carrito" class="btn btn-primary" id="agregar${elem.id}">Agregar al carrito</a>
      </div>`
    divMain.appendChild(divProductos);


    const boton = document.getElementById(`agregar${elem.id}`);
    boton.addEventListener("click", () => {
      buscarProducto(elem.id);
    });
  });
};

imprimirProductos();

//FUNCION CHEKEO PRODUCTOS EN LOCALSTORAGE

function productosEnStorage () {
  const itemsEnStorage = localStorage.getItem("NuevoItem");
  console.log(itemsEnStorage);

  if (itemsEnStorage != null){
    carrito = JSON.parse (itemsEnStorage);
    mostrarCarrito();
  };
  
};

// FUNCION DE BUSQUEDA DE PRODUCTOS REPETIDOS EN ARRAY CARRITO

const buscarProducto = async (idProd) => {
  const datos  = await fetch('js/inventario.json');
  const inventario = await datos.json();
  const objetoClickeado = inventario.find((elem) => elem.id === idProd);
  const buscarEnCarrito = carrito.find ((e) => {return e.id === objetoClickeado.id});

  if (buscarEnCarrito === undefined){
    carrito.push(objetoClickeado);
    mostrarCarrito();
  } else {
    buscarEnCarrito.cantidad +=1
    mostrarCarrito();
  };
};

// FUNCION CREAR CARRITO

const mostrarCarrito = () => {
  divCarrito.innerHTML = "";
  carrito.forEach((elem) => {

    const objetoenJSON = JSON.stringify (carrito);
    localStorage.setItem ("NuevoItem", objetoenJSON);

    total = carrito.reduce((accum,e) => {return accum += e.cantidad*e.precio}, 0);

    const divProductosCarrito = document.createElement('div')
    divProductosCarrito.innerHTML = `
    <p><b><u>${elem.nombre} </u></b></p>
    <h4>- Precio: $${elem.precio}</h4>
    <h4>- Cantidad: <button class="btn btn-black" onClick="restarCantidad(${elem.id})">➖</button> ${elem.cantidad}<button class="btn btn-black" onClick="sumarCantidad(${elem.id})">➕</button>  <hr></h4>
    <p class="subtotal"><b>Subtotal: $ ${elem.precio * elem.cantidad}</b></p>
    <button class="btn btn-black" onClick="borrarProducto(${elem.id})">❌</button>  <hr>`;

    divCarrito.appendChild(divProductosCarrito);
  })

  divTotalCarrito.innerHTML = `
  <h1><b> TOTAL: $ ${total} <b/></h1>
  <button class="btn btn-primary" onClick="alertaBorrarCarrito()">Borrar Carrito</button>
  <button class="btn btn-success" onClick="confirmarCompra()">Confirmar Compra</button>
  <h1><b>  ⬆  <b/></h1>
  <h1><b> TU COMPRA <b/></h1>`;

};

// FUNCION DE SUMA DE CANTIDADES EN CARRITO

function sumarCantidad (idProd) { 
  const objetoClickeado = carrito.find((elem) => elem.id === idProd);

  objetoClickeado.cantidad +=1
  mostrarCarrito ()

};

// FUNCION DE RESTA DE CANTIDADES EN CARRITO

function restarCantidad (idProd) { 
  const objetoClickeado = carrito.find((elem) => elem.id === idProd);

  if (objetoClickeado.cantidad > 1) {
    objetoClickeado.cantidad -=1

    mostrarCarrito ()
  } else if (objetoClickeado.cantidad === 1) {
    borrarProducto(idProd)
  }

};

//llAMADO A FUNCION DE CHEKEO EN LOCALSTORAGE

productosEnStorage()

// SWEETALERT PREGUNTA BORRAR CARRITO

function alertaBorrarCarrito(){
  Swal.fire({
    title: '¿Estas seguro que quieres borrar el carrito?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Borrar!'
  }).then((result) => {
    if (result.isConfirmed) {
         borrarCarrito ()
    }
  })
};

// FUNCION BORRAR CARRITO ENTERO      

function borrarCarrito () {
  localStorage.clear();  
  carritoGeneral.innerHTML= "";
  carrito.splice(0,carrito.length);
  total = 0;
  location.reload()
};

//FUNCION BORRAR ELEMENTO DEL CARRITO

const borrarProducto = (idProd) => {
  if (carrito.length === 1) {
    borrarCarrito()
    location.reload()
  } else {
    const elementoAEliminar = carrito.find((e) => e.id === idProd);
    carrito = carrito.filter ((elem) => { return elem !== elementoAEliminar})
    console.log(carrito);
  }
  mostrarCarrito();
};

// CONFIRMAR COMPRA 

function confirmarCompra () {
  divTotalCarrito.innerHTML = "";
  const div = document.createElement('div')
  div.innerHTML = `
  <form action="" method="GET" enctype="multipart/form-data">
        <label for="nombre">Nombre:</label>        
        <input type="text" placeholder="Nombre" id="nombre">
            <br>
        <label for="adress">Dirección:</label>        
        <input type="text" placeholder="adress" id="adress">
            <br>
        <label for="mail">Correo Electrónico:</label>        
        <input type="text" placeholder="mail" id="mail">
            <br>
            <button id="submit">Enviar</button> <br>
            <p><b> TOTAL: $ ${total}  💵 💳<b/></p>
            </form>
            `;
  divTotalCarrito.appendChild (div)

  let submit = document.getElementById('submit')
  submit.addEventListener('click', () => {
    mensajeFinal()
  })

}

//ALERTA FINAL DE CIERRE

mensajeFinal = (cliente) => {
  let nombre = document.getElementById('nombre').value;
  let direccion = document.getElementById('adress').value;
  let mail = document.getElementById('mail').value;
  let cliente1 = new Cliente (nombre, direccion, mail)
  

  if (nombre === "" || direccion==="" || mail===""){
    Swal.fire({
      title: "Por favor, completa los campos.",
      confirmButtonText: 'Continuar'
    })
  } else {
    Swal.fire({
      title: `MUCHAS GRACIAS ${cliente1.nombre} POR SU COMPRA ❤️. Pronto recibira un correo en ${cliente1.mail} con los detalles del envio a: ${cliente1.direccion}`,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          borrarCarrito(),
          location.reload()
        )
      }
    });
  }
}



