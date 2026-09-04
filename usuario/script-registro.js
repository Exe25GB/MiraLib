
const botonRegistro = document.querySelector("#Enter2");
botonRegistro.addEventListener("click", () =>{

    const txtEmail = document.querySelector("#v_email");
    const txtPassword = document.querySelector("#v_password");
    const txtNombre = document.querySelector("#v_nombre");
    const selectSexo = document.querySelector("#v_sexo");
    const checkTerminos = document.querySelector("#v_terminos");

    const email = txtEmail.value.trim();
    const pass = txtPassword.value.trim();
    const nombre = txtNombre.value.trim();
    const sexo = selectSexo.value;
    const terminosAceptados = checkTerminos.checked;

    if (email === "" || pass === "" || nombre === "") {
        alert("Por favor completa todos los campos requeridos (Email, Contraseña y Nombre).");
        return;
    }

    if (sexo === "Sexo" || sexo === "") {
        alert("Por favor selecciona una opción de sexo válida.");
        return;
    }

    if (!terminosAceptados) {
        alert("Debes aceptar los términos y condiciones para continuar.");
        return;
    }

    sessionStorage.setItem("correo", email);
    sessionStorage.setItem("pass", pass);
    sessionStorage.setItem("nombre", nombre);
    sessionStorage.setItem("sexo", sexo);

    alert("Registro exitoso, ahora puedes iniciar sesion.");

    window.location.href = "login.html";
});

const botonVolver = document.querySelector("#Volver");
botonVolver.addEventListener("click", () =>{

    window.location.href = "login.html"
})