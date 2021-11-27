# from flask_mysqldb import MySQL
from flask import jsonify


class Inmuebles:

    def __init__(self, mysql):
        # self.cur = mysql.connection.cursor()
        print("Hola desde constructor de inmuebles")
    # =========================================================

    def get_inmuebles(self, mysql):
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM inmuebles''')
        row_headers = [x[0] for x in cur.description]  # extrae cabeceras
        rv = cur.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        # print(json_data)
        if len(json_data) > 0:
            return jsonify(json_data)
        else:
            return jsonify({"message": "No hay inmuebles registrados"})
    # =========================================================

    def get_inmueble(self, mysql, id):
        cur = mysql.connection.cursor()
        cur.execute(f'''SELECT * 
                        FROM inmuebles
                        WHERE codigoI = {id}''')
        row_headers = [x[0] for x in cur.description]  # extrae cabeceras
        rv = cur.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        # print(json_data)
        if len(json_data) > 0:
            return jsonify(json_data)
        else:
            return jsonify({"message": "No hay inmueble registrada con ese ID"})
    # =========================================================

    def createInmueble(self, mysql, datos):
        cur = mysql.connection.cursor()
        __dato = cur.execute(
            f'''SELECT * FROM inmuebles WHERE codigoInmuebles = {datos[0]}''')
        mysql.connection.commit()
        __codigoA = cur.execute(
            f'''SELECT * FROM agencias WHERE codigoA = {datos[len(datos)-1]}''')
        mysql.connection.commit()
        # print(__dato)
        if __dato == 0 and __codigoA == 1:
            cur.execute('''INSERT INTO inmuebles (codigoInmuebles, propietario, direccion, superficie_util, nro_habitaciones, nro_cuartos_de_bano, lavadero, exterior_interior, codigo_agencia)
                        VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)''', datos)
            mysql.connection.commit()
            return jsonify({"message": "registrado correctamente"})
        else:
            return jsonify({"message": "El codigo de inmuebles ya fue registrado anteriormente o agencia no encontrada"})
    # =========================================================

    def updateInmueble(self, mysql, id, datos):
        cur = mysql.connection.cursor()
        dato = cur.execute(f'''SELECT * FROM inmuebles WHERE codigoI = {id}''')
        if dato == 1:  # Verifica si existe con ese ID
            cur = mysql.connection.cursor()
            repetido = cur.execute(
                f'''SELECT * FROM inmuebles WHERE codigoInmuebles = {datos[0]}''')
            mysql.connection.commit()
            if repetido == 1:  # Si ya existe el codigo no actualizamos en codigo
                cur = mysql.connection.cursor()
                cur.execute(f'''UPDATE inmuebles SET codigoInmuebles = %s,
                                                            propietario = %s,
                                                            direccion = %s,
                                                            superficie_util = %s,
                                                            nro_habitaciones = %s,
                                                            nro_cuartos_de_bano = %s,
                                                            lavadero = %s,
                                                            exterior_interior = %s,
                                                            codigo_agencia = %s
                                                    WHERE codigoI = {id} AND
                                                    codigoInmuebles = {datos[0]}''', datos)
                mysql.connection.commit()
                return jsonify({"message": "Actualizado correctamente ID existente"})
            else:   # Si no existe el codigo actualizamos con el nuevo codigo la inmobiliaria
                cur = mysql.connection.cursor()
                cur.execute(f'''UPDATE inmuebles SET codigoInmuebles = %s,
                                                            propietario = %s,
                                                            direccion = %s,
                                                            superficie_util = %s,
                                                            nro_habitaciones = %s,
                                                            nro_cuartos_de_bano = %s,
                                                            lavadero = %s,
                                                            exterior_interior = %s,
                                                            codigo_agencia = %s
                                                    WHERE codigoI = {id}''', datos)
                mysql.connection.commit()
                # return jsonify({"message": "El codigo inmueble ya se encuentra registrado"})
                return jsonify({"message": "Actualizado correctamente nuevo ID"})
        else:
            return jsonify({"message": "No se pudo actualizar el inmueble especificado"})
    # ==========================================================

    def deleteInmueble(self, mysql, id):    # Nombre tabla, id
        cur = mysql.connection.cursor()
        dato = cur.execute(f'SELECT *  FROM inmuebles WHERE codigoI = {id}')
        # print(dato)
        if dato == 1:
            cur.execute(f'DELETE FROM inmuebles WHERE codigoI = {id}')
            mysql.connection.commit()
            return jsonify({"message": "Eliminado correctamente"})
        else:
            return jsonify({"message": "No existe la agencia a eliminar"})
