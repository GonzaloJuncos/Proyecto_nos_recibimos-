/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Importación de Font Awesome


const Home = () => {
    const userName = localStorage.getItem("userName");

    return (
        <div className="home-container">
            <div className="sidebar">
                <ul className="menu">
                    <li>
                        <i className="menu-icon fas fa-user"></i>
                        <span>Usuarios</span>
                    </li>
                    <li>
                        <i className="menu-icon fas fa-building"></i>
                        <span>Sucursales</span>
                    </li>
                    <li>
                        <i className="menu-icon fas fa-users"></i>
                        <span>Clientes</span>
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
                </ul>
            </div>
            <div className="content">
                <p>Bienvenido, {userName || "Invitado"}</p>
            </div>
        </div>
    );
};

export default Home;
