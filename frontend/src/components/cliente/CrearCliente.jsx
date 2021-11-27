import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import sty from "./CrearCliente.module.css";
const API = "http://localhost:5000";

export default function CrearCliente() {
    const [DClientes, setDClientes] = useState({
        ci_c: "",
        nombre: "",
        apellidos: "",
        direccion: "",
        codigo_postal: "",
        ciudad: "",
        pais: "",
        telefono_de_contacto: "",
    });

    const handlerInputChange = (e) => {
        setDClientes({
            ...DClientes,
            [e.target.name]: e.target.value,
        });
        console.log(DClientes);
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        const cliente = DClientes;
        axios.post(`${API}/clientes`, { cliente }).then((res) => {
            console.log(res);
            console.log(res.data);
        });
        console.log(cliente);
        console.log(API);
    };

    return (
        <div>
            <div className={sty.cabecera_tabla}>
                <Link className={sty.boton} to="/clientes">
                    Ver Clientes
                </Link>
                <div className={sty.titulo_central}>Crear Cliente</div>
                <div className={sty.final}></div>
            </div>
            <form className={sty.formulario} onSubmit={handlerSubmit}>
                <div className={sty.group_form}>
                    <label htmlFor="ci_c">Carnet Identidad:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="number"
                        name="ci_c"
                        onChange={handlerInputChange}
                        placeholder="Carnet de identidad"
                        id="ci_c"
                        autoFocus
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="text"
                        name="nombre"
                        onChange={handlerInputChange}
                        placeholder="Nombre"
                        id="nombre"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="apellidos">Apellidos:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="text"
                        name="apellidos"
                        onChange={handlerInputChange}
                        placeholder="Apellidos"
                        id="apellidos"
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
                    <label htmlFor="codigo_postal">Codigo Postal:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="number"
                        name="codigo_postal"
                        onChange={handlerInputChange}
                        placeholder="Codigo Postal"
                        id="codigo_postal"
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
                    <label htmlFor="pais">Pais:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="text"
                        name="pais"
                        onChange={handlerInputChange}
                        placeholder="Pais"
                        id="pais"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="telefono">Telefono:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="number"
                        name="telefono_de_contacto"
                        onChange={handlerInputChange}
                        placeholder="Telefono de contacto"
                        id="telefono"
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
