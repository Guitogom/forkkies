import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';
import cors from 'cors';
import jwt from 'jsonwebtoken';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const db = createClient({
    url: "libsql://forkkies-tumse.turso.io",
    authToken: process.env.DB_TOKEN
});

async function verifyTag(tag) {
    // Verifica que tag sea una cadena
    if (typeof tag !== 'string') {
        throw new Error('El parámetro tag debe ser una cadena');
    }

    // Elimina espacios en blanco adicionales al principio y al final de la cadena
    tag = tag.trim();

    try {
        // Check if tag exists in the database
        const result = await db.execute(
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


async function newbusiness(business) {
    var incorrect_field = [];
    //Verificamos que el tag no exista, si existe lo añadimos en incorrect_field
    if (await verifyTag(business.tag)) {
        incorrect_field.push("tag");
    }
    //Verificamos que el nombre no sea nulo
    if (business.name === null) {
        incorrect_field.push("name");
    }
    //Verificamos que el tupo de business no sea nulo
    if (business.type === null) {
        incorrect_field.push("type");
    }
    //Verificamos que el telefono sea correcto
    if (business.tel === null) {
        incorrect_field.push("phone");
    }

    //Si no hay campos incorrectos, añadimos el negocio a la base de datos
    if (incorrect_field.length === 0) {
        try {
            await db.execute(
                {
                    sql: 'INSERT INTO business (tag, name, type, tel) VALUES (:tag, :name, :type, :tel)',
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
    const token = jwt.sign({ tag: business.tag }, process.env.JWT_SECRET);
    console.log('Token generado funcion:', token)
    return token;
};

async function getBusiness(tag) {
    try {
        const result = await db.execute(
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

function verificarToken(req, res, next) {
    // Extraer el token del encabezado de la solicitud
    const token = req.headers.authorization;
    console.log('Token middleware:', token);

    // Verificar si el token está presente
    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }
    console.log('llega');
    console.log(jwt.verify(token, secretKey));

    try {
        // Verificar el token y decodificar su contenido
        const decoded = jwt.verify(token, secretKey);
        console.log('llega al try')
        req.tag = decoded.tag;
        console.log('ReqTag:', req.tag);

        // Si el token es válido, puedes acceder a la información contenida en él
        console.log('Información del token:', decoded);

        // Continuar con la ejecución del siguiente middleware o controlador
        next();
    } catch (error) {
        // Si ocurre un error al verificar el token, devolver un error de autenticación
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
}


//Rutas
app.get('/', (req, res) => {
    res.sendStatus(200).json({ message: `Hey, this is the backend!` });
}
);

app.get('/verifytag', async (req, res) => {
    try {
        const tag = req.query.tag;
        const exists = await verifyTag(tag);
        res.json({ exists });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/newbusiness', async (req, res) => {
    try {
        var token = await newbusiness(req.body);
        console.log('Token generado:', token)
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/business', verificarToken, (req, res) => {
    // Obtener el tag del token decodificado
    const tag = req.tag;
    console.log('Tag:', tag);

    // Obtener la información del negocio
    getBusiness(tag)
        .then((business) => {
            res.json(business);
        })
        .catch((error) => {
            console.error('Error:', error.message);
            res.status(500).json({ error: error.message });
        });
});

app.listen(3000, () => {
    console.log('Server is running on http://147.182.207.78:3000');
}
);