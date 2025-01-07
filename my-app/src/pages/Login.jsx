// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import './Login.css';

// Importar React Router
import { useNavigate } from "react-router-dom";

// Importar Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [isRegister, setIsRegister] = useState(false);
  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (isRegister) {
            try {
                const response = await fetch("http://localhost:5000/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password, role }), // Añadir el rol
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    alert(data.message);
                    setIsRegister(false);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error al registrarse:", error);
                alert("Error al conectar con el servidor.");
            }
        } else {
            try {
                const response = await fetch("http://localhost:5000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    alert(data.message);
    
                    // Guardar el nombre del usuario en localStorage
                    localStorage.setItem("userName", data.userName);
    
                    navigate("/home");
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
                alert("Error al conectar con el servidor.");
            }
        }
    };
    
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="avatar">
                    <FontAwesomeIcon icon={faUser} className="avatar-icon" />
                </div>
                <h2>
                    {isRegister ? "Registrarse" : "Iniciar Sesión"}
                </h2>

                {isRegister && (
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isRegister && (
                <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="">Seleccione un rol</option>
                <option value="1">Administrador</option>
                <option value="2">Empleado</option>
            </select>
            
             
                )}

                <button type="submit" className="login-button">
                    {isRegister ? "Registrarse" : "Iniciar Sesión"}
                </button>

                <div className="options">
                    <p>
                        {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
                        <a href="#" onClick={() => setIsRegister(!isRegister)}>
                            {isRegister ? " Iniciar Sesión" : " Registrarse"}
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;







