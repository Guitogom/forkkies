import express from 'express';
import cors from 'cors';
import swaggerDocs from './swagger.js';
import { verifyTag, newBusiness, modifyBusiness, verificarToken, getBusiness, logBusiness, getallTemplates, newTemplate, modifyTemplate, getTemplate, newProperty, deleteProperty, getProperties, addProductProperty, deleteProductProperty, addCollection, newCategory, modifyCategory, getCategory, modifyProduct, getProduct, getAllBusiness, newOrder, getOrders, modifyOrderStatus } from './functions.js';


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
*     tags: [Business]
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
 *               error:
 *                 type: string
 *                 example: Token de acceso no válido o ausente
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
 *   name: Templates
 *   description: Template related endpoints
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

/**
 * @swagger
 * /newtemplate:
 *   get:
 *     summary: Crea un nuevo template para un negocio dado su tag.
 *     tags: [Templates]
 *     parameters:
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         required: true
 *         description: El tag del negocio para el cual se creará el nuevo template.
 *     responses:
 *       200:
 *         description: Nuevo template creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si se creó el template correctamente.
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

/**
 * @swagger
 * /modifytemplate:
 *   post:
 *     summary: Modifica un template existente.
 *     tags: [Templates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID del template a modificar.
 *               name:
 *                 type: string
 *                 description: Nuevo nombre para el template.
 *               activate:
 *                 type: boolean
 *                 description: Indica si se debe activar este template.
 *               deactivate:
 *                 type: boolean
 *                 description: Indica si se debe desactivar el template activo.
 *               delete:
 *                 type: boolean
 *                 description: Indica si se debe eliminar el template.
 *     responses:
 *       200:
 *         description: Acción sobre el template realizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando la acción realizada sobre el template.
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


app.post('/modifytemplate', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await modifyTemplate(tag, req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al modificar template:', error.message);
        res.status(500).json({ error: 'Error al modificar template' });
    }
});

/**
 * @swagger
 * /gettemplate:
 *   get:
 *     summary: Obtiene información sobre un template.
 *     tags: [Templates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         required: true
 *         description: El tag del negocio al que pertenece el template.
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *           description: El ID del template a obtener. Puede ser 'active' para obtener el template activo del negocio.
 *         required: true
 *     responses:
 *       200:
 *         description: Información del template obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 template:
 *                   type: object
 *                   description: Información del template.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del template.
 *                     name:
 *                       type: string
 *                       description: Nombre del template.
 *                     status:
 *                       type: boolean
 *                       description: Indica si el template está activo.
 *                 categories:
 *                   type: array
 *                   description: Lista de categorías asociadas al template.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la categoría.
 *                       name:
 *                         type: string
 *                         description: Nombre de la categoría.
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

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property related endpoints
 */

/**
 * @swagger
 * /newproperty:
 *   post:
 *     summary: Crea una nueva propiedad para un negocio.
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   name:
 *                     type: string
 *                     description: Nombre de la propiedad.
 *                   img:
 *                     type: string
 *                     description: URL de la imagen asociada a la propiedad.
 *     responses:
 *       200:
 *         description: Propiedad creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si se creó la propiedad correctamente.
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

/**
 * @swagger
 * /deleteproperty:
 *   post:
 *     summary: Elimina una propiedad de un negocio.
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la propiedad a eliminar.
 *     responses:
 *       200:
 *         description: Propiedad eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si se eliminó la propiedad correctamente.
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

/**
 * @swagger
 * /getproperties:
 *   get:
 *     summary: Obtiene todas las propiedades de un negocio.
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         required: true
 *         description: El tag del negocio del cual se quieren obtener las propiedades.
 *     responses:
 *       200:
 *         description: Propiedades obtenidas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 properties:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la propiedad.
 *                       name:
 *                         type: string
 *                         description: Nombre de la propiedad.
 *                       img:
 *                         type: string
 *                         description: URL de la imagen asociada a la propiedad.
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

app.get('/addproductproperty', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await addProductProperty(tag, req.query);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al añadir propiedad a producto:', error.message);
        res.status(500).json({ error: 'Error al añadir propiedad a producto' });
    }
})

app.get('/deleteproductproperty', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await deleteProductProperty(tag, req.query);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al eliminar propiedad de producto:', error.message);
        res.status(500).json({ error: 'Error al eliminar propiedad de producto' });
    }
})

//Categories

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category related endpoints
 */

/**
 * @swagger
 * /newcategory:
 *   post:
 *     summary: Añade una nueva categoría a un template de negocio.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   category:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Nombre de la categoría.
 *                       img:
 *                         type: string
 *                         description: URL de la imagen asociada a la categoría.
 *                   template_id:
 *                     type: integer
 *                     description: ID del template al que se quiere añadir la categoría.
 *     responses:
 *       200:
 *         description: Categoría añadida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si se añadió la categoría correctamente.
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


app.post('/newcategory', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await newCategory(tag, req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al añadir categoría:', error.message);
        res.status(500).json({ error: 'Error al añadir categoría' });
    }
});

/**
 * @swagger
 * /modifycategory:
 *   post:
 *     summary: Modifica o elimina una categoría de un template de negocio.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tag:
 *                 type: string
 *                 description: El tag del negocio al que pertenece el template.
 *               body:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la categoría a modificar o eliminar.
 *                       name:
 *                         type: string
 *                         description: Nuevo nombre de la categoría.
 *                       img:
 *                         type: string
 *                         description: Nueva URL de la imagen asociada a la categoría.
 *                       delete:
 *                         type: boolean
 *                         description: Indica si se quiere eliminar la categoría.
 *                   template_id:
 *                     type: integer
 *                     description: ID del template al que pertenece la categoría.
 *     responses:
 *       200:
 *         description: Categoría modificada o eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si se modificó o eliminó la categoría correctamente.
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

/**
 * @swagger
 * /getcategory:
 *   get:
 *     summary: Obtiene información de una categoría y sus productos.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: El tag del negocio al que pertenece la categoría.
 *       - in: query
 *         name: category_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría que se desea obtener.
 *     responses:
 *       200:
 *         description: Información de la categoría y sus productos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Nombre de la categoría.
 *                     img:
 *                       type: string
 *                       description: URL de la imagen asociada a la categoría.
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del producto.
 *                       name:
 *                         type: string
 *                         description: Nombre del producto.
 *                       img:
 *                         type: string
 *                         description: URL de la imagen asociada al producto.
 *                       price:
 *                         type: number
 *                         description: Precio del producto.
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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product related endpoints
 */

/**
 * @swagger
 * /modifyproduct:
 *   post:
 *     summary: Modifica un producto existente o crea uno nuevo en una categoría especificada.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *                 description: ID de la categoría a la que se va a modificar o añadir el producto.
 *               product:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del producto (si existe).
 *                   name:
 *                     type: string
 *                     description: Nombre del producto.
 *                   desc:
 *                     type: string
 *                     description: Descripción del producto.
 *                   price:
 *                     type: number
 *                     description: Precio del producto.
 *                   img:
 *                     type: string
 *                     description: URL de la imagen asociada al producto.
 *                   delete:
 *                     type: boolean
 *                     description: Indica si se debe eliminar el producto (true/false).
 *                   steps:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           description: Título del paso.
 *                         type:
 *                           type: string
 *                           description: Tipo de paso.
 *                         specials:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 description: Nombre del especial.
 *                               price_changer:
 *                                 type: number
 *                                 description: Cambio de precio asociado al especial.
 *                               img:
 *                                 type: string
 *                                 description: URL de la imagen asociada al especial.
 *     responses:
 *       200:
 *         description: Producto modificado o añadido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de éxito.
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
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

/**
 * @swagger
 * /getproduct:
 *   get:
 *     summary: Obtiene los detalles de un producto específico.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: El tag del negocio al que pertenece el producto.
 *       - in: query
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto que se desea obtener.
 *     responses:
 *       200:
 *         description: Detalles del producto obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del producto.
 *                     name:
 *                       type: string
 *                       description: Nombre del producto.
 *                     desc:
 *                       type: string
 *                       description: Descripción del producto.
 *                     price:
 *                       type: number
 *                       description: Precio del producto.
 *                     img:
 *                       type: string
 *                       description: URL de la imagen asociada al producto.
 *                     steps:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID del paso.
 *                           title:
 *                             type: string
 *                             description: Título del paso.
 *                           type:
 *                             type: string
 *                             description: Tipo de paso.
 *                           specials:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   description: ID del especial.
 *                                 name:
 *                                   type: string
 *                                   description: Nombre del especial.
 *                                 price_changer:
 *                                   type: number
 *                                   description: Cambio de precio asociado al especial.
 *                                 img:
 *                                   type: string
 *                                   description: URL de la imagen asociada al especial.
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
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


app.get('/getproduct', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await getProduct(tag, req.query.id);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al obtener producto:', error.message);
        res.status(500).json({ error: 'Error al obtener producto' });
    }
});

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client related endpoints
 */

/**
 * @swagger
 * /loadbusiness:
 *   get:
 *     summary: Obtiene todos los detalles de un negocio, incluidas categorías, productos y pasos especiales.
 *     tags: [Clients]
 *     parameters:
 *       - in: query
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: El tag del negocio del que se desean obtener los detalles.
 *     responses:
 *       200:
 *         description: Detalles del negocio obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 business:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del negocio.
 *                     name:
 *                       type: string
 *                       description: Nombre del negocio.
 *                     color1:
 *                       type: string
 *                       description: Color 1 del negocio.
 *                     color2:
 *                       type: string
 *                       description: Color 2 del negocio.
 *                     color3:
 *                       type: string
 *                       description: Color 3 del negocio.
 *                     color4:
 *                       type: string
 *                       description: Color 4 del negocio.
 *                     landing_img:
 *                       type: string
 *                       description: Imagen de aterrizaje del negocio.
 *                     active_template:
 *                       type: integer
 *                       description: ID de la plantilla activa del negocio.
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID de la categoría.
 *                           name:
 *                             type: string
 *                             description: Nombre de la categoría.
 *                           img:
 *                             type: string
 *                             description: URL de la imagen de la categoría.
 *                           products:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   description: ID del producto.
 *                                 name:
 *                                   type: string
 *                                   description: Nombre del producto.
 *                                 desc:
 *                                   type: string
 *                                   description: Descripción del producto.
 *                                 img:
 *                                   type: string
 *                                   description: URL de la imagen del producto.
 *                                 price:
 *                                   type: number
 *                                   description: Precio del producto.
 *                                 steps:
 *                                   type: array
 *                                   items:
 *                                     type: object
 *                                     properties:
 *                                       id:
 *                                         type: integer
 *                                         description: ID del paso.
 *                                       title:
 *                                         type: string
 *                                         description: Título del paso.
 *                                       type:
 *                                         type: string
 *                                         description: Tipo de paso.
 *                                       specials:
 *                                         type: array
 *                                         items:
 *                                           type: object
 *                                           properties:
 *                                             id:
 *                                               type: integer
 *                                               description: ID del especial.
 *                                             name:
 *                                               type: string
 *                                               description: Nombre del especial.
 *                                             price_changer:
 *                                               type: number
 *                                               description: Cambio de precio asociado al especial.
 *                                             img:
 *                                               type: string
 *                                               description: URL de la imagen del especial.
 *       400:
 *         description: Error en la solicitud.
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


app.get('/loadbusiness', async (req, res) => {
    try {
        var result = await getAllBusiness(req.query.tag);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al obtener negocio:', error.message);
        res.status(500).json({ error: 'Error al obtener negocio' });
    }
});

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order related endpoints
 */


/**
 * @swagger
 * /neworder:
 *   post:
 *     summary: Crear un nuevo pedido.
 *     tags: [Orders]
 *     description: Crea un nuevo pedido con los productos y opciones seleccionadas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               business_id:
 *                 type: integer
 *                 description: ID del negocio.
 *                 example: 1
 *               total:
 *                 type: number
 *                 description: Total del pedido.
 *                 example: 100.50
 *               name:
 *                 type: string
 *                 description: Nombre del cliente.
 *                 example: John Doe
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del producto.
 *                       example: 1
 *                     unit_price:
 *                       type: number
 *                       description: Precio unitario del producto.
 *                       example: 25.00
 *                     quantity:
 *                       type: integer
 *                       description: Cantidad del producto.
 *                       example: 2
 *                     specials:
 *                       type: string
 *                       description: Combinación de opciones especiales del producto.
 *                       example: "1,2,3"
 *     responses:
 *       200:
 *         description: Pedido creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     order_id:
 *                       type: integer
 *                       description: ID del pedido creado.
 *                       example: 1
 *       500:
 *         description: Error al crear el pedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al añadir el pedido
 */




app.post('/neworder', async (req, res) => {
    try {
        var result = await newOrder(req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al añadir orden:', error.message);
        res.status(500).json({ error: 'Error al añadir orden' });
    }
});

/**
 * @swagger
 * /getorders:
 *   get:
 *     summary: Obtener pedidos.
 *     tags: [Orders]
 *     description: Obtiene los pedidos activos del negocio actual.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pedidos obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   description: Detalles de los pedidos obtenidos.
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID del pedido.
 *                           business_id:
 *                             type: integer
 *                             description: ID del negocio al que pertenece el pedido.
 *                           total:
 *                             type: number
 *                             description: Total del pedido.
 *                           name:
 *                             type: string
 *                             description: Nombre del pedido.
 *                           date:
 *                             type: string
 *                             format: date
 *                             description: Fecha del pedido en formato YYYY-MM-DD.
 *                           products:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                   description: Nombre del producto.
 *                                 img:
 *                                   type: string
 *                                   description: URL de la imagen del producto.
 *                                 unit_price:
 *                                   type: number
 *                                   description: Precio unitario del producto.
 *                                 quantity:
 *                                   type: integer
 *                                   description: Cantidad del producto.
 *                                 options:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                                     description: Opciones especiales del producto.
 *                                 deletables:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                                     description: Extras que se pueden eliminar del producto.
 *                                 extras:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                                     description: Extras disponibles para agregar al producto.
 *       401:
 *         description: Token de autenticación no proporcionado o inválido.
 *       500:
 *         description: Error al obtener pedidos.
 */


app.get('/getorders', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await getOrders(tag);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al obtener ordenes:', error.message);
        res.status(500).json({ error: 'Error al obtener ordenes' });
    }
});

/**
 * @swagger
 * /modifyorderstatus:
 *   post:
 *     summary: Modificar el estado de un pedido.
 *     tags: [Orders]  
 *     description: Modifica el estado de un pedido específico asociado a un negocio. El `tag` del negocio se obtiene del token de seguridad.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID del pedido.
 *                 example: 1
 *               status:
 *                 type: integer
 *                 description: Nuevo estado del pedido.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Estado del pedido modificado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: Nuevo estado del pedido.
 *                   example: 2
 *       500:
 *         description: Error al modificar el estado del pedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al modificar el estado del pedido
 */


app.post('/modifyorderstatus', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await modifyOrderStatus(tag, req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al modificar estado de orden:', error.message);
        res.status(500).json({ error: 'Error al modificar estado de orden' });
    }
});

app.get('/addcollection', verificarToken, async (req, res) => {
    try {
        var tag = req.tag;
        var result = await addCollection(tag, req.query.id);
        // console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al añadir colección:', error.message);
        res.status(500).json({ error: 'Error al añadir colección' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on https://api.forkkies.live');
}
);

export default app;