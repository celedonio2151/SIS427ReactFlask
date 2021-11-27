import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import sty from "./EditarInmobiliaria.module.css";
const API = "http://localhost:5000";

export default class EditarInmobiliaria extends Component {
    constructor(props) {
        super(props);

        this.state = {
            codigoInmuebles: "",
            propietario: "",
            direccion: "",
            superficie_util: "",
            nro_habitaciones: "",
            nro_cuartos_de_bano: "",
            lavadero: "",
            exterior_interior: "",
            codigo_agencia: "",
            agencias: [],
        };
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        await axios.get(`${API}/inmuebles/${id}`).then((res) => {
            // console.log(res);
            // console.log(res.data);
            const inmueble = res.data;
            // this.setState({ inmueble });
            this.setState({
                codigoInmuebles: inmueble[0].codigoInmuebles,
                propietario: inmueble[0].propietario,
                direccion: inmueble[0].direccion,
                superficie_util: inmueble[0].superficie_util,
                nro_habitaciones: inmueble[0].nro_habitaciones,
                nro_cuartos_de_bano: inmueble[0].nro_cuartos_de_bano,
                lavadero: inmueble[0].lavadero,
                exterior_interior: inmueble[0].exterior_interior,
                codigo_agencia: inmueble[0].codigo_agencia,
            });
            // console.log(
            //     this.props.match.params.id,
            //     "Este es el ID de la URL"
            // );
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

    async handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state, " Esto es el estado");
    }

    async handlerSubmit(e) {
        e.preventDefault();
        const id = this.props.match.params.id;
        const inmueble = this.state;
        await axios.put(`${API}/inmuebles/${id}`, { inmueble }).then((res) => {
            console.log(res);
            console.log(res.data);
        });
        // console.log(inmueble, " Enviando...");
    }

    render() {
        return (
            <div>
                <div className={sty.cabecera_tabla}>
                    <Link className={sty.boton} to="/inmobiliarias">
                        Ver Inmobiliarias
                    </Link>
                    <div className={sty.titulo_central}>
                        Editar Inmobiliaria
                    </div>
                    <div className={sty.final}></div>
                </div>
                <form className={sty.formulario} onSubmit={this.handlerSubmit}>
                    <div className={sty.group_form}>
                        <label htmlFor="codigoInmuebles">
                            Cod. Inmobiliaria:
                        </label>
                        <input
                            required
                            className={sty.inputs}
                            type="number"
                            name="codigoInmuebles"
                            onChange={this.handleInputChange}
                            placeholder="Codigo de la inmobiliaria"
                            id="codigoInmuebles"
                            value={this.state.codigoInmuebles}
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
                            onChange={this.handleInputChange}
                            placeholder="Propietario"
                            id="propietario"
                            value={this.state.propietario}
                        />
                    </div>
                    <div className={sty.group_form}>
                        <label htmlFor="direccion">Direccion:</label>
                        <input
                            required
                            className={sty.inputs}
                            type="text"
                            name="direccion"
                            onChange={this.handleInputChange}
                            placeholder="Direccion"
                            id="direccion"
                            value={this.state.direccion}
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
                            onChange={this.handleInputChange}
                            placeholder="Superficie Util"
                            id="superficie_util"
                            value={this.state.superficie_util}
                        />
                    </div>
                    <div className={sty.group_form}>
                        <label htmlFor="nro_cuartos_de_bano">
                            Numero de cuartos de baño:
                        </label>
                        <input
                            required
                            className={sty.inputs}
                            type="number"
                            name="nro_cuartos_de_bano"
                            onChange={this.handleInputChange}
                            placeholder="Cantidad de cuartos de baño"
                            id="nro_cuartos_de_bano"
                            value={this.state.nro_cuartos_de_bano}
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
                            onChange={this.handleInputChange}
                            placeholder="Nro de habitaciones"
                            id="nro_habitaciones"
                            value={this.state.nro_habitaciones}
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
                                    onChange={this.handleInputChange}
                                    id="si"
                                    value="1"
                                    checked={this.state.lavadero == "1"}
                                />
                                Si
                            </label>
                            <label htmlFor="no">
                                <input
                                    className={sty.input_radio}
                                    type="radio"
                                    name="lavadero"
                                    onChange={this.handleInputChange}
                                    id="no"
                                    value="0"
                                    checked={this.state.lavadero == "0"}
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
                                    onChange={this.handleInputChange}
                                    id="exterior"
                                    value="exterior"
                                    checked={
                                        this.state.exterior_interior ===
                                        "exterior"
                                    }
                                />
                                Exterior
                            </label>
                            <label htmlFor="interior">
                                <input
                                    className={sty.input_radio}
                                    type="radio"
                                    name="exterior_interior"
                                    onChange={this.handleInputChange}
                                    id="interior"
                                    value="interior"
                                    checked={
                                        this.state.exterior_interior ===
                                        "interior"
                                    }
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
                            onChange={this.handleInputChange}
                            value={this.state.codigo_agencia}
                        >
                            {this.state.agencias.map((age) => {
                                return (
                                    <option
                                        key={age.codigoA}
                                        value={age.codigoA}
                                        // selected={
                                        //     age.codigoA ===
                                        //     this.state.codigo_agencia
                                        // }
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
