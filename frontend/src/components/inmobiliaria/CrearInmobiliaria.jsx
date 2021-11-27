import React, { useState, useEffect } from "react";
import sty from "./CrearInmobiliaria.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
const API = "http://localhost:5000";

export default function CrearInmobiliaria() {
    const [agencia, setAgencia] = useState([]);
    const [DInmuebles, setDInmuebles] = useState({
        codigoInmuebles: "",
        propietario: "",
        direccion: "",
        superficie_util: "",
        nro_habitaciones: "",
        nro_cuartos_de_bano: "",
        lavadero: "",
        exterior_interior: "",
        codigo_agencia: "",
    });
    // Peticion a la agencia para mostrar en el select
    const getAgencias = () => {
        axios.get(`${API}/agencias`).then((res) => {
            const agencia = res.data;
            // this.setState({ agencias });
            // console.log(res.data);
            setAgencia(agencia);
            // console.log(agencia);
        });
    };

    // Llamada tipo automatico a getAgencias obtener agencias
    useEffect(() => {
        getAgencias();
    }, []);

    const handlerInputChange = (e) => {
        setDInmuebles({
            ...DInmuebles,
            [e.target.name]: e.target.value,
        });
        console.log(DInmuebles);
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        const inmueble = DInmuebles;
        axios.post(`${API}/inmuebles`, { inmueble }).then((res) => {
            console.log(res);
            console.log(res.data);
        });
        console.log(inmueble);
        console.log(API);
    };

    return (
        <div>
            <div className={sty.cabecera_tabla}>
                <Link className={sty.boton} to="/inmobiliarias">
                    Ver Inmobiliarias
                </Link>
                <div className={sty.titulo_central}>Crear Inmobiliaria</div>
                <div className={sty.final}></div>
            </div>
            <form className={sty.formulario} onSubmit={handlerSubmit}>
                <div className={sty.group_form}>
                    <label htmlFor="codigoInmuebles">Cod. Inmobiliaria:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="number"
                        name="codigoInmuebles"
                        onChange={handlerInputChange}
                        placeholder="Codigo de la inmobiliaria"
                        id="codigoInmuebles"
                        autoFocus
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="propietario">Propietario:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="text"
                        name="propietario"
                        onChange={handlerInputChange}
                        placeholder="Propietario"
                        id="propietario"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="direccion">Direccion:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="text"
                        name="direccion"
                        onChange={handlerInputChange}
                        placeholder="Direccion"
                        id="direccion"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="superficie_util">
                        Superficie Util m<sup>2</sup> :
                    </label>
                    <input
                        required
                        className={sty.inputs}
                        type="number"
                        name="superficie_util"
                        onChange={handlerInputChange}
                        placeholder="Superficie Util"
                        id="superficie_util"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="nro_cuartos_de_bano">
                        Numero de cuartos:
                    </label>
                    <input
                        required
                        className={sty.inputs}
                        type="number"
                        name="nro_cuartos_de_bano"
                        onChange={handlerInputChange}
                        placeholder="Nro de cuartos"
                        id="nro_cuartos_de_bano"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="nro_habitaciones">
                        Numero de habitaciones:
                    </label>
                    <input
                        required
                        className={sty.inputs}
                        type="number"
                        name="nro_habitaciones"
                        onChange={handlerInputChange}
                        placeholder="Nro de habitaciones"
                        id="nro_habitaciones"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="">Lavadero:</label>
                    <div className={sty.group_form_radio}>
                        <label htmlFor="si">
                            <input
                                className={sty.input_radio}
                                type="radio"
                                name="lavadero"
                                onChange={handlerInputChange}
                                id="si"
                                value="1"
                            />
                            Si
                        </label>
                        <label htmlFor="no">
                            <input
                                className={sty.input_radio}
                                type="radio"
                                name="lavadero"
                                onChange={handlerInputChange}
                                id="no"
                                value="0"
                            />
                            No
                        </label>
                    </div>
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="">Exterior/Interior:</label>
                    <div className={sty.group_form_radio}>
                        <label htmlFor="exterior">
                            <input
                                className={sty.input_radio}
                                type="radio"
                                name="exterior_interior"
                                onChange={handlerInputChange}
                                id="exterior"
                                value="exterior"
                            />
                            Exterior
                        </label>
                        <label htmlFor="interior">
                            <input
                                className={sty.input_radio}
                                type="radio"
                                name="exterior_interior"
                                onChange={handlerInputChange}
                                id="interior"
                                value="interior"
                            />
                            Interior
                        </label>
                    </div>
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="codigo_agencia">Codigo Agencia</label>
                    <select
                        name="codigo_agencia"
                        id="codigo_agencia"
                        className={sty.select}
                        onChange={handlerInputChange}
                    >
                        {agencia.map((age) => {
                            return (
                                <option key={age.codigoA} value="3">
                                    {age.codigoA} - {age.direccion}{" "}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className={sty.group_form_send}>
                    <input
                        type="submit"
                        className={sty.boton_send}
                        value="Registrar"
                    />
                    <input
                        type="reset"
                        className={sty.boton_reset}
                        value="Limpiar"
                    />
                </div>
            </form>
        </div>
    );
}
