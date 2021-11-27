import sty from "./sty.module.css";
import React from "react";

export default function Aleatorio() {
    return (
        <div className={sty.aleatorio}>
            <div className={sty.cabecera_aleatorio}>mama</div>
            <div className={sty.fotos_aleatorios}>fotos</div>
        </div>
    );
}
