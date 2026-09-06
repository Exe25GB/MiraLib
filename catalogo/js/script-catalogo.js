

const tablaCuerpo = document.getElementById("tablaCuerpo");
const buscadorTabla = document.getElementById("buscadorTabla");
const filtroCategoria = document.getElementById("filtroCategoria");


function obtenerLibros() {
    const librosGuardados = localStorage.getItem("catalogo_libros");
    if (librosGuardados) {
        return JSON.parse(librosGuardados);
    } else {
        return []; 
    }
}

function mostrarCatalogo() {
    const libros = obtenerLibros();
    const textoBuscado = buscadorTabla.value.toLowerCase();
    const categoriaSeleccionada = filtroCategoria.value;

    tablaCuerpo.innerHTML = ""; 


    const librosFiltrados = libros.filter(libro => {

        const coincideTexto = libro.titulo.toLowerCase().includes(textoBuscado) || 
                              libro.autor.toLowerCase().includes(textoBuscado);
        const coincideCategoria = categoriaSeleccionada === "Todas" || libro.categoria === categoriaSeleccionada;


        return coincideTexto && coincideCategoria;
    });

    if (librosFiltrados.length === 0) {
        tablaCuerpo.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-3">No se encontraron ejemplares con esos filtros.</td></tr>`;
        return;
    }

    librosFiltrados.forEach((libro, index) => {

        let botonAccion = "";
        if (libro.estado === "Disponible") {
            botonAccion = `<button class="btn btn-sm btn-outline-success" onclick = "window.location.href='../solicitud-prestamo/solicitud.html'">Solicitar</button>`; 

        } else {
            botonAccion = `<button class="btn btn-sm btn-outline-secondary" disabled>No Disponible</button>`;
        }

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${libro.titulo}</strong></td>
            <td>${libro.autor}</td>
            <td>${libro.categoria}</td>
            <td>${libro.stock}</td>
            <td>${libro.estado}</td>
            <td class="text-center">${botonAccion}</td>
        `;
        tablaCuerpo.appendChild(fila);
    });
}

buscadorTabla.addEventListener("input", mostrarCatalogo);


filtroCategoria.addEventListener("change", mostrarCatalogo);

mostrarCatalogo();