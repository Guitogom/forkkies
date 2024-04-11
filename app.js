import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';

dotenv.config();

const app = express();
app.use(express.json());

const db = createClient({
    url: "libsql://forkkies-tumse.turso.io",
    authToken: process.env.DB_TOKEN
});

//await db.execute('DROP TABLE users');

app.get('/', (req, res) => {
    //GET
    uwu = req.query.uwu;
    //Status
    res.sendStatus(200);
    //String
    res.send(`Hello ${uwu}`);
    //JSON
    res.json({ message: `Hello ${uwu}` });
}
);

app.get('/verifytag', async (req, res) => {
    var tag = req.query.tag;

    // Verifica que tag sea una cadena
    if (typeof tag !== 'string') {
        return res.status(400).json({ error: 'El parámetro tag debe ser una cadena' });
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

        if (result.length > 0) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en la base de datos', message: error.message });
    }
});



app.post('/newbusiness', (req, res) => {
    business = req.body.business;
    tag = req.body.tag;
    password = req.body.password;
    email = req.body.email;
    phone = req.body.phone;

});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}
);