//Fix

//Crear usuario
function registrarCuenta() {
    var emailNew = document.getElementById("email-new").value;
    var passwordNew = document.getElementById("password-new").value;

    firebase
        .auth()
        .createUserWithEmailAndPassword(emailNew, passwordNew)
        .then(function () {
            verificarCuenta();
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
        });
}

//Ingresar cuenta
function ingresarCuenta() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
        });
}

//Sesión activa o inactiva
function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("Hay un usuario con una sesión activa");
            console.log(user.emailVerified);
            var emailVerified = user.emailVerified;
            mostrar(user);
        } else {
            console.log("No hay ninguna sesión activa");
        }
    });
}
window.onload = observador;

//Cerrar sesión
function cerrarSesion() {
    firebase
        .auth()
        .signOut()
        .then(function () {
            console.log("Sesión cerrada");
        })
        .catch(function (error) {
            console.log(error);
        });
}
//Mostrar contenido
function mostrar(user) {
    var user = user;
    var contenido = document.getElementById("panel-de-tareas");

    if (user.emailVerified) {
        contenido.style.display = "block";
        document.getElementById("login").style.display = "none";
    } else {
        contenido.innerHTML = `
      <h1 class="bg-warning">Te enviamos un correo de verificación, por favor, ábrelo.</h1>
      `;
    }
}

//Verificar usuario
function verificarCuenta() {
    var user = firebase.auth().currentUser;
    user
        .sendEmailVerification()
        .then(function () {
            console.log("Enviando correo");
        })
        .catch(function (error) {
            console.log(error);
        });
}



// <div class="" id="tasked">
// <input
//   type="text"
//   id="nombre"
//   class="form-control mt-5"
//   placeholder="Nombre de tu tarea"
// />
// <input
//   type="text"
//   id="descripcion"
//   class="form-control mt-5"
//   placeholder="Descripción de tu tarea"
// />
// <input
//   type="button"
//   onclick="guardar()"
//   id="guardar"
//   class="btn btn-warning btn-block mt-5"
//   value="Guardar"
// />

// <table class="table mt-5">
//   <thead class="thead-dark text-center">
//     <tr>
//       <th scope="col">Actividad</th>
//       <th scope="col">Descripción</th>
//       <th scope="col">Borrar</th>
//     </tr>
//   </thead>
//   <tbody id="tabla"></tbody>
// </table>
// </div>
