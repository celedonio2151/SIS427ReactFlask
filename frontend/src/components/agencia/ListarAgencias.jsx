import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import sty from "./sty.module.css";
import PopUp from "../PopUp";
const API = "http://localhost:5000";

export default function ListarAgencias() {
    const [agencias, setAgencias] = useState([]);
    const [deleteMessage, setdeleteMessage] = useState([""]);

    const getAgencias = () => {
        axios.get(`${API}/agencias`).then((res) => {
            const agenciass = res.data;
            // this.setState({ agencias });
            // console.log(res.data);
            setAgencias(agenciass);
        });
    };

    // Llamada tipo automatico a getAgencias obtener agencias
    useEffect(() => {
        getAgencias();
    }, []);

    const deleteAgencia = async (id) => {
        const respuesta = window.confirm("Seguro que desea eliminar");
        if (respuesta) {
            await axios.delete(`${API}/agencias/${id}`).then((res) => {
                // console.log(res);
                // console.log(res.data, " esto es mensaje");
                const eliminado = res.data;
                // console.log(eliminado, " message");
                setdeleteMessage(eliminado);
            });
        }
        getAgencias();
        getAgencias();
    };
    console.log(deleteMessage);

    const interval = setInterval(() => {
        console.log("Mostrando cada segundo");
    }, 1000);

    clearInterval(interval);
    // interval(0);

    return (
        <div>
            <div className={sty.cabecera_tabla}>
                <Link className={sty.boton} to="/create/agencia">
                    Crear Agencia
                </Link>
                <div className={sty.titulo_central}>Agencias</div>
                <div className="final"></div>
            </div>

            {/* <PopUp message={deleteMessage} /> */}
            <div>{deleteMessage}</div>

            <table className={sty.table}>
                <thead className={sty.cabecera_fila}>
                    <tr>
                        <th>Direccion</th>
                        <th>Codigo Postal</th>
                        <th>Ciudad</th>
                        <th>Fax</th>
                        <th>Telefonos</th>
                        <th>Zona de Actuacion</th>
                        <th>Operacion</th>
                    </tr>
                </thead>
                <tbody>
                    {agencias.map((agencia) => {
                        return (
                            <tr key={agencia.codigoA}>
                                <td> {agencia.direccion} </td>
                                <td> {agencia.codigo_postal} </td>
                                <td> {agencia.ciudad} </td>
                                <td> {agencia.fax} </td>
                                <td> {agencia.telefonos} </td>
                                <td> {agencia.zona_de_actuacion} </td>
                                <td className={sty.operacion}>
                                    <div>
                                        <button className={sty.editar}>
                                            <Link
                                                to={`/agencias/${agencia.codigoA}/edit`}
                                            >
                                                Editar
                                            </Link>
                                        </button>

                                        <button
                                            className={sty.eliminar}
                                            onClick={() =>
                                                deleteAgencia(agencia.codigoA)
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
