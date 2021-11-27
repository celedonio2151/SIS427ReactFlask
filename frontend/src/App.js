// import logo from "./logo.svg";
import sty from "./App.module.css";
import { BrowserRouter as Browser, Route, Switch } from "react-router-dom";
import ListarAgencias from "./components/agencia/ListarAgencias";
import Aleatorio from "./components/Aleatorio/Aleatorio";
import Navegacion from "./components/Navegacion/Nagegacion";
import Footer from "./components/Footer/Footer";
import CrearAgencia from "./components/agencia/CrearAgencia";
import EditarAgencia from "./components/agencia/EditarAgencia";
import ListarClientes from "./components/cliente/ListarClientes";
import CrearCliente from "./components/cliente/CrearCliente";
import EditarCliente from "./components/cliente/EditarCliente";
import ListarInmuebles from "./components/inmobiliaria/ListarInmuebles";
import CrearInmobiliaria from "./components/inmobiliaria/CrearInmobiliaria";
import EditarInmobiliaria from "./components/inmobiliaria/EditarInmobiliaria";
import ListarVendedores from "./components/vendedores/ListarVendedores";
import CreateVendedor from "./components/vendedores/CreateVendedor";
import EditarVendedor from "./components/vendedores/EditarVendedor";
import ListarReservas from "./components/reservas/ListarReservas";
import Gallery from "./components/gallery/Gallery";
import Images from "./components/images/Images";

function App() {
    return (
        <div className={sty.body_general}>
            <Browser>
                <Navegacion />
                <div className={sty.navegacion_app}></div>
                <div className={sty.body_app}>
                    <div className={sty.fotos_app}>
                        <Aleatorio />
                    </div>
                    <div className={sty.switch_app}>
                        <Switch>
                            <Route
                                exact
                                path="/agencias"
                                component={ListarAgencias}
                            />
                            <Route
                                exact
                                path="/create/agencia"
                                component={CrearAgencia}
                            />
                            <Route
                                path="/agencias/:id/edit"
                                component={EditarAgencia}
                            />

                            <Route
                                exact
                                path="/clientes"
                                component={ListarClientes}
                            />
                            <Route
                                exact
                                path="/clientes/create"
                                component={CrearCliente}
                            />
                            <Route
                                exact
                                path="/clientes/:id/edit"
                                component={EditarCliente}
                            />
                            <Route
                                exact
                                path="/inmobiliarias"
                                component={ListarInmuebles}
                            />
                            <Route
                                exact
                                path="/inmobiliarias/create"
                                component={CrearInmobiliaria}
                            />
                            <Route
                                exact
                                path="/inmobiliarias/:id/edit"
                                component={EditarInmobiliaria}
                            />
                            <Route
                                exact
                                path="/vendedores"
                                component={ListarVendedores}
                            />
                            <Route
                                exact
                                path="/create/vendedor"
                                component={CreateVendedor}
                            />
                            <Route
                                path="/vendedores/:id/edit"
                                component={EditarVendedor}
                            />
                            <Route
                                path="/reservas"
                                component={ListarReservas}
                            />
                            <Route exact path="/gallery" component={Gallery} />
                            <Route
                                exact
                                path="/gallery/upload"
                                component={Images}
                            />
                            <Route exact path="/about">
                                about
                            </Route>
                        </Switch>
                    </div>
                </div>
                <Footer />
            </Browser>
        </div>
    );
}

export default App;
