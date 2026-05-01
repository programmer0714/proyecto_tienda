const API_URL = 'http://localhost:3000/api/distritos';

async function cargarDistritos() {
    const spinner        = document.getElementById('spinner');
    const tablaContainer = document.getElementById('tablaContainer');
    const cuerpoTabla    = document.getElementById('cuerpoTabla');
    const errorMsg       = document.getElementById('errorMsg');
    const errorText      = document.getElementById('errorText');
    const totalBadge     = document.getElementById('totalRegistros');

    try {
        const response   = await fetch(API_URL);
        const distritos  = await response.json();

        cuerpoTabla.innerHTML = '';

        distritos.forEach(d => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td class="text-center">${d.id_dis}</td>
                <td>${d.nom_dis}</td>
                <td class="text-center">${d.cod_postal}</td>
                <td>${d.supervisor || ''}</td>
                <td class="text-center">
                    <button class="btn btn-warning btn-sm mr-1"
                        onclick="abrirEditar(
                            ${d.id_dis},
                            '${d.nom_dis}',
                            '${d.cod_postal}',
                            '${d.supervisor || ''}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm"
                        onclick="eliminar(${d.id_dis})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            cuerpoTabla.appendChild(fila);
        });

        totalBadge.textContent       = `${distritos.length} registros`;
        spinner.style.display        = 'none';
        tablaContainer.style.display = 'block';

        $('#tablaDistritos').DataTable({
            language : { url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            pageLength: 10,
            order    : [[0, 'asc']]
        });

    } catch (error) {
        spinner.style.display = 'none';
        errorText.textContent = `No se pudo conectar: ${error.message}`;
        errorMsg.classList.remove('d-none');
    }
}

// ── Abrir modal con los datos del distrito ────
window.abrirEditar = function(id, nombre, codPostal, supervisor) {
    document.getElementById('editId').value         = id;
    document.getElementById('editNombre').value     = nombre;
    document.getElementById('editCodPostal').value  = codPostal;
    document.getElementById('editSupervisor').value = supervisor;
    $('#modalEditar').modal('show');
};

// ── Guardar cambios ───────────────────────────
document.getElementById('btnGuardar')
    .addEventListener('click', async () => {
    const id   = document.getElementById('editId').value;
    const body = {
        nom_dis   : document.getElementById('editNombre').value,
        cod_postal: document.getElementById('editCodPostal').value,
        supervisor: document.getElementById('editSupervisor').value
    };
    await fetch(`${API_URL}/${id}`, {
        method : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(body)
    });
    $('#modalEditar').modal('hide');
    location.reload();
});

// ── Eliminar distrito ─────────────────────────
window.eliminar = async function(id) {
    if (!confirm('¿Seguro que deseas eliminar este distrito?')) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    location.reload();
};

document.addEventListener('DOMContentLoaded', cargarDistritos);