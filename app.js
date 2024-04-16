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

//await db.execute('DROP TABLE users');

app.get('/', (req, res) => {
    //String
    //res.send(`Hello ${uwu}`);
    //JSON
    res.json({ message: `Hey, this is the backend!` });
    res.sendStatus(200);
}
);

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

// Uso de la función
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


app.post('/newbusiness', async (req, res) => {
    try {
        var token = await newbusiness(req.body);
        console.log('Token generado:', token)
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}
);