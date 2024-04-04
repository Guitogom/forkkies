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

await db.execute('DROP TABLE users');



app.get('/', (req, res) => {
    //GET
    uwu = req.query.uwu;

    //POST
    uwu = req.body.uwu;
    //String
    res.send(`Hello ${uwu}`);

    //JSON
    res.json({ message: `Hello ${uwu}` });
}
);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}
);