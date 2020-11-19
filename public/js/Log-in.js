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
            // var emailVerified = user.emailVerified;
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
            alert("Has cerrado sesión, actualiza la página :)");
        })
        .catch(function (error) {
            console.log(error);
        });
}
//Mostrar contenido
function mostrar(user) {
    var user = user;
    var panel_tareas = document.getElementById("panel-de-tareas");
    var mensaje_validar_correo = document.getElementById("mensajeValidacion");

    if (user.emailVerified) {
        panel_tareas.style.display = "block";
        document.getElementById("login").style.display = "none";
    } else {
        if (mensaje_validar_correo.style.display == "block") {
            mensaje_validar_correo.style.display = "none";
            mensaje_validar_correo.innerHTML = `
            <div class="grid-validacion">
            <header class="text-right"><button id="eliminar_popup" class="grid-eliminar-validacion"
            onclick="eliminar_popup()">&times;</button>
            </header>
            <h4 class="p-3">Te hemos dejado un mensaje en tu correo para verificar tu cuenta</h4>
            </div>
      `;
        } else {
            mensaje_validar_correo.style.display = "block";
        }

    }
}

//Verificar usuario
function verificarCuenta() {
    var user = firebase.auth().currentUser;
    user
        .sendEmailVerification()
        .then(function () {
            // console.log("Enviando correo")
            alert("Te hemos enviado un correo de verificación, ábrelo para poder verificar tu cuenta :D");
        })
        .catch(function (error) {
            alert(error)
            console.log(error);
        });
}
function eliminar_popup() {
    var mensaje_validar_correo = document.getElementById("mensajeValidacion");
    mensaje_validar_correo.style.display = "none";
}