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

    db.collection("users")
        .add({
            first: nombre,
            last: descripcion,
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
      <td></td>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        
      <td>
      <button onclick="borrar('${doc.id}')" class="btn btn-danger btn-tarea">Eliminar</button>
      </td>
      <td>
      <button onclick="editar('${doc.id}', '${doc.data().first}', '${doc.data().last}')" class="btn btn-info btn-tarea">Editar</button>
      </td>
      </tr>
      `;
    });
});

// EDITAR DATOS
function editar(id, nombre, descripcion) {
    document.getElementById('nombreTarea').value = nombre;
    document.getElementById('descripcionTarea').value = descripcion;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function () {
        var washingtonRef = db.collection("users").doc(id);
        // Set the "capital" field of the city 'DC'

        var nombre = document.getElementById('nombreTarea').value;
        var descripcion = document.getElementById('descripcionTarea').value;

        return washingtonRef.update({
            first: nombre,
            last: descripcion,
        })
            .then(function () {
                console.log("Document successfully updated!");
                document.getElementById("boton").innerHTML = "Agregar tarea";
                document.getElementById("nombreTarea").value = "";
                document.getElementById("descripcionTarea").value = "";
            })
            .catch(function (error) {
                // The document probably doesn't exist.
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
