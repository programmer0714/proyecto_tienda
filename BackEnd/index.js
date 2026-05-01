const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');

const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ── Conexión a MySQL ──────────────────────────
const db = mysql.createConnection({
    host    : '127.0.0.1',
    user    : 'root',
    password: '',
    database: 'ventas_db'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar MySQL:', err.message);
        return;
    }
    console.log('MySQL Conectado');
});

// ════════════════════════════════════════════
// RUTAS DE DISTRITOS
// ════════════════════════════════════════════

// Listar todos los distritos
app.get('/api/distritos', (req, res) => {
    db.query('CALL sp_listaDistritos()', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]);
    });
});

// Insertar un distrito
app.post('/api/distritos', (req, res) => {
    const { nom_dis, cod_postal, supervisor } = req.body;
    db.query('CALL sp_insertarDistrito(?,?,?)',
        [nom_dis, cod_postal, supervisor], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Distrito creado correctamente' });
    });
});

// Actualizar un distrito
app.put('/api/distritos/:id', (req, res) => {
    const { nom_dis, cod_postal, supervisor } = req.body;
    db.query('CALL sp_actualizarDistrito(?,?,?,?)',
        [req.params.id, nom_dis, cod_postal, supervisor], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Distrito actualizado correctamente' });
    });
});

// Eliminar un distrito
app.delete('/api/distritos/:id', (req, res) => {
    db.query('CALL sp_eliminarDistrito(?)',
        [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Distrito eliminado correctamente' });
    });
});

// ════════════════════════════════════════════
// RUTAS DE VENDEDORES
// ════════════════════════════════════════════

// Listar todos los vendedores
app.get('/api/vendedores', (req, res) => {
    db.query('CALL sp_listaVendedores()', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]);
    });
});

// Insertar un vendedor
app.post('/api/vendedores', (req, res) => {
    const { nom_ven, ape_ven, correo, id_dis } = req.body;
    db.query('CALL sp_insertarVendedor(?,?,?,?)',
        [nom_ven, ape_ven, correo, id_dis], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Vendedor creado correctamente' });
    });
});

// Actualizar un vendedor
app.put('/api/vendedores/:id', (req, res) => {
    const { nom_ven, ape_ven, correo, id_dis } = req.body;
    db.query('CALL sp_actualizarVendedor(?,?,?,?,?)',
        [req.params.id, nom_ven, ape_ven, correo, id_dis], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Vendedor actualizado correctamente' });
    });
});

// Eliminar un vendedor
app.delete('/api/vendedores/:id', (req, res) => {
    db.query('CALL sp_eliminarVendedor(?)',
        [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Vendedor eliminado correctamente' });
    });
});

// ── Inicio del servidor ───────────────────────
app.listen(PORT, () => {
    console.log(`Servidor API en http://localhost:${PORT}`);
});