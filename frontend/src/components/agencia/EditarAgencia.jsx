import React, { Component } from "react";
import sty from "./EditarAgencia.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
const API = "http://localhost:5000";

export default class EditarAgencia extends Component {
    constructor(props) {
        super(props);

        this.state = {
            codigoA: "",
            direccion: "",
            codigo_postal: 0,
            ciudad: "",
            fax: 0,
            telefonos: 0,
            zona_de_actuacion: "",
            editMessage: "",
        };
        this.handlerSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        await axios.get(`${API}/agencias/${id}`).then((res) => {
            // console.log(res);
            // console.log(res.data);
            const agencia = res.data;
            // this.setState({ agencia });
            this.setState({
                id: agencia[0].codigoA,
                direccion: agencia[0].direccion,
                codigo_postal: agencia[0].codigo_postal,
                ciudad: agencia[0].ciudad,
                fax: agencia[0].fax,
                telefonos: agencia[0].telefonos,
                zona_de_actuacion: agencia[0].zona_de_actuacion,
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

    async handleSubmit(e) {
        e.preventDefault();
        const id = this.props.match.params.id;
        const agencia = this.state;
        await axios.put(`${API}/agencias/${id}`, { agencia }).then((res) => {
            console.log(res);
            console.log(res.data);
            this.setState({
                editMessage: res.data,
            });
        });
        console.log(agencia, " Enviando...");
    }

    formularioEditar(e) {
        return (
            <div>
                <div className={sty.cabecera_tabla}>
                    <Link className={sty.boton} to="/agencias">
                        Ver Agencias
                    </Link>
                    <div className={sty.titulo_central}>Crear Agencia</div>
                    <div className={sty.final}></div>
                </div>
                <div>{this.state.editMessage}</div>
                <form className={sty.formulario} onSubmit={this.handlerSubmit}>
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
                            onChange={this.handleInputChange}
                            placeholder="Codigo Postal"
                            id="codigoPostal"
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
                            onChange={this.handleInputChange}
                            placeholder="Ciudad"
                            id="ciudad"
                            value={this.state.ciudad}
                        />
                    </div>
                    <div className={sty.group_form}>
                        <label htmlFor="fax">Fax:</label>
                        <input
                            required
                            className={sty.inputs}
                            type="number"
                            name="fax"
                            onChange={this.handleInputChange}
                            placeholder="Fax"
                            id="fax"
                            value={this.state.fax}
                        />
                    </div>

                    <div className={sty.group_form}>
                        <label htmlFor="telefonos">Telefonos:</label>
                        <input
                            required
                            className={sty.inputs}
                            type="text"
                            name="telefonos"
                            onChange={this.handleInputChange}
                            placeholder="Telefonos"
                            id="telefonos"
                            value={this.state.telefonos}
                        />
                    </div>
                    <div className={sty.group_form}>
                        <label htmlFor="zonaActuacion">
                            Zona de actuacion:
                        </label>
                        <input
                            required
                            className={sty.inputs}
                            type="text"
                            name="zona_de_actuacion"
                            onChange={this.handleInputChange}
                            placeholder="Zona de actuacion"
                            id="zonaActuacion"
                            value={this.state.zona_de_actuacion}
                        />
                    </div>
                    <div className={sty.group_form_send}>
                        <input
                            type="submit"
                            className={sty.boton_send}
                            value="Actualizar"
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

    render() {
        return this.formularioEditar();
    }
}
