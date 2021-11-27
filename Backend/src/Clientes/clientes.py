# from flask_mysqldb import MySQL
from flask import jsonify


class Clientes:

    def __init__(self, mysql):
        # self.cur = mysql.connection.cursor()
        print("Hola desde constructor de clientes")
    # =========================================================

    def get_clientes(self, mysql):
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM clientes''')
        row_headers = [x[0] for x in cur.description]  # extrae cabeceras
        rv = cur.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        # print(json_data)
        if len(json_data) > 0:
            return jsonify(json_data)
        else:
            return jsonify({"message": "No hay clientes registrados"})
    # =========================================================

    def get_cliente(self, mysql, id):
        cur = mysql.connection.cursor()
        cur.execute(f'''SELECT * 
                        FROM clientes
                        WHERE codigoC = {id}''')
        row_headers = [x[0] for x in cur.description]  # extrae cabeceras
        rv = cur.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        # print(json_data)
        if len(json_data) > 0:
            return jsonify(json_data)
        else:
            return jsonify({"message": "No hay cliente registrada con ese ID"})
    # =========================================================

    def createCliente(self, mysql, datos):
        cur = mysql.connection.cursor()
        __dato = cur.execute('''SELECT * FROM clientes WHERE ci_c = %s AND
                                                    nombre = %s AND
                                                    apellidos = %s AND
                                                    direccion = %s AND
                                                    codigo_postal = %s AND
                                                    ciudad = %s AND
                                                    pais = %s AND
                                                    telefono_de_contacto = %s''', datos)
        mysql.connection.commit()
        print(__dato)
        if __dato == 0:
            cur.execute('''INSERT INTO clientes(ci_c,nombre,apellidos,direccion,codigo_postal,ciudad,pais,telefono_de_contacto)
                        VALUES(%s,%s,%s,%s,%s,%s,%s,%s)''', datos)
            mysql.connection.commit()
            return jsonify({"message": "registrado correctamente"})
        else:
            return jsonify({"message": "El cliente ya fue registrado anteriormente"})
    # =========================================================

    def updateCliente(self, mysql, id, datos):
        cur = mysql.connection.cursor()
        dato = cur.execute(f'''SELECT * FROM clientes WHERE codigoC = {id}''')
        if dato == 1:
            cur.execute(f'''UPDATE clientes SET  ci_c = %s ,
                                                    nombre = %s ,
                                                    apellidos = %s ,
                                                    direccion = %s ,
                                                    codigo_postal = %s ,
                                                    ciudad = %s ,
                                                    pais = %s ,
                                                    telefono_de_contacto = %s
                                                    WHERE codigoC = {id}''', datos)
            mysql.connection.commit()
            return jsonify({"message": "Actualizado correctamente"})
        else:
            return jsonify({"message": "No se pudo actualizar la agencia especificada"})
    # ==========================================================

    def deleteCliente(self, mysql, id):    # Nombre tabla, id
        cur = mysql.connection.cursor()
        __dato = cur.execute(f'SELECT *  FROM clientes WHERE codigoC = {id}')
        cur = mysql.connection.cursor()
        __dato_reservas = cur.execute(
            f'SELECT * FROM reservas WHERE codigo_agencia = {id}')
        cur = mysql.connection.cursor()
        __dato_vendedores = cur.execute(
            f'SELECT * FROM vendedores WHERE codigo_agencia = {id}')
        # print(dato)
        if __dato == 1 and __dato_vendedores == 0 and __dato_reservas == 0:
            cur.execute(f'DELETE FROM clientes WHERE codigoC = {id}')
            mysql.connection.commit()
            return jsonify({"message": "Eliminado correctamente"})
        else:
            return jsonify({"message": "No existe el cliente o no esta disponible para eliminar por dependencias"})
