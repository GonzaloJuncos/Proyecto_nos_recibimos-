// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const bodyParser = require("body-parser");
// eslint-disable-next-line no-undef
const mysql = require("mysql");
// eslint-disable-next-line no-undef
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost", // Cambiar según la configuración de tu base de datos
    user: "root",      // Usuario de la base de datos
    password: "45516905", // Contraseña de la base de datos
    database: "Proyecto_para_recibirnos", // Nombre de tu base de datos
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
    } else {
        console.log("Conexión exitosa a la base de datos.");
    }
});

// Rutas de la API
// Ruta para login
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Por favor, complete todos los campos." });
    }

    const query = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Error al consultar la base de datos:", err);
            return res.status(500).json({ message: "Error del servidor." });
        }

        if (results.length > 0) {
            res.json({ message: "Inicio de sesión exitoso." });
        } else {
            res.status(401).json({ message: "Correo o contraseña incorrectos." });
        }
    });
});

// Ruta para registro
app.post("/api/register", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Por favor, complete todos los campos." });
    }

    const query = "INSERT INTO usuarios (email, password) VALUES (?, ?)";
    db.query(query, [email, password], (err) => {
        if (err) {
            console.error("Error al registrar al usuario:", err);
            return res.status(500).json({ message: "Error del servidor." });
        }

        res.json({ message: "Usuario registrado exitosamente." });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
