import React, { useState } from "react";
import { Link } from "react-router-dom";
import sty from "./Gallery.module.css";
import img1 from "../../Images/img1.jpg";
import img2 from "../../Images/img2.jpg";
import img3 from "../../Images/img3.jpg";
import img4 from "../../Images/img4.png";

export default function Gallery() {
    let data = [
        {
            id: 1,
            imgSrc: img1,
        },
        {
            id: 2,
            imgSrc: img2,
        },
        {
            id: 3,
            imgSrc: img3,
        },
        {
            id: 4,
            imgSrc: img4,
        },
    ];
    const [model, setModel] = useState(false);
    const [tempimgSrc, setTempImgSrc] = useState("");

    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc);
        setModel(true);
        console.log(imgSrc);
    };

    return (
        <div>
            <div className={sty.cabecera_tabla}>
                <Link className={sty.boton} to="/gallery/upload">
                    Isertar Imagen
                </Link>
                <div className={sty.titulo_central}>Galeria</div>
                <div className={sty.final}></div>
            </div>

            <div className={model ? "model open" : "model"}>
                <img src={tempimgSrc} alt="" />
                <button>Cerrar</button>
            </div>

            <div className={sty.gallery}>
                {data.map((item, index) => {
                    return (
                        <div
                            className={sty.pics}
                            key={item.id}
                            onClick={() => getImg(item.imgSrc)}
                        >
                            <img
                                src={item.imgSrc}
                                style={{ width: "100%" }}
                                alt=""
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
