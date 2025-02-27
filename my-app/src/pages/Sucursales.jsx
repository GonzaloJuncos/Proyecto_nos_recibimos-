// frontend: Sucursales.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"; // 📌 Importar Google Maps
import "./Sucursales.css";

const MAPS_API_KEY = "TU_CLAVE_DE_API_AQUI"; // 🔑 Reemplaza con tu clave de API de Google Maps

const containerStyle = {
    width: "100%",
    height: "300px",
};

const centerDefault = { lat: 19.432608, lng: -99.133209 }; // 📍 CDMX por defecto

const Sucursales = () => {
    const [sucursales, setSucursales] = useState([]);
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [coords, setCoords] = useState(centerDefault); // 📌 Estado para coordenadas
    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/sucursales")
            .then(res => res.json())
            .then(data => setSucursales(data))
            .catch(err => console.error("Error al obtener sucursales:", err));
    }, []);

    const handleGeocode = async () => {
        if (!direccion) return;

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${MAPS_API_KEY}`
        );

        const data = await response.json();
        if (data.results.length > 0) {
            const location = data.results[0].geometry.location;
            setCoords(location); // 📍 Actualiza el mapa
        } else {
            alert("No se encontraron coordenadas para esta dirección.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editando) {
            const response = await fetch(`http://localhost:5000/api/sucursales/${idEditando}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, direccion })
            });

            const data = await response.json();
            alert(data.message);

            if (response.ok) {
                setSucursales(sucursales.map(s =>
                    s.IDSucursal === idEditando ? { ...s, Nombre: nombre, direccion } : s
                ));
                setEditando(false);
                setIdEditando(null);
            }
        } else {
            const response = await fetch("http://localhost:5000/api/sucursales", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, direccion })
            });

            const data = await response.json();
            alert(data.message);

            if (response.ok && data.sucursal) {
                setSucursales([...sucursales, data.sucursal]);
            }
        }

        handleGeocode(); // 🔍 Buscar la ubicación en el mapa
        setNombre("");
        setDireccion("");
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta sucursal?")) return;

        const response = await fetch(`http://localhost:5000/api/sucursales/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setSucursales(sucursales.filter(sucursal => sucursal.IDSucursal !== id));
            alert("Sucursal eliminada con éxito.");
        } else {
            alert("Error al eliminar la sucursal.");
        }
    };

    const handleEdit = (sucursal) => {
        setEditando(true);
        setIdEditando(sucursal.IDSucursal);
        setNombre(sucursal.Nombre);
        setDireccion(sucursal.direccion);
        handleGeocode();
    };

    return (
        <div className="sucursales-container">
            <h1 className="titulo-principal">Sucursales</h1>

            <h2>{editando ? "Editar Sucursal" : "Agregar Sucursal"}</h2>
            
            <form onSubmit={handleSubmit} className="sucursal-form">
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                <button type="submit">{editando ? "Guardar Cambios" : "Agregar Sucursal"}</button>
                {editando && <button type="button" onClick={() => { setEditando(false); setNombre(""); setDireccion(""); }}>Cancelar</button>}
            </form>

            {/* 🔍 Mapa de Google */}
            <LoadScript googleMapsApiKey={MAPS_API_KEY}>
                <GoogleMap mapContainerStyle={containerStyle} center={coords} zoom={15}>
                    <Marker position={coords} />
                </GoogleMap>
            </LoadScript>

            {sucursales.length > 0 ? (
                <table className="sucursales-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sucursales.map((sucursal) => (
                            <tr key={sucursal.IDSucursal}>
                                <td>{sucursal.Nombre}</td>
                                <td>{sucursal.direccion}</td>
                                <td className="acciones">
                                    <button className="edit-btn" onClick={() => handleEdit(sucursal)}>
                                        <FaEdit />
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(sucursal.IDSucursal)}>
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




