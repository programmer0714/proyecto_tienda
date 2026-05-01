// ============================================================
// vendedores.js  –  Mantenimiento de Vendedores
// Consume la API del BackEnd y renderiza la tabla con DataTables
// ============================================================

const API_URL = 'http://localhost:3000/api/vendedores';

/**
 * Obtiene los vendedores (con JOIN a distritos) desde el BackEnd
 * y construye la tabla dinámicamente.
 */
async function cargarVendedores() {
    const spinner        = document.getElementById('spinner');
    const tablaContainer = document.getElementById('tablaContainer');
    const cuerpoTabla    = document.getElementById('cuerpoTabla');
    const errorMsg       = document.getElementById('errorMsg');
    const errorText      = document.getElementById('errorText');
    const totalBadge     = document.getElementById('totalRegistros');

    try {
        // Llamada a la API del BackEnd (Express)
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
        }

        const vendedores = await response.json();

        // Construir filas dinámicamente
        cuerpoTabla.innerHTML = '';

        vendedores.forEach(v => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td class="text-center">${v.id_ven}</td>
                <td>${v.nom_ven}</td>
                <td>${v.ape_ven}</td>
                <td>
                    <a href="mailto:${v.correo}">${v.correo}</a>
                </td>
                <td>
                    <span class="badge badge-info">${v.nom_dis}</span>
                </td>
            `;
            cuerpoTabla.appendChild(fila);
        });

        // Actualizar contador
        totalBadge.textContent = `${vendedores.length} registros`;

        // Ocultar spinner y mostrar tabla
        spinner.style.display        = 'none';
        tablaContainer.style.display = 'block';

        // Inicializar DataTables
        $('#tablaVendedores').DataTable({
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
            },
            pageLength: 10,
            order: [[0, 'asc']]
        });

    } catch (error) {
        console.error('Error al cargar vendedores:', error);
        spinner.style.display = 'none';
        errorText.textContent = `No se pudo conectar con el servidor: ${error.message}`;
        errorMsg.classList.remove('d-none');
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarVendedores);
