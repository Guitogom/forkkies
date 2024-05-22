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
    if (!business.location) {
        incorrect_field.push("location");
    }
    if (!business.tel) {
        incorrect_field.push("tel");
    }
    if (!business.password) {
        incorrect_field.push("password");
    }

    //Si no hay campos incorrectos, añadimos el negocio a la base de datos
    if (incorrect_field.length === 0) {
        try {
            await db.execute(
                {
                    sql: 'INSERT INTO business (tag, name, location, tel, password, color1, color2, color3, color4) VALUES (:tag, :name, :location, :tel, :password, "#ADD861", "#4D4D4D", "#D9D9D9", "#F9FBFD")',
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

export async function modifyBusiness(tag, business) {
    business.tag = tag;
    try {
        if (business.name) {
            await db.execute(
                {
                    sql: 'UPDATE business SET name = :name WHERE tag = :tag',
                    args: business
                }
            );
            return "Name modified";
        }
        if (business.tel) {
            await db.execute(
                {
                    sql: 'UPDATE business SET tel = :tel WHERE tag = :tag',
                    args: business
                }
            );
            return "Phone modified";
        }
        if (business.password) {
            await db.execute(
                {
                    sql: 'UPDATE business SET password = :password WHERE tag = :tag',
                    args: business
                }
            );
            return "Password modified";
        }
        if (business.delete) {
            //Modificamos el tag del business a inactive
            await db.execute(
                {
                    sql: 'UPDATE business SET tag = "deleted" WHERE tag = :tag',
                    args: { tag }
                }
            );
            return "Business deleted";
        }

        if (business.color1) {
            await db.execute(
                {
                    sql: 'UPDATE business SET color1 = :color1 WHERE tag = :tag',
                    args: business
                }
            );
            return "Color1 modified";
        }

        if (business.color2) {
            await db.execute(
                {
                    sql: 'UPDATE business SET color2 = :color2 WHERE tag = :tag',
                    args: business
                }
            );
            return "Color2 modified";
        }

        if (business.color3) {
            await db.execute(
                {
                    sql: 'UPDATE business SET color3 = :color3 WHERE tag = :tag',
                    args: business
                }
            );
            return "Color3 modified";
        }

        if (business.color4) {
            await db.execute(
                {
                    sql: 'UPDATE business SET color4 = :color4 WHERE tag = :tag',
                    args: business
                }
            );
            return "Color4 modified";
        }

        if (business.iban) {
            await db.execute(
                {
                    sql: 'UPDATE business SET IBAN = :iban WHERE tag = :tag',
                    args: business
                }
            );
            return "Iban modified";
        }

        if (business.landing_img) {
            await db.execute(
                {
                    sql: 'UPDATE business SET landing_img = :landing_img WHERE tag = :tag',
                    args: business
                }
            );
            return "Landing image modified";
        }
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
}

export async function getBusiness(tag) {
    try {
        var result = await db.execute(
            {
                sql: 'SELECT id, tag, name, location, tel, color1, color2, color3, color4, landing_img, active_template FROM business WHERE tag = :tag',
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

export async function getallTemplates(tag) {
    try {
        var result = await db.execute(
            {
                sql: 'SELECT id, active_template FROM business WHERE tag = :tag',
                args: { tag }
            }
        );
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
    var id = result.rows[0].id;
    var active_template = result.rows[0].active_template;

    try {
        var result = await db.execute(
            {
                sql: 'SELECT * FROM template WHERE business_id = :id',
                args: { id }
            }
        );
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
    var templates = result.rows;

    return { templates, active_template };
}

export async function newTemplate(tag) {
    try {
        var result = await db.execute(
            {
                sql: 'SELECT id FROM business WHERE tag = :tag',
                args: { tag }
            }
        );
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
    var id = result.rows[0].id;

    try {
        await db.execute(
            {
                sql: 'INSERT INTO template (business_id, name) VALUES (:id, "Unnamed template")',
                args: { id }
            }
        );
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
    return true;
}

async function checkTemplateOwnership(tag, template_id) {
    try {
        var businessResult = await db.execute({
            sql: 'SELECT id FROM business WHERE tag = :tag',
            args: { tag }
        });
        var business_id = businessResult.rows[0].id;

        var templateResult = await db.execute({
            sql: 'SELECT * FROM template WHERE id = :template_id AND business_id = :business_id',
            args: { template_id, business_id }
        });

        return templateResult.rows.length > 0;
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
}

export async function modifyTemplate(tag, template) {
    var template_id = template.id;

    // Comprobamos que el template pertenezca al negocio
    if (!(await checkTemplateOwnership(tag, template_id))) {
        throw new Error('Template no encontrado');
    }

    try {
        if (template.name) {
            await db.execute({
                sql: 'UPDATE template SET name = :name WHERE id = :id',
                args: template
            });
            return "Name modified";
        }
        if (template.activate) {
            await db.execute({
                sql: 'UPDATE business SET active_template = :template_id WHERE tag = :tag',
                args: { template_id, tag }
            });
            return "Template activated";
        }
        if (template.deactivate) {
            await db.execute({
                sql: 'UPDATE business SET active_template = NULL WHERE tag = :tag',
                args: { tag }
            });
            return "Template deactivated";
        }
        if (template.delete) {
            template_id = template.id;
            //Seleccionamos las categorias del template
            var result = await db.execute({
                sql: 'SELECT id FROM category WHERE template_id = :template_id',
                args: { template_id }
            });
            //Eliminamos los registros de cat_product
            for (var i = 0; i < result.rows.length; i++) {
                await db.execute({
                    sql: 'DELETE FROM cat_product WHERE category_id = :id',
                    args: result.rows[i]
                });
            }
            //Eliminamos las categorias
            await db.execute({
                sql: 'DELETE FROM category WHERE template_id = :template_id',
                args: { template_id }
            });
            //Eliminamos el template
            await db.execute({
                sql: 'DELETE FROM template WHERE id = :template_id',
                args: { template_id }
            });
            return "Template deleted";
        }
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
}


export async function getTemplate(tag, template_id) {
    if (template_id == 'active') {
        try {
            var result = await db.execute({
                sql: 'SELECT active_template FROM business WHERE tag = :tag',
                args: { tag }
            });
            template_id = result.rows[0].active_template;
        } catch (error) {
            console.error('Error en la base de datos:', error.message);
            throw new Error('Error en la base de datos: ' + error.message);
        }
    }

    // Comprobamos que el template pertenezca al negocio
    if (!(await checkTemplateOwnership(tag, template_id))) {
        throw new Error('Template no encontrado');
    } else {
        //Si pertenece, obtenemos el template
        try {
            var result = await db.execute({
                sql: 'SELECT * FROM template WHERE id = :template_id',
                args: { template_id }
            });
            var template = result.rows[0];
        } catch (error) {
            console.error('Error en la base de datos:', error.message);
            throw new Error('Error en la base de datos: ' + error.message);
        }

        //Obtenemos el active_template del negocio
        try {
            var result = await db.execute({
                sql: 'SELECT active_template FROM business WHERE tag = :tag',
                args: { tag }
            });
            template.status = result.rows[0].active_template == template_id;
        } catch (error) {
            console.error('Error en la base de datos:', error.message);
            throw new Error('Error en la base de datos: ' + error.message);
        }

        //Obtenemos las categorias del template
        try {
            var result = await db.execute({
                sql: 'SELECT * FROM category WHERE template_id = :template_id',
                args: { template_id }
            });
            var categories = result.rows;
        } catch (error) {
            console.error('Error en la base de datos:', error.message);
            throw new Error('Error en la base de datos: ' + error.message);
        }

        //Devolvemos el template con sus categorias
        return { template, categories };
    }
}

//Properties
export async function newProperty(tag, property) {
    //Obtenemos la id del business
    try {
        var result = await db.execute({
            sql: 'SELECT id FROM business WHERE tag = :tag',
            args: { tag }
        });
        var business_id = result.rows[0].id;
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
    //Añadimos la propiedad con su nombre y el negocio al que pertenece
    try {
        await db.execute({
            sql: 'INSERT INTO properties (name, img, business_id) VALUES (:name, :img ,:business_id)',
            args: { name: property.name, img: property.img, business_id }
        });
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
}

export async function deleteProperty(tag, property) {
    //Obtenemos la id del business
    try {
        var result = await db.execute({
            sql: 'SELECT id FROM business WHERE tag = :tag',
            args: { tag }
        });
        var business_id = result.rows[0].id;
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
    //Eliminamos la propiedad
    try {
        await db.execute({
            sql: 'DELETE FROM properties WHERE id = :id AND business_id = :business_id',
            args: { id: property.id, business_id }
        });
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
}

export async function getProperties(tag, property) {
    //Obtenemos la id del business
    try {
        var result = await db.execute({
            sql: 'SELECT id FROM business WHERE tag = :tag',
            args: { tag }
        });
        var business_id = result.rows[0].id;
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
    //Obtenemos las propiedades del negocio
    try {
        var result = await db.execute({
            sql: 'SELECT * FROM properties WHERE business_id = :business_id',
            args: { business_id }
        });
        var properties = result.rows;
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
    return { properties };
}

//Categories
export async function newCategory(tag, body) {
    var category = body.category;
    var template_id = body.template_id;

    //Verificamos que el template pertenezca al negocio
    if (!(await checkTemplateOwnership(tag, template_id))) {
        throw new Error('Template no encontrado');
    }

    //Añadimos la categoria con su nombre, imagen y el template al que pertenece
    try {
        await db.execute({
            sql: 'INSERT INTO category (name, img, template_id) VALUES (:name, :img, :template_id)',
            args: { name: category.name, img: category.img, template_id }
        });
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
}

export async function modifyCategory(tag, body) {
    var category = body.category;
    var template_id = body.template_id;

    //Verificamos que el template pertenezca al negocio
    if (!(await checkTemplateOwnership(tag, template_id))) {
        throw new Error('Template no encontrado');
    }

    if (category.delete) {
        //Eliminamos la categoria
        try {
            //Borramos los registros de cat_product
            await db.execute({
                sql: 'DELETE FROM cat_product WHERE category_id = :id',
                args: { id: category.id }
            });

            //Borramos la categoría
            await db.execute({
                sql: 'DELETE FROM category WHERE id = :id',
                args: { id: category.id }
            });

        } catch (error) {
            console.error('Error al borrar categoria:', error.message);
            throw new Error('Error al borrar categoria: ' + error.message);
        }
    } else {
        //Modificamos la categoria con su nombre, imagen y el template al que pertenece
        try {
            await db.execute({
                sql: 'UPDATE category SET name = :name, img = :img WHERE id = :id',
                args: category
            });
        } catch (error) {
            console.error('Error al modificar categoria:', error.message);
            throw new Error('Error al modificar categoria: ' + error.message);
        }
    }
}

export async function getCategory(tag, category_id) {
    //Obtenemos el id_template de la categoria
    try {
        var result = await db.execute({
            sql: 'SELECT template_id FROM category WHERE id = :category_id',
            args: { category_id }
        });
        var template_id = result.rows[0].template_id;
    } catch (error) {
        console.error('Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }
    //Verifivamos que el template pertenezca al negocio
    if (!(await checkTemplateOwnership(tag, template_id))) {
        throw new Error('No tienes acceso a esta categoria');
    } else {
        //Obtenemos la categoria
        try {
            var result = await db.execute({
                sql: 'SELECT name, img FROM category WHERE id = :category_id',
                args: { category_id }
            });
            var category = result.rows[0];
        } catch (error) {
            console.error('Error en la base de datos:', error.message);
            throw new Error('Error en la base de datos: ' + error.message);
        }

        //Obtenemos los productos de la categoria
        try {
            var result = await db.execute({
                sql: 'SELECT product_id FROM cat_product WHERE category_id = :category_id',
                args: { category_id }
            });
            var products_id = result.rows;
        } catch (error) {
            console.error('Error en la base de datos:', error.message);
            throw new Error('Error en la base de datos: ' + error.message);
        }
        //Obtenemos el name, img de cada producto y lo vocamos a una array
        var products = [];
        for (var i = 0; i < products_id.length; i++) {
            try {
                var result = await db.execute({
                    sql: 'SELECT id, name, img, price FROM product WHERE id = :product_id AND name != "deleted"',
                    args: products_id[i]
                });
                if (result.rows.length > 0) {
                    products.push(result.rows[0]);
                }
            } catch (error) {
                console.error('Error en la base de datos:', error.message);
                throw new Error('Error en la base de datos: ' + error.message);
            }
        }
        //Devolvemos la categoria con sus productos
        return { category, products };
    }
}

export async function modifyProduct(tag, body) {
    var category_id = body.category_id;
    var product = body.product;
    var steps = product.steps;

    //Obtenemos el id_template de la categoria
    try {
        var result = await db.execute({
            sql: 'SELECT template_id FROM category WHERE id = :category_id',
            args: { category_id }
        });
        var template_id = result.rows[0].template_id;
    } catch (error) {
        console.error('1Error en la base de datos:', error.message);
        throw new Error('Error en la base de datos: ' + error.message);
    }

    //Verificamos que el template pertenezca al negocio
    if (!(await checkTemplateOwnership(tag, template_id))) {
        throw new Error('Template no encontrado');
    } else {
        if (!body.product.id) {
            try {
                var result = await db.execute({
                    sql: 'INSERT INTO product (name, desc, price, img) VALUES (:name, :desc, :price, :img) RETURNING id',
                    args: { name: product.name, desc: product.desc, price: product.price, img: product.img }
                });
                var product_id = result.rows[0].id;
            } catch (error) {
                console.error('Error al insertar el producto:', error.message);
                throw new Error('Error al insertar el producto: ' + error.message);
            }

            try {
                await db.execute({
                    sql: 'INSERT INTO cat_product (category_id, product_id) VALUES (:category_id, :product_id)',
                    args: { category_id, product_id }
                });
            } catch (error) {
                console.error('Error al insertar el producto en la categoría:', error.message);
                throw new Error('Error al insertar el producto en la categoría: ' + error.message);
            }

            //Recorremos los steps
            for (var i = 0; i < steps.length; i++) {
                var step = steps[i];
                //Si el step no tiene id, lo añadimos
                try {
                    var result = await db.execute({
                        sql: 'INSERT INTO step (title, type, product_id) VALUES (:title, :type, :product_id) RETURNING id',
                        args: { title: step.title, type: step.type, product_id }
                    });
                    var step_id = result.rows[0].id;
                } catch (error) {
                    console.error('Error al insertar el step:', error.message);
                    throw new Error('Error al insertar el step: ' + error.message);
                }

                if (step.specials) {
                    //Recorremos los specials
                    for (var j = 0; j < step.specials.length; j++) {
                        var special = step.specials[j];
                        //Si el special no tiene id, lo añadimos
                        try {
                            await db.execute({
                                sql: 'INSERT INTO special (name, price_changer, img, step_id) VALUES (:name, :price_changer, :img, :step_id)',
                                args: { name: special.name, price_changer: special.price_changer, img: special.img, step_id }
                            });
                        } catch (error) {
                            console.error('Error al insertar el special:', error.message);
                            throw new Error('Error al insertar el special: ' + error.message);
                        }
                    }
                }
            }
        } else {
            var product_id = product.id;
            //Verificamos que el producto pertenezca a la categoria
            try {
                var result = await db.execute({
                    sql: 'SELECT * FROM cat_product WHERE category_id = :category_id AND product_id = :product_id',
                    args: { category_id, product_id }
                });
                if (result.rows.length === 0) {
                    throw new Error('El producto no pertenece a la categoria');
                } else {
                    if (product.delete) {
                        //Cambiamos el nombre del producto a deleted
                        try {
                            await db.execute({
                                sql: 'UPDATE product SET name = "deleted" WHERE id = :id',
                                args: { id: product_id }
                            });
                        } catch (error) {
                            console.error('2Error en la base de datos:', error.message);
                            throw new Error('2Error en la base de datos: ' + error.message);
                        }
                    } else {

                        try {
                            await db.execute({
                                sql: 'UPDATE product SET name = :name, desc = :desc, price = :price, img = :img WHERE id = :id',
                                args: { name: product.name, desc: product.desc, price: product.price, img: product.img, id: product.id }
                            });
                        } catch (error) {
                            console.error('3Error en la base de datos:', error.message);
                            throw new Error('Error en la base de datos: ' + error.message);
                        }

                        //Eliminamos specials que tengan un step que esté en el producto
                        try {
                            await db.execute({
                                sql: 'DELETE FROM special WHERE step_id IN (SELECT id FROM step WHERE product_id = :product_id)',
                                args: { product_id }
                            });
                        } catch (error) {
                            console.error('4Error en la base de datos:', error.message);
                            throw new Error('4Error en la base de datos: ' + error.message);
                        }
                        //Eliminamos steps que estén en el producto
                        try {
                            await db.execute({
                                sql: 'DELETE FROM step WHERE product_id = :product_id',
                                args: { product_id }
                            });
                        } catch (error) {
                            console.error('5Error en la base de datos:', error.message);
                            throw new Error('5Error en la base de datos: ' + error.message);
                        }

                        //Recorremos los steps
                        for (var i = 0; i < steps.length; i++) {
                            var step = steps[i];
                            //Si el step no tiene id, lo añadimos

                            try {
                                var result = await db.execute({
                                    sql: 'INSERT INTO step (title, type, product_id) VALUES (:title, :type, :product_id) RETURNING id',
                                    args: { title: step.title, type: step.type, product_id }
                                });
                                var step_id = result.rows[0].id;
                            } catch (error) {
                                console.error('5Error en la base de datos:', error.message);
                                throw new Error('5Error en la base de datos: ' + error.message);
                            }

                            if (step.specials) {
                                //Recorremos los specials
                                for (var j = 0; j < step.specials.length; j++) {
                                    var special = step.specials[j];
                                    //Si el special no tiene id, lo añadimos
                                    try {
                                        await db.execute({
                                            sql: 'INSERT INTO special (name, price_changer, img, step_id) VALUES (:name, :price_changer, :img, :step_id)',
                                            args: { name: special.name, price_changer: special.price_changer, img: special.img, step_id }
                                        });
                                    } catch (error) {
                                        console.error('6Error en la base de datos:', error.message);
                                        throw new Error('6Error en la base de datos: ' + error.message);
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('7Error en la base de datos:', error.message);
                throw new Error('7Error en la base de datos: ' + error.message);
            }
        }
    }
}

export async function getProduct(tag, product_id) {
    //Obtenemos el id_template de la categoria
    try {
        var result = await db.execute({
            sql: 'SELECT template_id FROM category WHERE id = (SELECT category_id FROM cat_product WHERE product_id = :product_id)',
            args: { product_id }
        });
        var template_id = result.rows[0].template_id;
    } catch (error) {
        console.error('1Error en la base de datos:', error.message);
        throw new Error('1Error en la base de datos: ' + error.message);
    }

    //Verificamos que el template pertenezca al negocio
    if (!(await checkTemplateOwnership(tag, template_id))) {
        throw new Error('Template no encontrado');
    } else {
        //Obtenemos el producto
        try {
            var result = await db.execute({
                sql: 'SELECT * FROM product WHERE id = :product_id',
                args: { product_id }
            });
            var product = result.rows[0];
        } catch (error) {
            console.error('2Error en la base de datos:', error.message);
            throw new Error('2Error en la base de datos: ' + error.message);
        }

        //Obtenemos los steps del producto
        try {
            var result = await db.execute({
                sql: 'SELECT * FROM step WHERE product_id = :product_id',
                args: { product_id }
            });
            product.steps = result.rows;
        } catch (error) {
            console.error('3Error en la base de datos:', error.message);
            throw new Error('3Error en la base de datos: ' + error.message);
        }

        //Recorremos los steps
        for (var i = 0; i < product.steps.length; i++) {
            var step_id = product.steps[i].id;
            //Obtenemos los specials del step
            try {
                var result = await db.execute({
                    sql: 'SELECT * FROM special WHERE step_id = :id',
                    args: { id: step_id }
                });
                //Si hay specials, los añadimos al step
                if (result.rows.length > 0) {
                    product.steps[i].specials = result.rows;
                } else {
                    product.steps[i].specials = [];
                }
            } catch (error) {
                console.error('4Error en la base de datos al recorrer steps:', error.message);
                throw new Error('4Error en la base de datos al recorrer steps: ' + error.message);
            }
        }

        //Devolvemos el producto con sus steps
        return { product };
    }
}

export async function getAllBusiness(tag) {
    try {
        const business = await fetchBusiness(tag);
        const categories = await fetchCategoriesForTemplate(business.active_template);

        for (const category of categories) {
            const products = await fetchProductsForCategory(category.id);
            for (const product of products) {
                product.steps = await fetchStepsForProduct(product.id);
                for (const step of product.steps) {
                    step.specials = await fetchSpecialsForStep(step.id);
                }
            }
            category.products = products;
        }

        business.categories = categories;

        return { business };
    } catch (error) {
        console.error('Error fetching data from the database:', error.message);
        throw new Error('Error fetching data from the database: ' + error.message);
    }
}

async function fetchBusiness(tag) {
    const result = await db.execute({
        sql: 'SELECT id, name, color1, color2, color3, color4, landing_img, active_template FROM business WHERE tag = :tag',
        args: { tag }
    });

    if (!result || result.rows.length === 0) {
        throw new Error('No businesses found');
    }

    return result.rows[0];
}

async function fetchCategoriesForTemplate(active_template) {
    const result = await db.execute({
        sql: 'SELECT * FROM category WHERE template_id = :active_template',
        args: { active_template }
    });

    if (result.rows.length === 0) {
        throw new Error('No categories found');
    }

    return result.rows;
}

async function fetchProductsForCategory(category_id) {
    const result = await db.execute({
        sql: 'SELECT id, name, desc, img, price FROM product WHERE id IN (SELECT product_id FROM cat_product WHERE category_id = :category_id) AND name != "deleted"',
        args: { category_id }
    });

    return result.rows;
}

async function fetchStepsForProduct(product_id) {
    const result = await db.execute({
        sql: 'SELECT * FROM step WHERE product_id = :product_id',
        args: { product_id }
    });

    return result.rows;
}

async function fetchSpecialsForStep(step_id) {
    const result = await db.execute({
        sql: 'SELECT * FROM special WHERE step_id = :step_id',
        args: { step_id }
    });

    return result.rows;
}

//Orders
export async function newOrder(order) {
    //Creamos el order
    try {
        var result = await db.execute({
            sql: 'INSERT INTO orders (business_id, total, name, date) VALUES (:business_id, :total, :name, :date) RETURNING id',
            args: order
        });
        var order_id = result.rows[0].id;
    } catch (error) {
        console.error('Error al insertar el order:', error.message);
        throw new Error('Error al insertar el order: ' + error.message);
    }

    //Recorremos los productos
    for (var i = 0; i < order.products.length; i++) {
        var product = order.products[i];
        //Si el product no tiene id, lo añadimos
        try {
            var result = await db.execute({
                sql: 'INSERT INTO order_product (order_id, product_id, unit_price, quantity) VALUES (:order_id, :product_id, :unit_price, :quantity)',
                args: { order_id, product_id: product.id, unit_price: product.unit_price, quantity: product.quantity }
            });
        } catch (error) {
            console.error('Error al insertar el product:', error.message);
            throw new Error('Error al insertar el product: ' + error.message);
        }

        //Recorremos los specials que tiene el producto
        for (var j = 0; j < product.specials.length; j++) {
            var special = product.specials[j];
            //Si el special no tiene id, lo añadimos
            try {
                await db.execute({
                    sql: 'INSERT INTO order_special (order_id, product_id, special_id) VALUES (:order_id, :product_id, :special_id)',
                    args: { order_id, product_id: product.id, special_id: special.id }
                });
            } catch (error) {
                console.error('Error al insertar el special:', error.message);
                throw new Error('Error al insertar el special: ' + error.message);
            }
        }
    }
}