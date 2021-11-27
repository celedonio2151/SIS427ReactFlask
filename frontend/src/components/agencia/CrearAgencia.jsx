import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import sty from "./CrearAgencia.module.css";
import PopUp from "../PopUp";
const API = "http://localhost:5000";

export default function CrearAgencia() {
    const [datosAgencia, setdatosAgencias] = useState({
        direccion: "",
        codigo_postal: "",
        ciudad: "",
        fax: "",
        telefonos: "",
        zona_de_actuacion: "",
    });
    const [ageciaMessage, setagenciaMessage] = useState();

    const handlerInputChange = (e) => {
        setdatosAgencias({
            ...datosAgencia,
            [e.target.name]: e.target.value,
        });
        console.log(datosAgencia);
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        const agencia = datosAgencia;
        axios.post(`${API}/agencias`, { agencia }).then((res) => {
            console.log(res);
            // console.log(res.data);
            setagenciaMessage(res.data);
        });
        // console.log(agencia);
        console.log(ageciaMessage, "Esto es el");
        // console.log(API);
    };

    return (
        <div>
            <div className={sty.cabecera_tabla}>
                <Link className={sty.boton} to="/agencias">
                    Ver Agencias
                </Link>
                <div className={sty.titulo_central}>Crear Agencia</div>
                <div className={sty.final}></div>
            </div>
            {/* <PopUp message="ageciaMessage" /> */}
            {/* <PopUp message={ageciaMessage} /> */}
            <form className={sty.formulario} onSubmit={handlerSubmit}>
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
                        autoFocus
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="codigoPostal">Codigo Postal:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="number"
                        name="codigo_postal"
                        onChange={handlerInputChange}
                        placeholder="Codigo Postal"
                        id="codigoPostal"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="ciudad">Ciudad:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="text"
                        name="ciudad"
                        onChange={handlerInputChange}
                        placeholder="Ciudad"
                        id="ciudad"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="fax">Fax:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="number"
                        name="fax"
                        onChange={handlerInputChange}
                        placeholder="Fax"
                        id="fax"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="telefonos">Telefonos:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="number"
                        name="telefonos"
                        onChange={handlerInputChange}
                        placeholder="Telefonos"
                        id="telefonos"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="zonaActuacion">Zona de actuacion:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="text"
                        name="zona_de_actuacion"
                        onChange={handlerInputChange}
                        placeholder="Zona de actuacion"
                        id="zonaActuacion"
                    />
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
