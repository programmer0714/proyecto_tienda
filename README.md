# Sistema CRUD – Distritos y Vendedores
### SENATI – Ingeniería de Software con IA

---

## Estructura del Proyecto

```
proyecto_distritos/
│
├── database.sql                ← Script SQL (ejecutar primero)
│
├── BackEnd/
│   ├── index.js                ← Servidor Express + rutas API
│   └── package.json
│
└── FrontEnd/
    ├── index.html              ← Página Distritos
    ├── vendedores.html         ← Página Vendedores (TAREA)
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.js             ← Lógica Distritos (fetch + DOM)
        ├── vendedores.js       ← Lógica Vendedores (fetch + DOM)
        └── style.css           ← Estilos personalizados
```

---

## PASO 1 – Base de Datos (XAMPP)

1. Iniciar **XAMPP** → arrancar **Apache** y **MySQL**
2. Abrir **phpMyAdmin** → `http://localhost/phpmyadmin`
3. Ir a la pestaña **SQL** y ejecutar el archivo `database.sql`

Esto crea:
- Base de datos `ventas_db`
- Tabla `distritos` con 30 registros
- Procedimiento almacenado `sp_listaDistritos`
- Tabla `vendedores` con 8 registros (con FK a distritos)

---

## PASO 2 – Backend (Express)

Abrir **Terminal 1** en VS Code:

```bash
cd BackEnd
npm install
node index.js
```

El servidor queda en: `http://localhost:3000`

**Rutas disponibles:**
- `GET /api/distritos`  → Lista todos los distritos
- `GET /api/vendedores` → Lista vendedores con JOIN a distritos

> ⚠️ Si tu MySQL tiene contraseña, editarla en `BackEnd/index.js` línea:
> `password: '',  // ← Cambia aquí`

---

## PASO 3 – Frontend (Vite)

Abrir **Terminal 2** en VS Code:

```bash
cd FrontEnd
npm install
npm run dev
```

El frontend queda en: `http://localhost:5173`

---

## PASO 4 – Ver la aplicación

Abrir el navegador en `http://localhost:5173`

- **index.html** → Tabla de Distritos con búsqueda y paginación
- **vendedores.html** → Tabla de Vendedores con su Distrito

---

## Tecnologías usadas

| Capa       | Tecnología                        |
|------------|-----------------------------------|
| Backend    | Node.js + Express + mysql2 + cors |
| Frontend   | Vite + JavaScript Vanilla (ES6+)  |
| Base datos | MySQL (XAMPP)                     |
| UI         | SB Admin 2 + Bootstrap 4 + DataTables |
=======
# proyecto_tienda
>>>>>>> 502a93c1ff9d819b188dadf20cffd1faf09506ce
