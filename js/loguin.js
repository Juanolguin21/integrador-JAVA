
class Usuario {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  }

let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
  loguin()
});

loguin = (usuario) => {

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let usuario1 = new Usuario (username, password);


  if (username === "" || password==="" ){
    Swal.fire({
      title: "Por favor, completar todos los campos.",
      confirmButtonText: 'Continuar'
    })
  } else {
    Swal.fire({
      title: `MUCHAS GRACIAS ${usuario1.username} Y BIENVENIDO ❤️`,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Continuar',

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          window.location.href= "/index.html"
        )
      }
    });
  }
}


let submit2 = document.getElementById('submit2')
submit2.addEventListener('click', () => {
  recuperar()
});

  function recuperar() { 
    Swal.fire({
      title: 'Ingrese su mail para enviarle los pasos a seguir',
      input: 'text',
      inputPlaceholder: 'Escriba aquí',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar su e-mail';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes hacer algo con el texto ingresado, por ejemplo:
        Swal.fire({
            title:'Enviamos un mail a su casilla con los pasos a seguir para restaurar su contraseña!',
            confirmButtonText: 'Aceptar',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href= "/index.html";
    };
  })
} 
});
}
  
  
