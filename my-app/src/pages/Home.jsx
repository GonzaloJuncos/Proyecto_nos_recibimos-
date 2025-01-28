// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Home = () => {
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <div className="home-container">
            <header className="header">
                <p className="welcome-message">
                    Bienvenido, {userName || "Invitado"}
                </p>
            </header>
            <div className="sidebar">
                <ul className="menu">
                    <li>
                        <Link to="/sucursales">
                            <i className="menu-icon fas fa-building"></i>
                            <span>Sucursales</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/proveedores">
                            <i className="menu-icon fas fa-truck"></i>
                            <span>Proveedores</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/productos">
                            <i className="menu-icon fas fa-box"></i>
                            <span>Productos</span>
                        </Link>
                    </li>
                    {userRole === "1" && (
                        <li>
                            <Link to="/stock">
                                <i className="menu-icon fas fa-warehouse"></i>
                                <span>Stock</span>
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/compras">
                            <i className="menu-icon fas fa-shopping-cart"></i>
                            <span>Compras</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/ventas">
                            <i className="menu-icon fas fa-dollar-sign"></i>
                            <span>Ventas</span>
                        </Link>
                    </li>
                    {userRole === "1" && (
                        <>
                            <li>
                                <Link to="/reportes">
                                    <i className="menu-icon fas fa-chart-line"></i>
                                    <span>Reportes</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/caja">
                                    <i className="menu-icon fas fa-cash-register"></i>
                                    <span>Caja</span>
                                </Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to="/facturacion">
                            <i className="menu-icon fas fa-file-invoice"></i>
                            <span>Facturación</span>
                        </Link>
                    </li>
                </ul>
                <div className="logout-button-container">
                    <button className="logout-button" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                    </button>
                </div>
            </div>
            <div className="content">
                {/* Contenido principal */}
            </div>
        </div>
    );
};

export default Home;



