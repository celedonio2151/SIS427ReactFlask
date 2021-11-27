import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import sty from "./ListarClientes.module.css";
const API = "http://localhost:5000";

export default function ListarClientes() {
    const [clientes, setClientes] = useState([]);

    const getClientes = () => {
        axios.get(`${API}/clientes`).then((res) => {
            const clientes = res.data;
            // this.setState({ clientes });
            // console.log(res.data);
            setClientes(clientes);
        });
    };

    // Llamada tipo automatico a getAgencias obtener agencias
    useEffect(() => {
        getClientes();
    }, []);

    const deleteCliente = (id) => {
        const respuesta = window.confirm("Seguro que desea eliminar");
        if (respuesta) {
            axios.delete(`${API}/clientes/${id}`).then((res) => {
                // console.log(res);
                console.log(res.data);
            });
            console.log("Elimina");
        }
        getClientes();
        getClientes();
    };

    return (
        <div>
            <div className={sty.cabecera_tabla}>
                <Link className={sty.boton} to="/clientes/create">
                    Crear Cliente
                </Link>
                <div className={sty.titulo_central}>Agencias</div>
                <div className={sty.final}></div>
            </div>

            <table className={sty.table}>
                <thead className={sty.cabecera_fila}>
                    <tr>
                        <th>Carnet ID</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Direccion</th>
                        <th>Codigo Postal</th>
                        <th>Ciudad</th>
                        <th>Pais</th>
                        <th>Telefono</th>
                        <th>Operacion</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => {
                        return (
                            <tr key={cliente.codigoC}>
                                <td> {cliente.ci_c} </td>
                                <td> {cliente.nombre} </td>
                                <td> {cliente.apellidos} </td>
                                <td> {cliente.direccion} </td>
                                <td> {cliente.codigo_postal} </td>
                                <td> {cliente.ciudad} </td>
                                <td> {cliente.pais} </td>
                                <td> {cliente.telefono_de_contacto} </td>
                                <td className={sty.operacion}>
                                    <div>
                                        <button className={sty.editar}>
                                            <Link
                                                to={`/clientes/${cliente.codigoC}/edit`}
                                            >
                                                Editar
                                            </Link>
                                        </button>

                                        <button
                                            className={sty.eliminar}
                                            onClick={() =>
                                                deleteCliente(cliente.codigoC)
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
