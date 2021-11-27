import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import sty from "./ListarVendedores.module.css";
const API = "http://localhost:5000";

export default function ListarVendedores() {
    const [Vendedores, setVendedores] = useState([]);

    const getVendedores = () => {
        axios.get(`${API}/vendedores`).then((res) => {
            const vendedores = res.data;
            // this.setState({ agencias });
            // console.log(res.data);
            setVendedores(vendedores);
        });
    };

    // Llamada tipo automatico a getAgencias obtener agencias
    useEffect(() => {
        getVendedores();
    }, []);

    const deleteVendedor = async (id) => {
        const respuesta = window.confirm("Seguro que desea eliminar");
        if (respuesta) {
            await axios.delete(`${API}/vendedores/${id}`).then((res) => {
                // console.log(res);
                console.log(res.data, " esto es mensaje");
                // console.log(eliminado, " message");
            });
        }
        getVendedores();
        getVendedores();
    };
    return (
        <div>
            <div className={sty.cabecera_tabla}>
                <Link className={sty.boton} to="/create/vendedor">
                    Crear vendedor
                </Link>
                <div className={sty.titulo_central}>Vendedores</div>
                <div className="final"></div>
            </div>

            <table className={sty.table}>
                <thead className={sty.cabecera_fila}>
                    <tr>
                        <th>CI</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Fecha nacimiento</th>
                        <th>Fecha contratacion</th>
                        <th>Direccion</th>
                        <th>Cod. Postal</th>
                        <th>Ciudad</th>
                        <th>Pais</th>
                        <th>Telefono</th>
                        <th>Celular</th>
                        <th>Operacion</th>
                    </tr>
                </thead>
                <tbody>
                    {Vendedores.map((vendedor) => {
                        return (
                            <tr key={vendedor.codigoV}>
                                <td> {vendedor.ci_v} </td>
                                <td> {vendedor.nombre} </td>
                                <td> {vendedor.apellidos} </td>
                                <td> {vendedor.fecha_de_nacimiento} </td>
                                <td> {vendedor.fecha_de_contratacion} </td>
                                <td> {vendedor.direccion} </td>
                                <td> {vendedor.codigo_postal} </td>
                                <td> {vendedor.ciudad} </td>
                                <td> {vendedor.pais} </td>
                                <td> {vendedor.telefono_del_domicilio} </td>
                                <td> {vendedor.movil_de_contacto} </td>
                                <td className={sty.operacion}>
                                    <div>
                                        <button className={sty.editar}>
                                            <Link
                                                to={`/vendedores/${vendedor.codigoV}/edit`}
                                            >
                                                Editar
                                            </Link>
                                        </button>

                                        <button
                                            className={sty.eliminar}
                                            onClick={() =>
                                                deleteVendedor(vendedor.codigoV)
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
