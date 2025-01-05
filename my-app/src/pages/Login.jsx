// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import './Login.css';

// Importar React Router
import { useNavigate } from "react-router-dom";

// Importar Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);

    // Hook para redirección
    const navigate = useNavigate();

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar campos vacíos
        if (!email || (!forgotPassword && !password)) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        if (forgotPassword) {
            console.log("Recuperar contraseña para:", email);
            alert("Se ha enviado un código de recuperación al correo.");
        } else if (isRegister) {
            console.log("Registrar usuario:", email, "Contraseña:", password);
            alert("Cuenta registrada exitosamente.");
        } else {
            // Simular credenciales válidas
            const validEmail = "usuario@email.com";
            const validPassword = "123456";

            // Verificar credenciales
            if (email === validEmail && password === validPassword) {
                alert("Inicio de sesión exitoso.");
                setTimeout(() => navigate("/home"), 500); // Redirige al Home después de 500ms
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="avatar">
                    <FontAwesomeIcon icon={faUser} className="avatar-icon" />
                </div>
                <h2>{forgotPassword ? "Recuperar Contraseña" : isRegister ? "Registrarse" : "Iniciar Sesión"}</h2>

                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {!forgotPassword && (
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                )}

                <button type="submit" className="login-button">
                    {forgotPassword ? "Enviar Código" : isRegister ? "Registrarse" : "Iniciar Sesión"}
                </button>

                <div className="options">
                    {!forgotPassword && (
                        <>
                            <a href="#" onClick={() => setForgotPassword(true)}>¿Olvidaste tu contraseña?</a>
                            <p>
                                {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
                                <a href="#" onClick={() => setIsRegister(!isRegister)}>
                                    {isRegister ? " Iniciar Sesión" : " Registrarse"}
                                </a>
                            </p>
                        </>
                    )}
                    {forgotPassword && (
                        <a href="#" onClick={() => setForgotPassword(false)}>Volver al inicio</a>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;




