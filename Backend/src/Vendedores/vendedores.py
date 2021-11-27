# from flask_mysqldb import MySQL
from flask import jsonify


class Vendedores:

    def __init__(self, mysql):
        # self.cur = mysql.connection.cursor()
        print("Hola desde constructor de vendendores")
    # =========================================================

    def get_vendedores(self, mysql):
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM vendedores''')
        row_headers = [x[0] for x in cur.description]  # extrae cabeceras
        rv = cur.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        # print(json_data)
        if len(json_data) > 0:
            return jsonify(json_data)
        else:
            return jsonify({"message": "No hay vendedores registrados"})
    # =========================================================

    def get_vendedor(self, mysql, id):
        cur = mysql.connection.cursor()
        cur.execute(f'''SELECT * 
                        FROM vendedores
                        WHERE codigoV = {id}''')
        row_headers = [x[0] for x in cur.description]  # extrae cabeceras
        rv = cur.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        # print(json_data)
        if len(json_data) > 0:
            return jsonify(json_data)
        else:
            return jsonify({"message": "No hay vendedor registrada con ese ID"})
    # =========================================================

    def createVendedor(self, mysql, datos):
        cur = mysql.connection.cursor()
        __dato = cur.execute(
            f'''SELECT * FROM vendedores WHERE ci_v = {datos[0]}''')
        mysql.connection.commit()
        __codigoA = cur.execute(
            f'''SELECT * FROM agencias WHERE codigoA = {datos[len(datos)-1]}''')
        mysql.connection.commit()
        print(__dato)
        if __dato == 0 and __codigoA == 1:
            cur.execute('''INSERT INTO vendedores (ci_v, nombre, apellidos, fecha_de_nacimiento, fecha_de_contratacion, direccion, codigo_postal, ciudad, pais,telefono_del_domicilio,movil_de_contacto,codigo_agencia)
                        VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)''', datos)
            mysql.connection.commit()
            return jsonify({"message": "registrado correctamente"})
        else:
            return jsonify({"message": "El vendedor con el CI ya fue registrado anteriormente o agencia no encontrada"})
    # =========================================================

    def updateVendedor(self, mysql, id, datos):
        cur = mysql.connection.cursor()
        dato = cur.execute(
            f'''SELECT * FROM vendedores WHERE codigoV = {id}''')
        if dato == 1:  # Verifica si existe vendedor con ese ID
            cur = mysql.connection.cursor()
            repetidoCI = cur.execute(
                f'''SELECT * FROM vendedores WHERE ci_v = {datos[0]}''')
            mysql.connection.commit()  # si existe CI ya registrado
            cur = mysql.connection.cursor()
            __dato_agencia = cur.execute(
                f'''SELECT * FROM agencias WHERE codigoA = {len(datos)-1}''')
            mysql.connection.commit()   # Si ya existe la agencia
            if repetidoCI == 1 and __dato_agencia == 1:  # Si ya existe el codigo no actualizamos el codigo
                cur = mysql.connection.cursor()
                cur.execute(f'''UPDATE vendedores SET ci_v = %s,
                                                    nombre = %s, 
                                                    apellidos = %s, 
                                                    fecha_de_nacimiento = %s, 
                                                    fecha_de_contratacion = %s, 
                                                    direccion = %s, 
                                                    codigo_postal = %s, 
                                                    ciudad = %s, 
                                                    pais = %s,
                                                    telefono_del_domicilio = %s,
                                                    movil_de_contacto = %s,
                                                    codigo_agencia = %s
                                                    WHERE codigoV = {id}''', datos)
                mysql.connection.commit()
                return jsonify({"message": "Actualizado correctamente CI existente"})
            else:   # Si no existe el codigo actualizamos con el nuevo codigo la inmobiliaria
                cur = mysql.connection.cursor()
                cur.execute(f'''UPDATE vendedores SET ci_v = %s,
                                                    nombre = %s, 
                                                    apellidos = %s, 
                                                    fecha_de_nacimiento = %s, 
                                                    fecha_de_contratacion = %s, 
                                                    direccion = %s, 
                                                    codigo_postal = %s, 
                                                    ciudad = %s, 
                                                    pais = %s,
                                                    telefono_del_domicilio = %s,
                                                    movil_de_contacto = %s,
                                                    codigo_agencia = %s
                                                    WHERE codigoV = {id}''', datos)
                mysql.connection.commit()
                # return jsonify({"message": "El codigo inmueble ya se encuentra registrado"})
                return jsonify({"message": "Actualizado correctamente con nuevo ID"})
        else:
            return jsonify({"message": "No se pudo actualizar el vendedor especificado"})
    # ==========================================================

    def deleteVendedor(self, mysql, id):    # Nombre tabla, id
        cur = mysql.connection.cursor()
        dato = cur.execute(f'SELECT *  FROM vendedores WHERE codigoV = {id}')
        # print(dato)
        cur = mysql.connection.cursor()
        __dato_reservas = cur.execute(
            f'SELECT * FROM reservas WHERE codigo_vendedor = {id}')
        if dato == 1 and __dato_reservas == 0:
            cur.execute(f'DELETE FROM vendedores WHERE codigoV = {id}')
            mysql.connection.commit()
            return jsonify({"message": "Eliminado correctamente"})
        else:
            return jsonify({"message": "No existe el vendedor o problemas de dependencias para eliminar"})


# { "vendedor" :{
#     "apellidos": "Torrez Vargas",
#     "ci_v": 78945613,
#     "ciudad": "Santa Cruz",
#     "codigoV": 3,
#     "codigo_agencia": 20,
#     "codigo_postal": 2001,
#     "direccion": "Av. San Juanillo #122",
#     "fecha_de_contratacion": "2021-05-13 12:35:06",
#     "fecha_de_nacimiento": "2002-04-28 12:35:06",
#     "movil_de_contacto": 7451256,
#     "nombre": "Marcelo",
#     "pais": "Bolivia",
#     "telefono_del_domicilio": 652314
#   }
# }
