/* eslint-disable no-undef */
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
    const [isRegister, setIsRegister] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegister) {
            try {
                const response = await fetch("http://localhost:5000/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
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

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (step === 1) {
            try {
                const response = await fetch("http://localhost:5000/api/forgot-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    setStep(2);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error al enviar la solicitud:", error);
                alert("Error al conectar con el servidor.");
            }
        } else if (step === 2) {
            try {
                const response = await fetch("http://localhost:5000/api/verify-code", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, code: verificationCode }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    setStep(3);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error al verificar el código:", error);
                alert("Error al conectar con el servidor.");
            }
        } else if (step === 3) {
            try {
                const response = await fetch("http://localhost:5000/api/reset-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    setForgotPassword(false);
                    setStep(1);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error al restablecer la contraseña:", error);
                alert("Error al conectar con el servidor.");
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={forgotPassword ? handleForgotPassword : handleSubmit} className="login-form">
                <div className="avatar">
                    <FontAwesomeIcon icon={faUser} className="avatar-icon" />
                </div>
                <h2>
                    {forgotPassword
                        ? step === 1
                            ? "Recuperar Contraseña"
                            : step === 2
                            ? "Verificar Código"
                            : "Restablecer Contraseña"
                        : isRegister
                        ? "Registrarse"
                        : "Iniciar Sesión"}
                </h2>

                {forgotPassword && step === 1 && (
                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                )}

                {forgotPassword && step === 2 && (
                    <input
                        type="text"
                        placeholder="Código de verificación"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                )}

                {forgotPassword && step === 3 && (
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                )}

                {!forgotPassword && (
                    <>
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
                    </>
                )}

                <button type="submit" className="login-button">
                    {forgotPassword
                        ? step === 1
                            ? "Enviar Código"
                            : step === 2
                            ? "Verificar Código"
                            : "Restablecer Contraseña"
                        : isRegister
                        ? "Registrarse"
                        : "Iniciar Sesión"}
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
                        <a href="#" onClick={() => { setForgotPassword(false); setStep(1); }}>
                            Volver al inicio
                        </a>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;






