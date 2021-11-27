import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sty from "./ListarReservas.module.css";
import axios from "axios";
const API = "http://localhost:5000";

export default function ListarReservas() {
    const [Reservas, setReservas] = useState([]);
    const [Eliminado, setEliminado] = useState([]);
    const getReservas = () => {
        axios.get(`${API}/reservas`).then((res) => {
            console.log(res.status);
            console.log(res.data);
            setReservas(res.data);
        });
    };

    useEffect(() => {
        getReservas();
    }, []);

    const deleteReserva = async (cliente, inmueble, agencia, vendedor) => {
        const respuesta = window.confirm("Seguro que desea eliminar");
        const deleteReservas = {
            codigoC: cliente,
            codigoI: inmueble,
            codigoA: agencia,
            codigoV: vendedor,
        };
        console.log(deleteReservas);
        if (respuesta) {
            await axios
                .delete(`${API}/reservas`, { deleteReservas })
                .then((res) => {
                    // console.log(res);
                    // console.log(res.data, " esto es mensaje");
                    const eliminado = res.data;
                    // console.log(eliminado, " message");
                    setEliminado(eliminado);
                });
        }
        deleteReserva();
        deleteReserva();
    };
    return (
        <div>
            <div className={sty.cabecera_tabla}>
                <Link className={sty.boton} to="/create/agencia">
                    Registrar Venta/Alquiler
                </Link>
                <div className={sty.titulo_central}>Ventas Alquiler</div>
                <div className="final"></div>
            </div>

            {/* <PopUp message={deleteMessage} /> */}
            {/* <PopUp message="deleteMessaje" /> */}
            <table className={sty.table}>
                <thead className={sty.cabecera_fila}>
                    <tr>
                        <th>Codigo Cliente</th>
                        <th>Codigo Inmueble</th>
                        <th>Codigo Agencia</th>
                        <th>Codigo Vendedor</th>
                        <th>Precio</th>
                        <th>Gestionar</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Final</th>
                        <th>Operacion</th>
                    </tr>
                </thead>
                <tbody>
                    {Reservas.map((reserva) => {
                        return (
                            <tr key={reserva.codigo_cliente}>
                                <td>{reserva.codigo_cliente}</td>
                                <td>{reserva.codigo_inmueble}</td>
                                <td>{reserva.codigo_agencia}</td>
                                <td>{reserva.codigo_vendedor}</td>
                                <td>{reserva.gestionar}</td>
                                <td>{reserva.precio}</td>
                                <td>{reserva.fecha_inicio}</td>
                                <td>{reserva.fecha_fina}</td>
                                <td className={sty.operacion}>
                                    <div>
                                        <button className={sty.editar}>
                                            <Link to="">Editar</Link>
                                        </button>
                                        <button
                                            className={sty.eliminar}
                                            onClick={() =>
                                                deleteReserva(
                                                    reserva.codigo_cliente,
                                                    reserva.codigo_inmueble,
                                                    reserva.codigo_agencia,
                                                    reserva.codigo_vendedor
                                                )
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
