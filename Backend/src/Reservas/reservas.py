# from flask_mysqldb import MySQL
from flask import jsonify
from flask_mysqldb import MySQL


class Reservas:

    def __init__(self, mysql):
        # self.cur = mysql.connection.cursor()
        print("Hola desde constructor de reservas")
    # =========================================================

    def getReservas(self, mysql):
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM reservas''')
        row_headers = [x[0] for x in cur.description]  # extrae cabeceras
        rv = cur.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        # print(json_data)
        if len(json_data) > 0:
            return jsonify(json_data)
        else:
            return jsonify({"message": "No hay reservas realizadas"})
    # =========================================================

    def getReserva(self, mysql, id):
        cur = mysql.connection.cursor()
        print(cur)
        cur.execute('''SELECT * 
                        FROM reservas
                        WHERE codigo_cliente = %s''', [id])
        row_headers = [x[0] for x in cur.description]  # extrae cabeceras
        rv = cur.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        # print(json_data)
        if len(json_data) > 0:
            return jsonify(json_data)
        else:
            return jsonify({"message": "No hay reserva registrada con este ID"})
    # =========================================================

    def createReserva(self, mysql, datos):
        # Verificamos que el cliente existe
        cur = mysql.connection.cursor()
        __cliente = cur.execute(
            f'SELECT * clientes WHERE codigoC = {datos[0]}')
        mysql.connection.commit()
        # Verificamos que el inmueble existe
        cur = mysql.connection.cursor()
        __inmueble = cur.execute(
            f'SELECT * inmuebles WHERE codigoI = {datos[1]}')
        mysql.connection.commit()
        # Verificamos que la agencia existe
        cur = mysql.connection.cursor()
        __agencia = cur.execute(
            f'SELECT * agencias WHERE codigoA = {datos[2]}')
        mysql.connection.commit()
        # Verificamos que el vendedor existe
        cur = mysql.connection.cursor()
        __vendedor = cur.execute(
            f'SELECT * vendedor WHERE codigoV = {datos[3]}')
        mysql.connection.commit()
        # Registramos la reserva
        cur = mysql.connection.cursor()
        __dato = cur.execute('''SELECT * FROM reservas WHERE codigo_cliente = %s AND
                                                    codigo_inmueble = %s AND
                                                    codigo_agencia = %s AND
                                                    codigo_vendedor = %s AND
                                                    gestionar = %s AND
                                                    precio = %s AND
                                                    fecha_inicio = %s AND
                                                    fecha_final = %s''', datos)
        mysql.connection.commit()
        if __dato == 0 and __cliente == 1 and __inmueble == 1 and __agencia == 1 and __vendedor == 1:
            cur = mysql.connection.cursor()
            cur.execute('''INSERT INTO reservas(codigo_cliente,codigo_inmueble,codigo_agencia,	codigo_vendedor,gestionar,precio,fecha_inicio,fecha_final)
                        VALUES(%s,%s,%s,%s,%s,%s,%s,%s)''', datos)
            mysql.connection.commit()
            return jsonify({"message": "registrado correctamente"})
        else:
            return jsonify({"message": "El registro ya fue registrado anteriormente o el inmueble no existe"})
    # =========================================================

    def updateReserva(self, mysql, datos):
        # Verificamos que el cliente existe
        cur = mysql.connection.cursor()
        __cliente = cur.execute(
            f'SELECT * clientes WHERE codigoC = {datos[0]}')
        mysql.connection.commit()
        # Verificamos que el inmueble existe
        cur = mysql.connection.cursor()
        __inmueble = cur.execute(
            f'SELECT * inmuebles WHERE codigoI = {datos[1]}')
        mysql.connection.commit()
        # Verificamos que la agencia existe
        cur = mysql.connection.cursor()
        __agencia = cur.execute(
            f'SELECT * agencias WHERE codigoA = {datos[2]}')
        mysql.connection.commit()
        # Verificamos que el vendedor existe
        cur = mysql.connection.cursor()
        __vendedor = cur.execute(
            f'SELECT * vendedor WHERE codigoV = {datos[3]}')
        mysql.connection.commit()
        # Revisar si la reserva existe para actualizar
        cur = mysql.connection.cursor()
        __dato = cur.execute(f'''SELECT * FROM reservas WHERE WHERE codigo_cliente = {datos[8]} AND
                                                codigo_inmueble = {datos[9]} AND
                                                codigo_agencia = {datos[10]} AND
                                                codigo_vendedor = {datos[11]}''')
        mysql.connection.commit()
        # Actualizamos la reserva
        cur = mysql.connection.cursor()
        if __dato == 0 and __cliente == 1 and __inmueble == 1 and __agencia == 1 and __vendedor == 1:
            cur.execute(f'''UPDATE agencias SET codigo_cliente = %s,
                                            codigo_inmueble = %s,
                                            codigo_agencia = %s,
                                            codigo_vendedor = %s,
                                            gestionar = %s,
                                            precio = %s,
                                            fecha_inicio = %s,
                                            fecha_fina = %s
                                            WHERE codigo_cliente = {datos[8]} AND
                                                codigo_inmueble = {datos[9]} AND
                                                codigo_agencia = {datos[10]} AND
                                                codigo_vendedor = {datos[11]}''', datos)
            mysql.connection.commit()
            return jsonify({"message": "Actualizado correctamente"})
        else:
            return jsonify({"message": "No se pudo actualizar la reserva o codigos inexistentes"})
    # =========================================================

    def deleteReserva(self, mysql, datos):    # Nombre tabla, id
        cur = mysql.connection.cursor()
        __dato = cur.execute(f''' SELECT * FROM reservas WHERE codigo_cliente = {datos[0]} AND
                                                codigo_inmueble = {datos[1]} AND
                                                codigo_agencia = {datos[2]} AND
                                                codigo_vendedor = {datos[3]}''')
        if __dato == 1:
            cur.execute(f'''DELETE FROM agencias WHERE codigo_cliente = {datos[0]} AND
                                                codigo_inmueble = {datos[1]} AND
                                                codigo_agencia = {datos[2]} AND
                                                codigo_vendedor = {datos[3]}''')
            mysql.connection.commit()
            return jsonify({"message": "Eliminado correctamente"})
        else:
            return jsonify({"message": "No existe la reserva a eliminar"})
