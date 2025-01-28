// frontend: Sucursales.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./Sucursales.css";

const Sucursales = () => {
    const [sucursales, setSucursales] = useState([]);
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/sucursales")
            .then(res => res.json())
            .then(data => setSucursales(data))
            .catch(err => console.error("Error al obtener sucursales:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/sucursales", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, direccion })
        });
        const data = await response.json();
        alert(data.message);
        if (response.ok) {
            setSucursales([...sucursales, { nombre, direccion }]);
            setNombre("");
            setDireccion("");
        }
    };

    return (
        <div className="sucursales-container">
            <h2>Sucursales</h2>
            <form onSubmit={handleSubmit} className="sucursal-form">
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                <button type="submit">Agregar Sucursal</button>
            </form>
            <ul className="sucursales-list">
                {sucursales.map((sucursal, index) => (
                    <li key={index}>{sucursal.Nombre} - {sucursal.Dirección}</li>
                ))}
            </ul>
        </div>
    );
};

export default Sucursales;
