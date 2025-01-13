/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Importación de Font Awesome

const Home = () => {
    const userName = localStorage.getItem("userName");

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        localStorage.clear(); // Limpia el almacenamiento local
        window.location.href = "/login"; // Redirige al login
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
                        <i className="menu-icon fas fa-building"></i>
                        <span>Sucursales</span>
                    </li>
                    <li>
                        <i className="menu-icon fas fa-truck"></i>
                        <span>Proveedores</span>
                    </li>
                    <li>
                        <i className="menu-icon fas fa-box"></i>
                        <span>Productos</span>
                    </li>
                    <li>
                        <i className="menu-icon fas fa-warehouse"></i>
                        <span>Stock</span>
                    </li>
                    <li>
                        <i className="menu-icon fas fa-shopping-cart"></i>
                        <span>Compras</span>
                    </li>
                    <li>
                        <i className="menu-icon fas fa-dollar-sign"></i>
                        <span>Ventas</span>
                    </li>
                    <li>
                        <i className="menu-icon fas fa-chart-line"></i>
                        <span>Reportes</span>
                    </li>
                    <li>
                        <i className="menu-icon fas fa-file-invoice"></i>
                        <span>Facturación</span>
                    </li>
                    <li>
                        <i className="menu-icon fas fa-cash-register"></i>
                        <span>Caja</span>
                    </li>
                </ul>
                {/* Botón de Cerrar Sesión al final de la barra lateral */}
                <div className="logout-button-container">
                    <button className="logout-button" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                    </button>
                </div>
            </div>
            <div className="content">
                {/* Si deseas mantener este mensaje, solo deja uno de los dos */}
                {/* Elimina este mensaje si prefieres el del header */}
            </div>
        </div>
    );
};

export default Home;


