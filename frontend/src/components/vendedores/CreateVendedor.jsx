import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import sty from "./CreateVendedor.module.css";
const API = "http://localhost:5000";

export default function CreateVendedor() {
    const [datosVendedor, setdatosVendedor] = useState({
        ci_v: "",
        nombre: "",
        apellidos: "",
        fecha_de_nacimiento: "",
        fecha_de_contratacion: "",
        direccion: "",
        codigo_postal: "",
        ciudad: "",
        pais: "",
        telefono_del_domicilio: "",
        movil_de_contacto: "",
        codigo_agencia: "",
    });
    const [Agencias, setAgencias] = useState([]);
    const getAgencias = () => {
        axios.get(`${API}/agencias`).then((res) => {
            const agencias = res.data;
            // this.setState({ agencias });
            // console.log(res.data);
            setAgencias(agencias);
        });
    };
    // Lamada automatica para obtener agencias
    useEffect(() => {
        getAgencias();
    }, []);

    const handlerInputChange = (e) => {
        setdatosVendedor({
            ...datosVendedor,
            [e.target.name]: e.target.value,
        });
        console.log(datosVendedor);
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        const vendedor = datosVendedor;
        axios.post(`${API}/vendedores`, { vendedor }).then((res) => {
            console.log(res);
            console.log(res.data);
            setdatosVendedor(res.data);
        });
        // console.log(agencia);
        // console.log(ageciaMessage, "Esto es el");
        // console.log(API);
    };
    return (
        <div>
            <div className={sty.cabecera_tabla}>
                <Link className={sty.boton} to="/vendedores">
                    Ver Vendedores
                </Link>
                <div className={sty.titulo_central}>Crear Vendedor</div>
                <div className={sty.final}></div>
            </div>
            <form className={sty.formulario} onSubmit={handlerSubmit}>
                <div className={sty.group_form}>
                    <label htmlFor="ci_v">CI:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="number"
                        name="ci_v"
                        onChange={handlerInputChange}
                        placeholder="Carnet identidad"
                        id="ci_v"
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
                    <label htmlFor="fecha_de_nacimiento">
                        Fecha de Nacimiento:
                    </label>
                    <input
                        required
                        className={sty.inputs}
                        type="datetime-local"
                        name="fecha_de_nacimiento"
                        onChange={handlerInputChange}
                        placeholder="Fecha de nacimiento"
                        id="fecha_de_nacimiento"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="fecha_de_contratacion">
                        Fecha de contratacion:
                    </label>
                    <input
                        required
                        className={sty.inputs}
                        type="datetime-local"
                        name="fecha_de_contratacion"
                        onChange={handlerInputChange}
                        placeholder="Fecha de contratacion"
                        id="fecha_de_contratacion"
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
                    <label htmlFor="telefono_del_domicilio">
                        Telefono de contacto:
                    </label>
                    <input
                        required
                        className={sty.inputs}
                        type="number"
                        name="telefono_del_domicilio"
                        onChange={handlerInputChange}
                        placeholder="Telefono de domicilio"
                        id="telefono_del_domicilio"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="movil_de_contacto">Celular:</label>
                    <input
                        required
                        className={sty.inputs}
                        type="number"
                        name="movil_de_contacto"
                        onChange={handlerInputChange}
                        placeholder="Celular de contacto"
                        id="movil_de_contacto"
                    />
                </div>
                <div className={sty.group_form}>
                    <label htmlFor="codigo_agencia">Codigo Agencia</label>
                    <select
                        name="codigo_agencia"
                        id="codigo_agencia"
                        className={sty.select}
                        onChange={handlerInputChange}
                    >
                        {Agencias.map((age) => {
                            return (
                                <option key={age.codigoA} value={age.codigoA}>
                                    {age.codigoA} - {age.direccion}
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
