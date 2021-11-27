import React, { Component } from "react";
import sty from "./EditarCliente.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
const API = "http://localhost:5000";

export default class EditarCliente extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ci_c: "",
            nombre: "",
            apellidos: "",
            codigo_postal: "",
            ciudad: "",
            direccion: "",
            pais: "",
            telefono_de_contacto: "",
        };
        this.handlerSubmit = this.handleSubmit.bind(this);
        this.handlerInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        await axios.get(`${API}/clientes/${id}`).then((res) => {
            // console.log(res);
            console.log(res.data);
            const cliente = res.data;
            // this.setState({ cliente });
            this.setState({
                ci_c: cliente[0].ci_c,
                nombre: cliente[0].nombre,
                apellidos: cliente[0].apellidos,
                direccion: cliente[0].direccion,
                codigo_postal: cliente[0].codigo_postal,
                ciudad: cliente[0].ciudad,
                pais: cliente[0].pais,
                telefono_de_contacto: cliente[0].telefono_de_contacto,
            });
            console.log(this.props.match.params.id, "Este es el ID de la URL");
        });
    }

    async handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state, " Esto es el estado");
    }

    async handleSubmit(e) {
        e.preventDefault();
        const id = this.props.match.params.id;
        const cliente = this.state;
        await axios.put(`${API}/clientes/${id}`, { cliente }).then((res) => {
            console.log(res);
            console.log(res.data);
        });
        // console.log(cliente, " Enviando...");
    }

    render() {
        return (
            <div>
                <div className={sty.cabecera_tabla}>
                    <Link className={sty.boton} to="/clientes">
                        Ver Clientes
                    </Link>
                    <div className={sty.titulo_central}>Editar Cliente</div>
                    <div className={sty.final}></div>
                </div>
                <form className={sty.formulario} onSubmit={this.handlerSubmit}>
                    <div className={sty.group_form}>
                        <label htmlFor="ci_c">Carnet Identidad:</label>
                        <input
                            required
                            className={sty.inputs}
                            type="number"
                            name="ci_c"
                            onChange={this.handlerInputChange}
                            placeholder="Carnet de identidad"
                            id="ci_c"
                            value={this.state.ci_c}
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
                        <label htmlFor="telefono">Telefono:</label>
                        <input
                            required
                            className={sty.inputs}
                            type="number"
                            name="telefono_de_contacto"
                            onChange={this.handlerInputChange}
                            placeholder="Telefono de contacto"
                            id="telefono"
                            value={this.state.telefono_de_contacto}
                        />
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
