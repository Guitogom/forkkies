import express from 'express';
import cors from 'cors';
import { verifyTag, newBusiness, getBusiness, verificarToken } from './functions.js';

const app = express();
app.use(express.json());
app.use(cors());

//Rutas
app.get('/', (req, res) => {
    res.sendStatus(200).json({ message: `Hey, this is the backend!` });
}
);


//Business
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
        var token = await newBusiness(req.body);
        console.log('Token generado:', token)
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/logbusiness', async (req, res) => {
    try {
        var token = await logIn(req);
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/getbusiness', verificarToken, (req, res) => {
    const tag = req.tag;
    getBusiness(tag)
        .then((business) => {
            console.log('Business:', business);
            res.json(business);
        })
        .catch((error) => {
            console.error('Error:', error.message);
            res.status(500).json({ error: error.message });
        });
});

//Templates

app.get('/gettemplates', verificarToken, (req, res) => {
    const tag = req.tag;
    getTemplates(tag);
});

app.listen(3000, () => {
    console.log('Server is running on http://147.182.207.78:3000');
}
);