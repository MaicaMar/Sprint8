const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Crear conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'SPRINT8'
});

// Conectar a MySQL
db.connect((err) => {
    if (err) { throw err; }
    console.log('Conexión a la base de datos establecida');
});


//CRUD Usuarios en el Home

  // Endpoint per crear un usuari
  app.post('/users', (req, res) => {
    const { firstName, lastName, email, phone, location } = req.body;
    const sql = 'INSERT INTO users (firstName, lastName, email, phone, location) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, email, phone, location], (err, result) => {
      if (err) throw err;
      res.header("Content-Type", "application/json");
      console.log("Enviando respuesta:", { message: 'Usuario creado' });
      res.json({ message: 'Usuario creado' });
    });
  });

  // Endpoint para obtener una lista paginada de usuarios
  app.get('/users', (req, res) => {
    const page = parseInt(req.query._page) || 1;  // Página actual, asegurándose de que es un número
    const limit = parseInt(req.query._limit) || 5;  // Cantidad de usuarios por página, asegurándose de que es un número
    const start = (page - 1) * limit;  // Calcula el índice de inicio para la paginación
  
    const sql = 'SELECT * FROM users LIMIT ?, ?';
    db.query(sql, [start, limit], (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(result);
    });
  });
  
  // Endpoint per actualitzar un usuari
  app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, location } = req.body;
    const sql = 'UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?, location = ? WHERE id = ?';
    db.query(sql, [firstName, lastName, email, phone, location, id], (err, result) => {
      if (err) {
        console.error('Error al modificar el usuario:', err);
        res.status(500).json({ error: 'Error al modificar el usuario' }); // Enviar un error en formato JSON
      } else {
        res.json({ message: 'Usuario actualizado' }); // Enviar un éxito en formato JSON
      }
    });
  });
  
  // Endpoint per eliminar un usuari
  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.status(200).json({ message: 'Usuario eliminado' });
    });
  });


// MAP: Endpoints para Ubicaciones

  // Endpoint para agregar una nueva ubicación
  app.post('/locations', (req, res) => {
    const { name, latitude, longitude } = req.body;
    const sql = 'INSERT INTO locations (name, latitude, longitude) VALUES (?, ?, ?)';
    db.query(sql, [name, latitude, longitude], (err, result) => {
        if (err) throw err;
        res.header("Content-Type", "application/json");
        res.json({ message: 'Ubicación creada' });
    });
  });

  // Endpoint para obtener todas las ubicaciones
  app.get('/locations', (req, res) => {
    const sql = 'SELECT * FROM locations';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
  });


// FULL-CALENDAR

// Endpoint para obtener eventos
app.get('/events', (req, res) => {
  const sql = 'SELECT * FROM events';
  db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
  });
});

// Endpoint para agregar un evento
app.post('/events', (req, res) => {
  const { title, start, end } = req.body;
  const sql = 'INSERT INTO events (title, start, end) VALUES (?, ?, ?)';
  db.query(sql, [title, start, end], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Evento agregado' });
  });
});


// GRAPHICS

// Endpoint para obtener todos los datos de 'graphics_barchart'
app.get('/graphics_barchart', (req, res) => {
  const query = 'SELECT * FROM graphics_barchart';
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener datos');
    } else {
      res.json(result);
    }
  });
});

// Endpoint para actualizar un dato en 'graphics_barchart' por ID
app.put('/graphics_barchart/:id', (req, res) => {
  const { id } = req.params;
  const { year, series_a, series_b } = req.body;
  const query = 'UPDATE graphics_barchart SET year=?, series_a=?, series_b=? WHERE id=?';
  db.query(query, [year, series_a, series_b, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al actualizar dato');
    } else {
      res.send('Dato actualizado correctamente');
    }
  });
});


// Iniciar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
