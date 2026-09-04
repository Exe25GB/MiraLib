
    /* Login.html */
const botonContinuar = document.querySelector("#Enter");

botonContinuar.addEventListener("click", () =>{

    const cuadroTexto1 = document.querySelector("#v_correo");
    const cuadroTexto2 = document.querySelector("#v_pass");
    
    const v_correo = cuadroTexto1.value;
    const v_pass = cuadroTexto2.value;

    if (sessionStorage.getItem("correo") == v_correo && sessionStorage.getItem("pass") == v_pass){
        window.location.href = "../catálogo/index.html"
    }else if (v_correo != "" && v_pass != ""){
        alert("Acceso denegado, correo o contraseña incorrectos")
        cuadroTexto1.value = ""
        cuadroTexto2.value = ""
    }else if (v_correo != ""){
        alert("falta contraseña")
    }else if (v_pass != ""){
        alert("falta correo")
    }else{
        alert("Nada")
    }
    
})


const botonRegistro = document.querySelector("#Registro");
botonRegistro.addEventListener("click", () =>{

    window.location.href = "registro.html"
})


