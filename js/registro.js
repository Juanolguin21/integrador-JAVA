

class Cliente {
    constructor(nombreu, password, password2, pais, ciudad, direccion, domicilio, telefono, email) {
      this.nombreu = nombreu;
      this.password = password;
      this.password2 = password2;
      this.pais = pais;
      this.ciudad = ciudad;
      this.direccion = direccion;
      this.domicilio = domicilio;
      this.telefono = telefono;
      this.email = email;
    }
  }

let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
  mensajeFinal()
});


mensajeFinal = (cliente) => {

  let nombreu = document.getElementById('user').value;
  let password = document.getElementById('password').value;
  let password2 = document.getElementById('password2').value;
  let pais = document.getElementById('pais').value;
  let ciudad = document.getElementById('ciudad').value;
  let direccion = document.getElementById('direccion').value;
  let domicilio = document.getElementById('domicilio').value;
  let telefono = document.getElementById('telefono').value;
  let email = document.getElementById('email').value;
  let cliente1 = new Cliente (nombreu, password, password2, pais, ciudad, direccion, domicilio, telefono, email)


  if (nombreu === "" || password==="" || password2==="" || pais==="" || ciudad==="" || direccion==="" || domicilio==="" || telefono==="" || email ===""){
    Swal.fire({
      title: "Por favor, completar todos los campos.",
      confirmButtonText: 'Continuar'
    })
  } else {
    Swal.fire({
      title: `MUCHAS GRACIAS ${cliente1.nombreu} Y BIENVENIDO ❤️. Pronto recibira un correo en ${cliente1.email} DE CONFIRMACION DE CUENTA`,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Continuar',

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          window.location.href= "/login/login.html"
        )
      }
    });
  }
}

function guardarCliente ()  { 


const registro = {
  "nombre" : nombreu,
  "password" : password,
  "password2" : password2,
  "pais" : pais,
  "ciudad" : ciudad ,
  "direccion" : direccion,
  "domicilio" : domicilio ,
  "telefono" : telefono,
  "email" : email
};

    const clienteJSON =JSON.stringify(registro);
    const file = new Blob([clienteJSON], {type: 'application/json'});
    const a = document.createElement('a');
    a.href=URL.createObjectURL(file);
    a.download = 'registro1.json';
    document.body.appendChild(a);
    a.click();
}


