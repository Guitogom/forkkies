import express from 'express';
import cors from 'cors';
import { verifyTag, newBusiness, modifyBusiness, verificarToken, getBusiness, logBusiness, getallTemplates, newTemplate, modifyTemplate, getTemplate, newCategory, modifyCategory, getCategory, modifyProduct, getProduct } from './functions.js';

const app = express();

// Middleware para analizar los cuerpos de las solicitudes JSON con límite de tamaño
app.use(express.json({ limit: '50mb' }));

// Middleware para analizar los cuerpos de las solicitudes URL codificadas con límite de tamaño
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

//Rutas
app.get('/', (res) => {
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

app.post('/modifybusiness', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await modifyBusiness(tag, req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al modificar negocio:', error.message);
        res.status(500).json({ error: 'Error al modificar negocio' });
    }
});

app.get('/logbusiness', async (req, res) => {
    try {
        var token = await logBusiness(req.query);
        console.log('Token generado:', token)
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

app.get('/getalltemplates', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var { templates, active_template } = await getallTemplates(tag);
        res.status(200).json({ templates, active_template });
    } catch (error) {
        console.error('Error al obtener templates:', error.message);
        res.status(500).json({ error: 'Error al obtener templates' });
    }
});

app.get('/newtemplate', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await newTemplate(tag);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al añadir template:', error.message);
        res.status(500).json({ error: 'Error al añadir template' });
    }
});

app.post('/modifytemplate', verificarToken, async (req, res) => {
    console.log('req.body:', req.body)
    try {
        var tag = req.tag;
        var result = await modifyTemplate(tag, req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al modificar template:', error.message);
        res.status(500).json({ error: 'Error al modificar template' });
    }
});

app.get('/gettemplate', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await getTemplate(tag, req.query.id);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al obtener template:', error.message);
        res.status(500).json({ error: 'Error al obtener template' });
    }
});

//Categories

app.post('/newcategory', verificarToken, async (req, res) => {
    console.log('req.body:', req.body)
    try {
        var tag = req.tag;
        var result = await newCategory(tag, req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al añadir categoría:', error.message);
        res.status(500).json({ error: 'Error al añadir categoría' });
    }
});

app.post('/modifycategory', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await modifyCategory(tag, req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al modificar categoría:', error.message);
        res.status(500).json({ error: 'Error al modificar categoría' });
    }
});

app.get('/getcategory', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await getCategory(tag, req.query.id);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al obtener categoría:', error.message);
        res.status(500).json({ error: 'Error al obtener categoría' });
    }
});

//Products
app.post('/modifyproduct', verificarToken, async (req, res) => {
    console.log('req.body:', req.body)
    try {
        var tag = req.tag;
        var result = await modifyProduct(tag, req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al modificar producto:', error.message);
        res.status(500).json({ error: 'Error al modificar producto' });
    }
});

app.get('/getproduct', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await getProduct(tag, req.query.id);
        console.log('result:', result);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al obtener producto:', error.message);
        res.status(500).json({ error: 'Error al obtener producto' });
    }
});

/*Client*/
app.get('/clienttemplate', async (req, res) => {
    try {
        var tag = req.query.tag;
        var result = await getTemplate(tag, "active");
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al obtener negocio:', error.message);
        res.status(500).json({ error: 'Error al obtener negocio' });
    }
});

app.get('/clientcategory', async (req, res) => {
    try {
        var tag = req.query.tag;
        var result = await getCategory(tag, req.query.id);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al obtener negocio:', error.message);
        res.status(500).json({ error: 'Error al obtener negocio' });
    }
});

app.get ('/clientproduct', async (req, res) => {
    try {
        var tag = req.query.tag;
        var result = await getProduct(tag, req.query.id);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al obtener negocio:', error.message);
        res.status(500).json({ error: 'Error al obtener negocio' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://147.182.207.78:3000');
}
);