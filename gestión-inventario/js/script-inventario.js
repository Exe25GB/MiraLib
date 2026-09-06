
// 2. Carga inicial de datos si no existen
const librosIniciales = [
    { id: 1, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", categoria: "Novela", stock: 4, estado: "Disponible" },
    { id: 2, titulo: "Clean Code", autor: "Robert C. Martin", categoria: "Tecnología", stock: 2, estado: "Disponible" },
    { id: 3, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", categoria: "Fantasía", stock: 0, estado: "De Baja" }
];

if (!localStorage.getItem("catalogo_libros")) {
    localStorage.setItem("catalogo_libros", JSON.stringify(librosIniciales));
}

// 3. Referencias del DOM
const formLibro = document.querySelector("#formLibro");
const formTitulo = document.querySelector("#formTitulo");
const inputId = document.querySelector("#libroId");
const inputTitulo = document.querySelector("#tituloLibro");
const inputAutor = document.querySelector("#autorLibro");
const selectCategoria = document.querySelector("#categoriaLibro");
const inputStock = document.querySelector("#stockLibro");
const selectEstado = document.querySelector("#estadoLibro");
const btnGuardar = document.querySelector("#btnGuardar");
const btnCancelar = document.querySelector("#btnCancelarEdicion");
const tablaCuerpo = document.querySelector("#tablaCuerpo");
const buscador = document.querySelector("#buscadorTabla");

// 4. Funciones auxiliares de LocalStorage
const obtenerLibros = () => JSON.parse(localStorage.getItem("catalogo_libros")) || [];
const guardarLibros = (libros) => localStorage.setItem("catalogo_libros", JSON.stringify(libros));

// 5. Renderizar lista en la tabla
const renderizarTabla = (filtro = "") => {
    const libros = obtenerLibros();
    tablaCuerpo.innerHTML = "";

    const librosFiltrados = libros.filter(libro => 
        libro.titulo.toLowerCase().includes(filtro.toLowerCase()) || 
        libro.autor.toLowerCase().includes(filtro.toLowerCase())
    );

    if (librosFiltrados.length === 0) {
        tablaCuerpo.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-3">No se encontraron ejemplares</td></tr>`;
        return;
    }

    librosFiltrados.forEach((libro, index) => {
        let claseEstado = "estado-disponible";
        if (libro.estado === "En Préstamo") {
            claseEstado = "estado-prestamo";
        } else if (libro.estado === "De Baja") {
            claseEstado = "estado-baja";
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${libro.titulo}</strong></td>
            <td>${libro.autor}</td>
            <td>${libro.categoria}</td>
            <td>${libro.stock}</td>
            <td><span class="${claseEstado}">${libro.estado || "Disponible"}</span></td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="prepararEdicion(${libro.id})">Editar</button>
                ${libro.estado !== "De Baja" 
                    ? `<button class="btn btn-sm btn-outline-danger" onclick="darDeBaja(${libro.id})">Dar de Baja</button>`
                    : `<button class="btn btn-sm btn-outline-success" onclick="reactivarLibro(${libro.id})">Reactivar</button>`
                }
            </td>
        `;
        tablaCuerpo.appendChild(tr);
    });
};

// 6. Guardar (Registrar o Editar)
formLibro.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const categoria = selectCategoria.value;
    const stock = parseInt(inputStock.value);
    const estado = selectEstado.value;
    const idEditando = inputId.value;

    if (!titulo || !autor || !categoria || isNaN(stock)) {
        alert("Por favor completa todos los campos requeridos.");
        return;
    }

    let libros = obtenerLibros();

    if (idEditando) {
        // Modificar existente
        libros = libros.map(libro => {
            if (libro.id === parseInt(idEditando)) {
                return { ...libro, titulo, autor, categoria, stock, estado };
            }
            return libro;
        });
        alert("Ejemplar actualizado con éxito.");
    } else {
        // Registrar nuevo
        libros.push({
            id: Date.now(),
            titulo,
            autor,
            categoria,
            stock,
            estado
        });
        alert("Nuevo ejemplar guardado en el catálogo.");
    }

    guardarLibros(libros);
    resetearFormulario();
    renderizarTabla();
});

// 7. Cargar datos al formulario para editar
window.prepararEdicion = (id) => {
    const libro = obtenerLibros().find(l => l.id === id);
    if (!libro) return;

    inputId.value = libro.id;
    inputTitulo.value = libro.titulo;
    inputAutor.value = libro.autor;
    selectCategoria.value = libro.categoria;
    inputStock.value = libro.stock;
    selectEstado.value = libro.estado;

    formTitulo.textContent = "Editar Ejemplar";
    btnGuardar.textContent = "Actualizar Ejemplar";
    btnCancelar.classList.remove("d-none");
};

// 8. Dar de baja
window.darDeBaja = (id) => {
    if (!confirm("¿Deseas dar de baja este ejemplar del catálogo?")) return;

    let libros = obtenerLibros();
    libros = libros.map(l => l.id === id ? { ...l, estado: "De Baja", stock: 0 } : l);
    guardarLibros(libros);
    renderizarTabla(buscador.value);
};

// 9. Reactivar libro dado de baja
window.reactivarLibro = (id) => {
    let libros = obtenerLibros();
    libros = libros.map(l => l.id === id ? { ...l, estado: "Disponible", stock: 1 } : l);
    guardarLibros(libros);
    renderizarTabla(buscador.value);
};

// 10. Cancelar edición
const resetearFormulario = () => {
    formLibro.reset();
    inputId.value = "";
    formTitulo.textContent = "Registrar Nuevo Ejemplar";
    btnGuardar.textContent = "Guardar Ejemplar";
    btnCancelar.classList.add("d-none");
};

btnCancelar.addEventListener("click", resetearFormulario);

// 11. Búsqueda en tiempo real
buscador.addEventListener("input", (e) => {
    renderizarTabla(e.target.value);
});

// Render inicial
renderizarTabla();


const botonRegistro = document.querySelector("#botonCatalogo");
botonRegistro.addEventListener("click", () =>{

    window.location.href = "../catálogo/index.html"
})