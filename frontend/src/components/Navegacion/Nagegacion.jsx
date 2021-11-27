import React from "react";
import { Link } from "react-router-dom";
import sty from "./sty.module.css";

export default function Nagegacion() {
    return (
        <div className={sty.navegacion}>
            <div className={sty.max_width}>
                <figure className={sty.logo}>Logo</figure>
                <ul className={sty.lista_menu}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/agencias">Agencias</Link>
                    </li>
                    <li>
                        <Link to="/inmobiliarias">Inmobiliarias</Link>
                    </li>
                    <li>
                        <Link to="/vendedores">Vendedores</Link>
                    </li>
                    <li>
                        <Link to="/clientes">Clientes</Link>
                    </li>
                    <li>
                        <Link to="/reservas">Reservas</Link>
                    </li>
                    <li>
                        <Link to="/gallery">Galeria</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
