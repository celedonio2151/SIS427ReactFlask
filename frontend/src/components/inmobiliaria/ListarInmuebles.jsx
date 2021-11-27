import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import sty from "./ListarInmuebles.module.css";
const API = "http://localhost:5000";

export default function ListarInmuebles() {
    const [Inmuebles, setInmuebles] = useState([]);

    const getInmuebles = () => {
        axios.get(`${API}/inmuebles`).then((res) => {
            const inmuebles = res.data;
            // this.setState({ inmuebles });
            // console.log(res.data);
            setInmuebles(inmuebles);
        });
    };

    // Llamada tipo automatico a getAgencias obtener agencias
    useEffect(() => {
        getInmuebles();
    }, []);

    const deleteInmueble = (id) => {
        const respuesta = window.confirm("Seguro que desea eliminar");
        if (respuesta) {
            axios.delete(`${API}/inmuebles/${id}`).then((res) => {
                // console.log(res);
                console.log(res.data);
            });
            console.log("Elimina");
        }
        getInmuebles();
        getInmuebles();
    };

    return (
        <div>
            <div className={sty.cabecera_tabla}>
                <Link className={sty.boton} to="/inmobiliarias/create">
                    Crear Inmobiliarias
                </Link>
                <div className={sty.titulo_central}>Inmobiliarias</div>
                <div className={sty.final}></div>
            </div>

            <table className={sty.table}>
                <thead className={sty.cabecera_fila}>
                    <tr>
                        <th>Cod. Inmueble</th>
                        <th>Propietario</th>
                        <th>Direccion</th>
                        <th>
                            Superficie m<sup>2</sup>{" "}
                        </th>
                        <th>Habitaciones</th>
                        <th>Baños</th>
                        <th>Lavadero</th>
                        <th>Ex Int</th>
                        <th>Operacion</th>
                    </tr>
                </thead>
                <tbody>
                    {Inmuebles.map((inmuebles) => {
                        return (
                            <tr key={inmuebles.codigoI}>
                                <td> {inmuebles.codigoInmuebles} </td>
                                <td> {inmuebles.propietario} </td>
                                <td> {inmuebles.direccion} </td>
                                <td> {inmuebles.superficie_util} </td>
                                <td> {inmuebles.nro_habitaciones} </td>
                                <td> {inmuebles.nro_cuartos_de_bano} </td>
                                <td> {inmuebles.lavadero} </td>
                                <td> {inmuebles.exterior_interior} </td>
                                <td className={sty.operacion}>
                                    <div>
                                        <button className={sty.editar}>
                                            <Link
                                                to={`/inmobiliarias/${inmuebles.codigoI}/edit`}
                                            >
                                                Editar
                                            </Link>
                                        </button>

                                        <button
                                            className={sty.eliminar}
                                            onClick={() =>
                                                deleteInmueble(
                                                    inmuebles.codigoI
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
