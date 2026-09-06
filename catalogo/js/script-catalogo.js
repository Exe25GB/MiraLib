// ==========================================
// 1. CONECTAR CON EL HTML
// ==========================================
// Buscamos la tabla, el buscador de texto y el selector de categorías
const tablaCuerpo = document.getElementById("tablaCuerpo");
const buscadorTabla = document.getElementById("buscadorTabla");
const filtroCategoria = document.getElementById("filtroCategoria");

// ==========================================
// 2. OBTENER LOS LIBROS DEL INVENTARIO
// ==========================================
// Usamos exactamente el mismo nombre "catalogo_libros" que usa tu script de inventario
function obtenerLibros() {
    const librosGuardados = localStorage.getItem("catalogo_libros");
    if (librosGuardados) {
        return JSON.parse(librosGuardados);
    } else {
        return []; // Si está vacío, devolvemos un arreglo sin nada
    }
}

// ==========================================
// 3. MOSTRAR Y FILTRAR LA TABLA (REQUISITO R.1)
// ==========================================
function mostrarCatalogo() {
    const libros = obtenerLibros();
    
    // Obtenemos lo que el usuario escribió y la categoría elegida
    const textoBuscado = buscadorTabla.value.toLowerCase();
    const categoriaSeleccionada = filtroCategoria.value;

    tablaCuerpo.innerHTML = ""; // Limpiamos la tabla antes de dibujar los resultados

    // Filtramos los libros que coincidan con la búsqueda Y con la categoría
    const librosFiltrados = libros.filter(libro => {
        // ¿El título o autor contienen el texto buscado?
        const coincideTexto = libro.titulo.toLowerCase().includes(textoBuscado) || 
                              libro.autor.toLowerCase().includes(textoBuscado);
        
        // ¿La categoría elegida es "Todas" o coincide con la del libro?
        const coincideCategoria = categoriaSeleccionada === "Todas" || libro.categoria === categoriaSeleccionada;

        // Solo se muestra si cumple ambas condiciones
        return coincideTexto && coincideCategoria;
    });

    // Si la búsqueda no arroja resultados, mostramos un mensaje
    if (librosFiltrados.length === 0) {
        tablaCuerpo.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-3">No se encontraron ejemplares con esos filtros.</td></tr>`;
        return;
    }

    // Dibujamos cada libro filtrado en la tabla
    librosFiltrados.forEach((libro, index) => {
        // Colores visuales para el estado del libro

        // Botón de acción: Si está disponible, se puede solicitar (Requisito R.2)
        let botonAccion = "";
        if (libro.estado === "Disponible") {
            botonAccion = `<button class="btn btn-sm btn-outline-success">Solicitar</button>`;
        } else {
            // Si está prestado o de baja, el botón aparece desactivado
            botonAccion = `<button class="btn btn-sm btn-outline-secondary" disabled>No Disponible</button>`;
        }

        // Creamos la fila HTML
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

// ==========================================
// 4. ACTIVAR LOS FILTROS EN TIEMPO REAL
// ==========================================
// Cada vez que el usuario escribe en el buscador, se actualiza la tabla
buscadorTabla.addEventListener("input", mostrarCatalogo);

// Cada vez que el usuario elige una opción en el selector, se actualiza la tabla
filtroCategoria.addEventListener("change", mostrarCatalogo);

// ==========================================
// 5. INICIAR AL CARGAR LA PÁGINA
// ==========================================
mostrarCatalogo();