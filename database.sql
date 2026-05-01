-- ============================================================
-- BASE DE DATOS: ventas_db
-- Tablas: distritos, vendedores
-- Procedimiento: sp_listaDistritos
-- ============================================================

CREATE DATABASE IF NOT EXISTS ventas_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ventas_db;

-- ------------------------------------------------------------
-- TABLA: distritos
-- ------------------------------------------------------------
DROP TABLE IF EXISTS vendedores;
DROP TABLE IF EXISTS distritos;

CREATE TABLE distritos (
  id_dis     INT         NOT NULL AUTO_INCREMENT,
  nom_dis    VARCHAR(25) NOT NULL,
  cod_postal CHAR(3)     NOT NULL,
  PRIMARY KEY (id_dis)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Datos de prueba (30 registros)
INSERT INTO distritos (nom_dis, cod_postal) VALUES
  ('VMT',                   '001'),
  ('VES',                   '002'),
  ('SJM',                   '003'),
  ('Surquillo',              '004'),
  ('Miraflores',             '005'),
  ('San Isidro',             '006'),
  ('Barranco',               '007'),
  ('Surco',                  '008'),
  ('La Molina',              '009'),
  ('San Borja',              '010'),
  ('Jesús María',            '011'),
  ('Lince',                  '012'),
  ('Magdalena del Mar',      '013'),
  ('Pueblo Libre',           '014'),
  ('Breña',                  '015'),
  ('Rímac',                  '016'),
  ('El Agustino',            '017'),
  ('Santa Anita',            '018'),
  ('Ate Vitarte',            '019'),
  ('San Luis',               '020'),
  ('SJL',                    '021'),
  ('Comas',                  '022'),
  ('Los Olivos',             '023'),
  ('Independencia',          '024'),
  ('Carabayllo',             '025'),
  ('Puente Piedra',          '026'),
  ('SMP',                    '027'),
  ('Chorrillos',             '028'),
  ('Lurín',                  '029'),
  ('Chaclacayo',             '030');

-- ------------------------------------------------------------
-- PROCEDIMIENTO ALMACENADO: sp_listaDistritos
-- ------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_listaDistritos;

DELIMITER $$
CREATE PROCEDURE sp_listaDistritos()
BEGIN
  SELECT id_dis, nom_dis, cod_postal
  FROM   distritos;
END $$
DELIMITER ;

-- ------------------------------------------------------------
-- TABLA: vendedores  (TAREA)
-- ------------------------------------------------------------
CREATE TABLE vendedores (
  id_ven  INT         NOT NULL AUTO_INCREMENT,
  nom_ven VARCHAR(30) NOT NULL,
  ape_ven VARCHAR(30) NOT NULL,
  correo  VARCHAR(35) NOT NULL,
  id_dis  INT         NOT NULL,
  PRIMARY KEY (id_ven),
  FOREIGN KEY (id_dis) REFERENCES distritos(id_dis)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO vendedores (nom_ven, ape_ven, correo, id_dis) VALUES
  ('Juan',    'Guillen',   'jguille@gmail.com',    3),
  ('María',   'Torres',    'mtorres@gmail.com',    1),
  ('Carlos',  'Quispe',    'cquispe@hotmail.com',  5),
  ('Lucía',   'Mendoza',   'lmendoza@gmail.com',   2),
  ('Pedro',   'Ramos',     'pramos@outlook.com',   8),
  ('Sofía',   'Huanca',    'shuanca@gmail.com',    4),
  ('Diego',   'Flores',    'dflores@gmail.com',   10),
  ('Ana',     'Chávez',    'achavez@gmail.com',    6);
