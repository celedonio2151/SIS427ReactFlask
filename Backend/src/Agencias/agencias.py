# from flask_mysqldb import MySQL
from flask import jsonify


class Agencias:

    def __init__(self, mysql):
        # self.cur = mysql.connection.cursor()
        print("Hola desde constructor de agencias")
    # =========================================================

    def agencias(self, mysql):
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM agencias''')
        row_headers = [x[0] for x in cur.description]  # extrae cabeceras
        rv = cur.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        # print(json_data)
        if len(json_data) > 0:
            return jsonify(json_data)
        else:
            return jsonify({"message": "No hay agencias registradas"})
    # =========================================================

    def get_agencia(self, mysql, id):
        cur = mysql.connection.cursor()
        print(cur)
        cur.execute('''SELECT * 
                        FROM agencias
                        WHERE codigoA = %s''', [id])
        row_headers = [x[0] for x in cur.description]  # extrae cabeceras
        rv = cur.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        # print(json_data)
        if len(json_data) > 0:
            return jsonify(json_data)
        else:
            return jsonify({"message": "No hay agencia registrada con ese ID"})
    # =========================================================

    def createAgencia(self, mysql, datos):
        cur = mysql.connection.cursor()
        __dato = cur.execute('''SELECT * FROM agencias WHERE direccion = %s AND
                                                    codigo_postal = %s AND
                                                    ciudad = %s AND
                                                    fax = %s AND
                                                    telefonos = %s AND
                                                    zona_de_actuacion = %s''', datos)
        mysql.connection.commit()
        print(__dato)
        if __dato == 0:
            cur.execute('''INSERT INTO agencias(direccion,codigo_postal,ciudad,fax,telefonos,zona_de_actuacion)
                        VALUES(%s,%s,%s,%s,%s,%s)''', datos)
            mysql.connection.commit()
            return jsonify({"message": "registrado correctamente"})
        else:
            return jsonify({"message": "El registro ya fue registrado anteriormente"})
    # =========================================================

    def updateAgencia(self, mysql, id, datos):
        cur = mysql.connection.cursor()
        dato = cur.execute(
            '''SELECT * FROM agencias WHERE codigoA = %s''', [id])
        if dato == 1:
            cur.execute(f'''UPDATE agencias SET direccion = %s,
                                            codigo_postal = %s,
                                            ciudad = %s,
                                            fax = %s,
                                            telefonos = %s,
                                            zona_de_actuacion = %s
                                            WHERE codigoA = {id}''', datos)
            mysql.connection.commit()
            return jsonify({"message": "Actualizado correctamente"})
        else:
            return jsonify({"message": "No se pudo actualizar la agencia especificada"})
    # =========================================================

    def deleteAgencia(self, mysql, id):    # Nombre tabla, id
        cur = mysql.connection.cursor()
        __dato = cur.execute(f'SELECT *  FROM agencias WHERE codigoA = {id}')
        cur = mysql.connection.cursor()
        __dato_inmuebles = cur.execute(
            f'SELECT * FROM inmuebles WHERE codigo_agencia = {id}')
        cur = mysql.connection.cursor()
        __dato_vendedores = cur.execute(
            f'SELECT * FROM vendedores WHERE codigo_agencia = {id}')
        cur = mysql.connection.cursor()
        # __dato_reservas = cur.execute(
        #     f'SELECT * FROM reservas WHERE codigo_agencia = {id}')
        if __dato == 1 and __dato_inmuebles == 0 and __dato_vendedores == 0:
            cur.execute(f'DELETE FROM agencias WHERE codigoA = {id}')
            mysql.connection.commit()
            return jsonify({"message": "Eliminado correctamente"})
        else:
            return jsonify({"message": "No existe la agencia o no es posible eliminar debido a dependencias"})
