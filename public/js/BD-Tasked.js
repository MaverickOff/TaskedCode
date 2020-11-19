// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAgr2y_zUo0Ql5wqexiN8oXh_GQnFQ3o-0",
    authDomain: "taskedproject.firebaseapp.com",
    projectId: "taskedproject",
});

var db = firebase.firestore();

// AGREGAR DATOS
function guardar() {
    var nombre = document.getElementById("nombreTarea").value;
    var descripcion = document.getElementById("descripcionTarea").value;
    var fecha = document.getElementById("fecha").value;
    var estado = false;

    db.collection("users")
        .add({
            first: nombre,
            last: descripcion,
            date: fecha,
            estado: estado,
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("nombreTarea").value = "";
            document.getElementById("descripcionTarea").value = "";

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}
// LEER DATOS
var tabla = document.getElementById("tabla");
db.collection("users").onSnapshot((querySnapshot) => {
    document.getElementById("tabla").innerHTML = " ";

    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        document.getElementById("tabla").innerHTML += `
      <tr>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().date}</td>
      
      <td class="text-center">
      <button onclick="borrar('${doc.id}')" class="btn btn-eliminar">Eliminar</button>
      <button onclick="editar('${doc.id}', '${doc.data().first}', '${doc.data().last}', '${doc.data().date}')" class="btn btn-editar">Editar</button>
      </td>
      </tr>
      `;
    });
});

// EDITAR DATOS
function editar(id, nombre, descripcion, fecha) {
    document.getElementById('nombreTarea').value = nombre;
    document.getElementById('descripcionTarea').value = descripcion;
    document.getElementById('fecha').value = fecha;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar tarea';

    boton.onclick = function () {
        var washingtonRef = db.collection("users").doc(id);

        var nombre = document.getElementById('nombreTarea').value;
        var descripcion = document.getElementById('descripcionTarea').value;

        return washingtonRef.update({
            first: nombre,
            last: descripcion,
            date: fecha,
        })
            .then(function () {
                console.log("Document successfully updated!");
                document.getElementById("boton").innerHTML = "Agregar tarea";
                document.getElementById("nombreTarea").value = "";
                document.getElementById("descripcionTarea").value = "";
            })
            .catch(function (error) {
                console.error("Error updating document: ", error);
            });
    }
}
// ELIMINAR DATOS
function borrar(id) {
    db.collection("users")
        .doc(id)
        .delete()
        .then(function () {
            console.log("Document successfully deleted!");
        })
        .catch(function (error) {
            console.error("Error removing document: ", error);
        });
}

