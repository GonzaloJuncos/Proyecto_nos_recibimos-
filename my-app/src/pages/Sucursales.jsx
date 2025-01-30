// frontend: Sucursales.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importar íconos
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

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta sucursal?")) return;

        const response = await fetch(`http://localhost:5000/api/sucursales/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setSucursales(sucursales.filter(sucursal => sucursal.id !== id));
            alert("Sucursal eliminada con éxito.");
        } else {
            alert("Error al eliminar la sucursal.");
        }
    };

    const handleEdit = (sucursal) => {
        const nuevoNombre = prompt("Nuevo nombre:", sucursal.nombre);
        const nuevaDireccion = prompt("Nueva dirección:", sucursal.direccion);

        if (nuevoNombre && nuevaDireccion) {
            fetch(`http://localhost:5000/api/sucursales/${sucursal.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre: nuevoNombre, direccion: nuevaDireccion }),
            })
            .then(response => response.json())
            .then(() => {
                alert("Sucursal actualizada correctamente.");
                setSucursales(sucursales.map(s => 
                    s.id === sucursal.id ? { ...s, nombre: nuevoNombre, direccion: nuevaDireccion } : s
                ));
            })
            .catch(err => console.error("Error al editar sucursal:", err));
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
            
            {sucursales.length > 0 ? (
                <table className="sucursales-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Sucursal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sucursales.map((sucursal) => (
                            <tr key={sucursal.id}>
                                <td>{sucursal.nombre || sucursal.Nombre}</td>
                                <td>{sucursal.direccion || sucursal.Dirección}</td>
                                <td className="acciones">
                                    <button className="edit-btn" onClick={() => handleEdit(sucursal)}>
                                        <FaEdit />
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(sucursal.id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay sucursales registradas.</p>
            )}
        </div>
    );
};

export default Sucursales;


