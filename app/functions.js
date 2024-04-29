import { createClient } from '@libsql/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Crear el cliente de la base de datos
const db = createClient({
    url: "libsql://forkkies-tumse.turso.io",
    authToken: process.env.DB_TOKEN
});

//Business
export async function verifyTag(tag) {
    // Verifica que tag sea una cadena
    if (typeof tag !== 'string') {
        throw new Error('El parámetro tag debe ser una cadena');
    }

    tag = tag.trim();

    try {
        // Check if tag exists in the database
        var result = await db.execute(
            {
                sql: 'SELECT * FROM business WHERE tag = :tag',
                args: { tag }
            }
        );

        return result.rows.length > 0;
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
}


export async function newBusiness(business) {
    var incorrect_field = [];
    if (await verifyTag(business.tag)) {
        incorrect_field.push("tag");
    }
    if (!business.name) {
        incorrect_field.push("name");
    }
    if (!business.type) {
        incorrect_field.push("type");
    }
    if (!business.tel) {
        incorrect_field.push("phone");
    }
    if (!business.password) {
        incorrect_field.push("password");
    }

    //Si no hay campos incorrectos, añadimos el negocio a la base de datos
    if (incorrect_field.length === 0) {
        try {
            await db.execute(
                {
                    sql: 'INSERT INTO business (tag, name, type, tel, password) VALUES (:tag, :name, :type, :tel, :password)',
                    args: business
                }
            );
        } catch (error) {
            throw new Error('Error en la base de datos: ' + error.message);
        }
    } else {
        //Le devolvemos la array de campos incorrectos
        throw new Error('Campos incorrectos: ' + incorrect_field);
    }
    //Se genera un jwt con el tag del negocio
    var token = jwt.sign({ tag: business.tag }, process.env.JWT_SECRET);
    console.log('Token generado funcion:', token)
    return token;
};

export function verificarToken(req, res, next) {
    // Extraer el token del encabezado de la solicitud
    var token = req.headers.authorization;

    // Verificar si el token está presente
    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    try {
        // Verificar el token y decodificar su contenido
        var decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.tag = decoded.tag;
        // Continuar con la ejecución del siguiente middleware o controlador
        next();
    } catch (error) {
        // Si ocurre un error al verificar el token, devolver un error de autenticación
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
}

export async function logBusiness(business) {
    console.log('LogBusiness:', business);
    try {
        var result = await db.execute(
            {
                sql: 'SELECT * FROM business WHERE tag = :tag AND password = :password',
                args: business
            }
        );

        if (result.rows.length === 0) {
            throw new Error('Usuario o contraseña incorrectos');
        }

        let token = jwt.sign({ tag: business.tag }, process.env.JWT_SECRET);
        return token;
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
}

export async function getBusiness(tag) {
    try {
        var result = await db.execute(
            {
                sql: 'SELECT * FROM business WHERE tag = :tag',
                args: { tag }
            }
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }

}

//Templates