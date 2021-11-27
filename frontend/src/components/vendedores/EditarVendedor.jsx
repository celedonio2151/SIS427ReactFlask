import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import sty from "./EditarVendedor.module.css";
const API = "http://localhost:5000";

export default class EditarVendedor extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
            agencias: [],
        };
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handlerInputChange = this.handlerInputChange.bind(this);
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        await axios.get(`${API}/vendedores/${id}`).then((res) => {
            // console.log(res);
            // console.log(res.data);
            const vendedor = res.data;
            // this.setState({ agencias });
            const fechaN = vendedor[0].fecha_de_nacimiento;
            fechaN = fechaN.toISOString();
            this.setState({
                ci_v: vendedor[0].ci_v,
                nombre: vendedor[0].nombre,
                apellidos: vendedor[0].apellidos,
                fecha_de_nacimiento: vendedor[0].fecha_de_nacimiento,
                fecha_de_contratacion: vendedor[0].fecha_de_contratacion,
                direccion: vendedor[0].direccion,
                codigo_postal: vendedor[0].codigo_postal,
                ciudad: vendedor[0].ciudad,
                pais: vendedor[0].pais,
                telefono_del_domicilio: vendedor[0].telefono_del_domicilio,
                movil_de_contacto: vendedor[0].movil_de_contacto,
                codigo_agencia: vendedor[0].codigo_agencia,
            });
            console.log(this.props.match.params.id, "Este es el ID de la URL");
            console.log(this.state);
        });
        await axios.get(`${API}/agencias`).then((res) => {
            // console.log(res);
            // console.log(res.data);
            const agencias = res.data;
            // this.setState({ inmueble });
            this.setState({
                agencias: agencias,
            });
            // console.log(
            //     this.props.match.params.id,
            //     "Este es el ID de la URL"
            // );
        });
    }

    async handlerInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state, " Esto es el estado");
    }

    async handlerSubmit(e) {
        e.preventDefault();
        const id = this.props.match.params.id;
        const vendedor = this.state;
        await axios.put(`${API}/vendedores/${id}`, { vendedor }).then((res) => {
            console.log(res);
            console.log(res.data);
        });
        // console.log(inmueble, " Enviando...");
    }

    render() {
        return (
            <div>
                <div className={sty.cabecera_tabla}>
                    <Link className={sty.boton} to="/vendedores">
                        Ver Vendedores
                    </Link>
                    <div className={sty.titulo_central}>Editar Vendedor</div>
                    <div className={sty.final}></div>
                </div>
                <form className={sty.formulario} onSubmit={this.handlerSubmit}>
                    <div className={sty.group_form}>
                        <label htmlFor="ci_v">CI:</label>
                        <input
                            required
                            className={sty.inputs}
                            type="number"
                            name="ci_v"
                            onChange={this.handlerInputChange}
                            placeholder="Carnet identidad"
                            id="ci_v"
                            value={this.state.ci_v}
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
                            onChange={this.handlerInputChange}
                            placeholder="Nombre"
                            id="nombre"
                            value={this.state.nombre}
                        />
                    </div>
                    <div className={sty.group_form}>
                        <label htmlFor="apellidos">Apellidos:</label>
                        <input
                            required
                            className={sty.inputs}
                            type="text"
                            name="apellidos"
                            onChange={this.handlerInputChange}
                            placeholder="Apellidos"
                            id="apellidos"
                            value={this.state.apellidos}
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
                            onChange={this.handlerInputChange}
                            placeholder="Fecha de nacimiento"
                            id="fecha_de_nacimiento"
                            // value="2021-11-14T07:37"
                            value={this.state.fecha_de_nacimiento}
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
                            onChange={this.handlerInputChange}
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
                            onChange={this.handlerInputChange}
                            placeholder="Direccion"
                            id="direccion"
                            value={this.state.direccion}
                        />
                    </div>
                    <div className={sty.group_form}>
                        <label htmlFor="codigo_postal">Codigo Postal:</label>
                        <input
                            required
                            className={sty.inputs}
                            type="number"
                            name="codigo_postal"
                            onChange={this.handlerInputChange}
                            placeholder="Codigo Postal"
                            id="codigo_postal"
                            value={this.state.codigo_postal}
                        />
                    </div>
                    <div className={sty.group_form}>
                        <label htmlFor="ciudad">Ciudad:</label>
                        <input
                            required
                            className={sty.inputs}
                            type="text"
                            name="ciudad"
                            onChange={this.handlerInputChange}
                            placeholder="Ciudad"
                            id="ciudad"
                            value={this.state.ciudad}
                        />
                    </div>
                    <div className={sty.group_form}>
                        <label htmlFor="pais">Pais:</label>
                        <input
                            required
                            className={sty.inputs}
                            type="text"
                            name="pais"
                            onChange={this.handlerInputChange}
                            placeholder="Pais"
                            id="pais"
                            value={this.state.pais}
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
                            onChange={this.handlerInputChange}
                            placeholder="Telefono de domicilio"
                            id="telefono_del_domicilio"
                            value={this.state.telefono_del_domicilio}
                        />
                    </div>
                    <div className={sty.group_form}>
                        <label htmlFor="movil_de_contacto">Celular:</label>
                        <input
                            required
                            className={sty.inputs}
                            type="number"
                            name="movil_de_contacto"
                            onChange={this.handlerInputChange}
                            placeholder="Celular de contacto"
                            id="movil_de_contacto"
                            value={this.state.movil_de_contacto}
                        />
                    </div>
                    <div className={sty.group_form}>
                        <label htmlFor="codigo_agencia">Codigo Agencia</label>
                        <select
                            name="codigo_agencia"
                            id="codigo_agencia"
                            className={sty.select}
                            onChange={this.handlerInputChange}
                        >
                            {this.state.agencias.map((age) => {
                                return (
                                    <option
                                        key={age.codigoA}
                                        value={age.codigoA}
                                    >
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
                        {/* <input
                            type="reset"
                            className={sty.boton_reset}
                            value="Limpiar"
                        /> */}
                    </div>
                </form>
            </div>
        );
    }
}
