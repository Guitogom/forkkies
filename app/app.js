import express from 'express';
import cors from 'cors';
import { verifyTag, newBusiness, modifyBusiness, verificarToken, getBusiness, logBusiness, getallTemplates, newTemplate, modifyTemplate, getTemplate, newProperty, deleteProperty, getProperties, newCategory, modifyCategory, getCategory, modifyProduct, getProduct, getAllBusiness, newOrder } from './functions.js';
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

swaggerDocs(app);

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: Business related endpoints
 */

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
 *   post:
 *     summary: Crea un nuevo negocio y genera un token.
 *     tags: [Business]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tag:
 *                 type: string
 *                 description: Tag del negocio.
 *               name:
 *                 type: string
 *                 description: Nombre del negocio.
 *               location:
 *                 type: string
 *                 description: Ubicación del negocio.
 *               tel:
 *                 type: string
 *                 description: Teléfono del negocio.
 *               password:
 *                 type: string
 *                 description: Contraseña encriptada del negocio.
 *     responses:
 *       200:
 *         description: Token generado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT generado para el negocio.
 *       400:
 *         description: Campos incorrectos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Lista de campos incorrectos.
 *       500:
 *         description: Error en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
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
 * /logbusiness:
 *   get:
 *     summary: Autentica un negocio y genera un token.
 *     tags: [Business]
 *     parameters:
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         required: true
 *         description: El tag del negocio.
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: La contraseña del negocio.
 *     responses:
 *       200:
 *         description: Token generado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT generado para el negocio.
 *       400:
 *         description: Usuario o contraseña incorrectos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Token no proporcionado o inválido
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mensaje:
 *                 type: string
 *                 example: 'Token no proporcionado' | 'Token inválido'
 */

/**
 * @swagger
 * /modifybusiness:
 *   post:
 *     summary: Modifica los detalles de un negocio existente.
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del negocio.
 *               tel:
 *                 type: string
 *                 description: Nuevo teléfono del negocio.
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del negocio.
 *               delete:
 *                 type: boolean
 *                 description: Marca para eliminar el negocio.
 *               color1:
 *                 type: string
 *                 description: Nuevo color 1 del negocio.
 *               color2:
 *                 type: string
 *                 description: Nuevo color 2 del negocio.
 *               color3:
 *                 type: string
 *                 description: Nuevo color 3 del negocio.
 *               color4:
 *                 type: string
 *                 description: Nuevo color 4 del negocio.
 *               iban:
 *                 type: string
 *                 description: Nuevo IBAN del negocio.
 *               landing_img:
 *                 type: string
 *                 description: Nueva imagen de landing del negocio.
 *     responses:
 *       200:
 *         description: Modificación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Resultado de la modificación.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Error en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
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
 * /getbusiness:
 *   get:
 *     summary: Obtiene la información de un negocio por su tag.
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del negocio obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del negocio.
 *                 tag:
 *                   type: string
 *                   description: Tag del negocio.
 *                 name:
 *                   type: string
 *                   description: Nombre del negocio.
 *                 location:
 *                   type: string
 *                   description: Ubicación del negocio.
 *                 tel:
 *                   type: string
 *                   description: Teléfono del negocio.
 *                 color1:
 *                   type: string
 *                   description: Color 1 del negocio.
 *                 color2:
 *                   type: string
 *                   description: Color 2 del negocio.
 *                 color3:
 *                   type: string
 *                   description: Color 3 del negocio.
 *                 color4:
 *                   type: string
 *                   description: Color 4 del negocio.
 *                 landing_img:
 *                   type: string
 *                   description: Imagen de landing del negocio.
 *                 active_template:
 *                   type: string
 *                   description: Template activo del negocio.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Error en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
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
 * @swagger
 * tags:
 *   name: Business
 *   description: Business related endpoints
 */

/**
 * @swagger
 * /getalltemplates:
 *   get:
 *     summary: Obtiene todos los templates de un negocio por su tag.
 *     tags: [Templates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         required: true
 *         description: El tag del negocio.
 *     responses:
 *       200:
 *         description: Templates obtenidos exitosamente.
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
 *                         type: integer
 *                         description: ID del template.
 *                       name:
 *                         type: string
 *                         description: Nombre del template.
 *                       content:
 *                         type: string
 *                         description: Contenido del template.
 *                 active_template:
 *                   type: string
 *                   description: Nombre del template activo.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Error en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
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

//Orders
app.post('/neworder', async (req, res) => {
    try {
        var result = await newOrder(req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al añadir orden:', error.message);
        res.status(500).json({ error: 'Error al añadir orden' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on https://api.forkkies.live');
}
);

export default app;