from flask import Flask, request, jsonify
from app import create_app
from conexionMySQL.conexionMySQL import conexion
from Agencias.agencias import Agencias
from Clientes.clientes import Clientes
from Inmuebles.inmuebles import Inmuebles
from Vendedores.vendedores import Vendedores
from Reservas.reservas import Reservas
from flask_cors import CORS
# ---------------------------------------------------------------
from werkzeug.utils import secure_filename
import os
import urllib.request

app = create_app()
CORS(app)
mysql = conexion(app)
agencias = Agencias(mysql)   # Instancia de la tabla agencias
clientes = Clientes(mysql)   # Instancia de la tabla clientes
inmuebles = Inmuebles(mysql)   # Instancia de la tabla inmuebles
vendedores = Vendedores(mysql)   # Instancia de la tabla vendedores
reservas = Reservas(mysql)  # Instancia de la tabla reservas
# -----------------------------------------------------------------
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


UPLOAD_FOLDER = './uploads'
#app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
# -----------------------------------------------------------------
# =============Rutas de agencias===================================
# =================================================================


@app.route('/agencias', methods=['GET'])
def get_agencias():
    __agencias = agencias.agencias(mysql)
    # print(agencias)
    return __agencias


@app.route('/agencias/<int:id>', methods=['GET'])
def get_agencia(id):
    # print(id)
    __agencia = agencias.get_agencia(mysql, id)
    return __agencia


@app.route('/agencias', methods=['POST'])
def create_agencia():
    __direccion = request.json['agencia']['direccion']
    __codigo = request.json['agencia']['codigo_postal']
    __ciudad = request.json['agencia']['ciudad']
    __fax = request.json['agencia']['fax']
    __telefonos = request.json['agencia']['telefonos']
    __actuacion = request.json['agencia']['zona_de_actuacion']
    __datos = (__direccion, __codigo, __ciudad,
               __fax, __telefonos, __actuacion)
    # print(__codigo, __direccion)
    __agenciaCreada = agencias.createAgencia(mysql, __datos)
    return __agenciaCreada


@app.route('/agencias/<int:id>', methods=['PUT'])
def update_agencia(id):
    __direccion = request.json['agencia']['direccion']
    __codigo = request.json['agencia']['codigo_postal']
    __ciudad = request.json['agencia']['ciudad']
    __fax = request.json['agencia']['fax']
    __telefonos = request.json['agencia']['telefonos']
    __actuacion = request.json['agencia']['zona_de_actuacion']
    __datos = (__direccion, __codigo, __ciudad,
               __fax, __telefonos, __actuacion)
    __actualizar = agencias.updateAgencia(mysql, id, __datos)
    return __actualizar


@app.route('/agencias/<int:id>', methods=['DELETE'])
def delete_agencia(id):
    __message = agencias.deleteAgencia(mysql, id)
    return __message


# ===============Rutas de clientes===============================
# ===============================================================
@app.route('/clientes', methods=['GET'])
def get_clientes():
    __clientes = clientes.get_clientes(mysql)
    return __clientes


@app.route('/clientes/<int:id>')
def get_cliente(id):
    __clientes = clientes.get_cliente(mysql, id)
    # print(__clientes.json)
    return __clientes


@app.route('/clientes', methods=['POST'])
def create_cliente():
    __ci_c = request.json['cliente']['ci_c']
    __nombre = request.json['cliente']['nombre']
    __apellidos = request.json['cliente']['apellidos']
    __direccion = request.json['cliente']['direccion']
    __codigo = request.json['cliente']['codigo_postal']
    __ciudad = request.json['cliente']['ciudad']
    __pais = request.json['cliente']['pais']
    __telefono = request.json['cliente']['telefono_de_contacto']
    datos = (__ci_c, __nombre, __apellidos, __direccion,
             __codigo, __ciudad, __pais, __telefono)
    __cliente = clientes.createCliente(mysql, datos)
    return __cliente


@app.route('/clientes/<int:id>', methods=['PUT'])
def update_cliente(id):
    __ci_c = request.json['cliente']['ci_c']
    __nombre = request.json['cliente']['nombre']
    __apellidos = request.json['cliente']['apellidos']
    __direccion = request.json['cliente']['direccion']
    __codigo = request.json['cliente']['codigo_postal']
    __ciudad = request.json['cliente']['ciudad']
    __pais = request.json['cliente']['pais']
    __telefono = request.json['cliente']['telefono_de_contacto']
    datos = (__ci_c, __nombre, __apellidos, __direccion,
             __codigo, __ciudad, __pais, __telefono)
    __message = clientes.updateCliente(mysql, id, datos)
    return __message


@app.route('/clientes/<int:id>', methods=['DELETE'])
def deleteCliente(id):
    __message = clientes.deleteCliente(mysql, id)
    return __message


# ==============Rutas de inmuebles===============================
# ===============================================================
@app.route("/inmuebles")
def get_inmuebles():
    __inmuebles = inmuebles.get_inmuebles(mysql)
    return __inmuebles


@app.route("/inmuebles/<int:id>")
def get_inmueble(id):
    __inmuebles = inmuebles.get_inmueble(mysql, id)
    return __inmuebles


@app.route("/inmuebles", methods=["POST"])
def create_inmueble():
    __codigoI = request.json['inmueble']['codigoInmuebles']
    __propietario = request.json['inmueble']['propietario']
    __direccion = request.json['inmueble']['direccion']
    __superficie = request.json['inmueble']['superficie_util']
    __habitaciones = request.json['inmueble']['nro_habitaciones']
    __banos = request.json['inmueble']['nro_cuartos_de_bano']
    __lavadero = request.json['inmueble']['lavadero']
    __exin = request.json['inmueble']['exterior_interior']
    __cod_agencia = request.json['inmueble']['codigo_agencia']
    __datos = (__codigoI, __propietario, __direccion, __superficie,
               __habitaciones, __banos, __lavadero, __exin, __cod_agencia)
    __message = inmuebles.createInmueble(mysql, __datos)
    return __message


@app.route('/inmuebles/<int:id>', methods=['PUT'])
def update_inmuebles(id):
    __codigoI = request.json['inmueble']['codigoInmuebles']
    __propietario = request.json['inmueble']['propietario']
    __direccion = request.json['inmueble']['direccion']
    __superficie = request.json['inmueble']['superficie_util']
    __habitaciones = request.json['inmueble']['nro_habitaciones']
    __banos = request.json['inmueble']['nro_cuartos_de_bano']
    __lavadero = request.json['inmueble']['lavadero']
    __exin = request.json['inmueble']['exterior_interior']
    __cod_agencia = request.json['inmueble']['codigo_agencia']
    __datos = (__codigoI, __propietario, __direccion, __superficie,
               __habitaciones, __banos, __lavadero, __exin, __cod_agencia)
    __message = inmuebles.updateInmueble(mysql, id, __datos)
    return __message


@app.route('/inmuebles/<int:id>', methods=['DELETE'])
def delete_inmuebles(id):
    __message = inmuebles.deleteInmueble(mysql, id)
    return __message

# ============Rutas de vendedores================================
# ===============================================================


@app.route('/vendedores')
def get_vendedores():
    __vendedores = vendedores.get_vendedores(mysql)
    return __vendedores


@app.route('/vendedores/<int:id>')
def get_vendedor(id):
    __vendedor = vendedores.get_vendedor(mysql, id)
    return __vendedor


@app.route('/vendedores', methods=['POST'])
def create_vendedor():
    # '2021-10-28 07:39:03'
    __ci_v = request.json['vendedor']['ci_v']
    __nombre = request.json['vendedor']['nombre']
    __apellidos = request.json['vendedor']['apellidos']
    __fechaN = request.json['vendedor']['fecha_de_nacimiento']
    __fechaC = request.json['vendedor']['fecha_de_contratacion']
    __direccion = request.json['vendedor']['direccion']
    __codigo_postal = request.json['vendedor']['codigo_postal']
    __ciudad = request.json['vendedor']['ciudad']
    __pais = request.json['vendedor']['pais']
    __telefono = request.json['vendedor']['telefono_del_domicilio']
    __movil = request.json['vendedor']['movil_de_contacto']
    __codigoA = request.json['vendedor']['codigo_agencia']
    __datos = (__ci_v, __nombre, __apellidos, __fechaN, __fechaC,
               __direccion, __codigo_postal, __ciudad, __pais, __telefono, __movil, __codigoA)
    __message = vendedores.createVendedor(mysql, __datos)
    return __message
    # return "HOLA Lista para entregar"


@app.route('/vendedores/<int:id>', methods=['PUT'])
def update_vendedores(id):
    # '2021-10-28 07:39:03'
    __ci_v = request.json['vendedor']['ci_v']
    __nombre = request.json['vendedor']['nombre']
    __apellidos = request.json['vendedor']['apellidos']
    __fechaN = request.json['vendedor']['fecha_de_nacimiento']
    __fechaC = request.json['vendedor']['fecha_de_contratacion']
    __direccion = request.json['vendedor']['direccion']
    __codigo_postal = request.json['vendedor']['codigo_postal']
    __ciudad = request.json['vendedor']['ciudad']
    __pais = request.json['vendedor']['pais']
    __telefono = request.json['vendedor']['telefono_del_domicilio']
    __movil = request.json['vendedor']['movil_de_contacto']
    __codigoA = request.json['vendedor']['codigo_agencia']
    __datos = (__ci_v, __nombre, __apellidos, __fechaN, __fechaC,
               __direccion, __codigo_postal, __ciudad, __pais, __telefono, __movil, __codigoA)
    print(__fechaN)
    __message = vendedores.updateVendedor(mysql, id, __datos)
    return __message


@app.route('/vendedores/<int:id>', methods=['DELETE'])
def delete_vendedos(id):
    __message = vendedores.deleteVendedor(mysql, id)
    return __message


# ==================Ruta reservas================================
# ===============================================================
@app.route('/reservas')
def get_reservas():
    __reservas = reservas.getReservas(mysql)
    return __reservas
# ===============================================================


@app.route('/reservas/<int:id>')
def get_reserva():
    __reserva = reservas.getReserva(mysql, id)
    return __reserva


@app.route('/reservas', methods=['DELETE'])
def delete_reserva():
    __clienteC = request.json['deleteReservas']['codigoC']
    __inmuebleC = request.json['deleteReservas']['codigoI']
    __agenciaC = request.json['deleteReservas']['codigoA']
    __vendedorC = request.json['deleteReservas']['codigoV']
    __datos = (__clienteC, __inmuebleC, __agenciaC, __vendedorC)
    __message = reservas.deleteReserva(mysql, __datos)
    return __message

# ==================Ruta imagenes================================
# ===============================================================


@app.route('/gallery', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        resp = jsonify({'message': 'No file part in the request'})
        resp.status_code = 400
        print(resp)
        return resp
    file = request.files['file']
    if file.filename == '':
        resp = jsonify({'message': 'No file selected for uploading'})
        resp.status_code = 400
        return resp
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        resp = jsonify({'message': 'File successfully uploaded'})
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(
            {'message': 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'})
        resp.status_code = 400
        return resp


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404

    return resp


if __name__ == '__main__':
    app.run(debug=True)
