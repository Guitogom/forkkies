import express from 'express';
import cors from 'cors';
import { verifyTag, newBusiness, modifyBusiness, verificarToken, getBusiness, logBusiness, getallTemplates, newTemplate, modifyTemplate, getTemplate, newProperty, deleteProperty, getProperties, newCategory, modifyCategory, getCategory, modifyProduct, getProduct, getAllBusiness } from './functions.js';
import swaggerDocs from './swagger.js';

const app = express();

// Middleware para analizar los cuerpos de las solicitudes JSON con límite de tamaño
app.use(express.json({ limit: '200mb' }));

// Middleware para analizar los cuerpos de las solicitudes URL codificadas con límite de tamaño
app.use(express.urlencoded({ extended: true, limit: '200mb' }));
const corsOptions = {
    origin: ['https://forkkies.live', 'https://www.forkkies.live'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors());

// Middleware de prueba para verificar la ruta
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
  });
  
  // Ruta para Swagger UI
  app.use('/api-docs', swaggerDocs);
/**
* @swagger
* /verifytag:
*   get:
*     summary: Verify if a business tag exists
*     parameters:
*       - name: tag
*         in: query
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Tag verification result
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 exists:
*                   type: boolean
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*/

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

/**
 * @swagger
 * /newbusiness:
 * post:
 * description: Crea un nuevo negocio
 * requestBody:
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * tag:
 * type: string
 * name:
 * type: string
 * location:
 * type: string
 * tel:
 * type: string
 * password:
 * type: string
 * required:
 * - tag
 * - name
 * - location
 * - phone
 * - password
 * responses:
 * 200:
 * description: Token generado
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * token:
 * type: string
 * 500:
 * description: Error interno al crear negocio
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 */

app.post('/newbusiness', async (req, res) => {
    try {
        var token = await newBusiness(req.body);
        console.log('Token generado:', token)
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /modifybusiness:
 * post:
 * description: Modifica un negocio
 * requestBody:
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * tel:
 * type: string
 * password:
 * type: string
 * delete:
 * type: boolean
 * color1:
 * type: string
 * color2:
 * type: string
 * color3:
 * type: string
 * iban:
 * type: string
 * landing_img:
 * type: string
 * responses:
 * 200:
 * description: Resultado de la modificación
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * result:
 * type: string
 * 500:
 * description: Error interno al modificar negocio
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 */

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

/**
 * @swagger
 * /logbusiness:
 * get:
 * description: Loguea un negocio
 * parameters:
 * - in: query
 * name: tag
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Token generado
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * token:
 * type: string
 * 500:
 * description: Error interno al loguear negocio
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 */

app.get('/logbusiness', async (req, res) => {
    try {
        var token = await logBusiness(req.query);
        console.log('Token generado:', token)
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /getbusiness:
 * get:
 * description: Obtiene un negocio
 * responses:
 * 200:
 * description: Negocio obtenido
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: string
 * tag:
 * type: string
 * name:
 * type: string
 * location:
 * type: string
 * tel:
 * type: string
 * color1:
 * type: string
 * color2:
 * type: string
 * color3:
 * type: string
 * iban:
 * type: string
 * landing_img:
 * type: string
 * 500:
 * description: Error interno al obtener negocio
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 */

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

/**
 * @swaggerer
 * /getalltemplates:
 *   get:
 *     description: Obtiene todos los templates de un negocio
  *     responses:
 *       200:
 *         description: Templates obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 templates:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       active:
 *                         type: boolean
 *                 active_template:
 *                   type: string
 ay
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       active:
 *                         type: boolean
 *                 active_template:
 *                   type: string
 *       500:
 *         description: Error interno al obtener templates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

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

//Properties
app.post('/newproperty', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await newProperty(tag, req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al añadir propiedad:', error.message);
        res.status(500).json({ error: 'Error al añadir propiedad' });
    }
});

app.post('/deleteproperty', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await deleteProperty(tag, req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al eliminar propiedad:', error.message);
        res.status(500).json({ error: 'Error al eliminar propiedad' });
    }
});

app.get('/getproperties', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await getProperties(tag);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al obtener propiedades:', error.message);
        res.status(500).json({ error: 'Error al obtener propiedades' });
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

app.get('/clientproduct', async (req, res) => {
    try {
        var tag = req.query.tag;
        var result = await getProduct(tag, req.query.id);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al obtener negocio:', error.message);
        res.status(500).json({ error: 'Error al obtener negocio' });
    }
});

app.get('/loadbusiness', async (req, res) => {
    try {
        var result = await getAllBusiness(req.query.tag);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al obtener negocio:', error.message);
        res.status(500).json({ error: 'Error al obtener negocio' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on https://api.forkkies.live');
}
);

export default app;