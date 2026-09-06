const formSolicitud = document.getElementById("formSolicitud");
const selectLibro = document.getElementById("libroSolicitado");
const inputNombre = document.getElementById("nombreSolicitante");
const inputFecha = document.getElementById("fechaDevolucion");
const tablaCuerpo = document.getElementById("tablaCuerpo"); 


function obtenerLibros() {
    const librosGuardados = localStorage.getItem("catalogo_libros");
    return librosGuardados ? JSON.parse(librosGuardados) : [];
}

function obtenerSolicitudes() {
    const solicitudesGuardadas = localStorage.getItem("mis_solicitudes");
    return solicitudesGuardadas ? JSON.parse(solicitudesGuardadas) : [];
}


function cargarLibrosDisponibles() {
    const todosLosLibros = obtenerLibros();
    
    const librosDisponibles = todosLosLibros.filter(libro => libro.estado === "Disponible");

    selectLibro.innerHTML = `<option value="" selected disabled>Seleccione un libro...</option>`;

    if (librosDisponibles.length === 0) {
        selectLibro.innerHTML = `<option value="" disabled>No hay libros disponibles en este momento</option>`;
        return;
    }

    librosDisponibles.forEach(libro => {
        const option = document.createElement("option");
        option.value = libro.id; 
        option.textContent = `${libro.titulo} - ${libro.autor}`;
        selectLibro.appendChild(option);
    });
}


function renderizarTablaSolicitudes() {
    const solicitudes = obtenerSolicitudes();
    const libros = obtenerLibros();
    
    tablaCuerpo.innerHTML = ""; 

    if (solicitudes.length === 0) {
        tablaCuerpo.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-3">Aún no has solicitado ningún libro.</td></tr>`;
        return;
    }

    solicitudes.forEach((solicitud, index) => {

        const libroSolicitado = libros.find(libro => libro.id.toString() === solicitud.idLibro.toString());
        const titulo = libroSolicitado ? libroSolicitado.titulo : "Libro Eliminado";
        const autor = libroSolicitado ? libroSolicitado.autor : "Desconocido";
        const categoria = libroSolicitado ? libroSolicitado.categoria : "N/A";
        
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${titulo}</strong></td>
            <td>${autor}</td>
            <td>${categoria}</td>
            <td>${solicitud.estadoDeSolicitud}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-danger" onclick="cancelarSolicitud(${solicitud.id})">Cancelar</button>
            </td>
        `;
        tablaCuerpo.appendChild(fila);
    });
}

formSolicitud.addEventListener("submit", function(evento) {
    evento.preventDefault(); 

    const nombreIngresado = inputNombre.value.trim();
    const nombreRegistrado = sessionStorage.getItem("nombre");

    if (!nombreRegistrado) {
        alert("Error: Debes iniciar sesión para solicitar un préstamo.");
        window.location.href = "../usuario/login.html"; 
        return;
    }

    if (nombreIngresado.toLowerCase() !== nombreRegistrado.toLowerCase()) {
        alert("El nombre ingresado no coincide con el nombre de usuario registrado.");
        return; 
    }

    let librosGuardados = obtenerLibros();
    let idLibroSeleccionado = selectLibro.value;
    let libroAActualizar = librosGuardados.find(libro => libro.id.toString() === idLibroSeleccionado.toString());

    if (libroAActualizar && parseInt(libroAActualizar.stock) > 0) {

        libroAActualizar.stock = parseInt(libroAActualizar.stock) - 1;
        
        if (libroAActualizar.stock === 0) {
            libroAActualizar.estado = "En Préstamo";
        }
        
        localStorage.setItem("catalogo_libros", JSON.stringify(librosGuardados));
    } else {
        alert("Lo sentimos, este libro se acaba de agotar.");
        return; 
    }


    const nuevaSolicitud = {
        id: Date.now(), 
        idLibro: idLibroSeleccionado, 
        nombre: nombreIngresado,
        fechaDevolucion: inputFecha.value,
        estadoDeSolicitud: "Pendiente" 
    };

    const solicitudesGuardadas = obtenerSolicitudes();
    solicitudesGuardadas.push(nuevaSolicitud);
    localStorage.setItem("mis_solicitudes", JSON.stringify(solicitudesGuardadas));

    alert("¡Solicitud enviada con éxito!");
    formSolicitud.reset();
    
    cargarLibrosDisponibles(); 
    renderizarTablaSolicitudes(); 
});


window.cancelarSolicitud = function(idSolicitud) {
    if(confirm("¿Estás seguro de que quieres cancelar esta solicitud?")) {
        let solicitudes = obtenerSolicitudes();
        
        const solicitudACancelar = solicitudes.find(s => s.id === idSolicitud);
        
        if (solicitudACancelar) {

            let librosGuardados = obtenerLibros();
            let libroADevolver = librosGuardados.find(libro => libro.id.toString() === solicitudACancelar.idLibro.toString());
            
            if (libroADevolver) {
                libroADevolver.stock = parseInt(libroADevolver.stock) + 1;
                
                if (libroADevolver.estado === "En Préstamo") {
                    libroADevolver.estado = "Disponible";
                }
                
                localStorage.setItem("catalogo_libros", JSON.stringify(librosGuardados));
            }

        }

        solicitudes = solicitudes.filter(solicitud => solicitud.id !== idSolicitud);
        localStorage.setItem("mis_solicitudes", JSON.stringify(solicitudes));
        

        renderizarTablaSolicitudes();
        cargarLibrosDisponibles(); 
    }
};

cargarLibrosDisponibles();
renderizarTablaSolicitudes();