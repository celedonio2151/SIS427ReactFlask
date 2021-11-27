import React, { Component } from "react";
import axios from "axios";
const API = "http://localhost:5000";

export default class Images extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
        };
    }

    handlerFile(e) {
        let file = e.target.files[0];
        this.setState({
            file: file,
        });
    }

    handlerUpload(e) {
        console.log(this.state, " This is state");
        let file = this.state;
        let formData = new FormData();
        // For multiple files
        formData.append("image", file);
        formData.append("name", "Aryun Yoan");

        axios({
            url: "http://localhost:5000/gallery",
            method: "POST",
            data: formData,
        }).then(
            (res) => {
                // respuesta
                console.log(res.data);
            },
            (err) => {
                // imporimier error
            }
        );
        // axios.post(`${API}/gallery`, { formData }).then((res) => {
        //     console.log(res);
        //     console.log(res.data, "This is res.dara of Gallery");
        // });
        // console.log(formData);
    }

    render() {
        return (
            <div>
                <form action="">
                    <label htmlFor="image">Selecione las imagenes:</label>
                    <input
                        type="file"
                        name="file"
                        id="image"
                        multiple
                        onChange={(e) => this.handlerFile(e)}
                    />
                    <button
                        type="button"
                        onClick={(e) => this.handlerUpload(e)}
                    >
                        Subir estoy en rama galleria
                    </button>
                </form>
            </div>
        );
    }
}
