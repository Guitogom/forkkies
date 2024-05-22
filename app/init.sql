-- Eliminar todas las tablas si existen
DROP TABLE IF EXISTS order_special;

DROP TABLE IF EXISTS order_product;

DROP TABLE IF EXISTS order_table;

DROP TABLE IF EXISTS cat_product;

DROP TABLE IF EXISTS category;

DROP TABLE IF EXISTS template;

DROP TABLE IF EXISTS special;

DROP TABLE IF EXISTS step;

DROP TABLE IF EXISTS product_properties;

DROP TABLE IF EXISTS product;

DROP TABLE IF EXISTS properties;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS business;

-- Tabla 'business'
CREATE TABLE IF NOT EXISTS business (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT,
    tag TEXT,
    password TEXT,
    name TEXT,
    tel TEXT,
    email TEXT,
    logo TEXT,
    landing_img BLOB,
    color1 TEXT,
    color2 TEXT,
    color3 TEXT,
    color4 TEXT,
    IBAN TEXT,
    active_template INTEGER
);

-- Tabla 'users'
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    manager TEXT,
    username TEXT,
    password TEXT,
    business_id INTEGER,
    FOREIGN KEY(business_id) REFERENCES business(id)
);

-- Tabla 'properties'
CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    img BLOB,
    business_id INTEGER,
    FOREIGN KEY(business_id) REFERENCES business(id)
);

-- Tabla 'product'
CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    desc TEXT,
    price REAL,
    img BLOB
);

-- Tabla 'product_properties'
CREATE TABLE IF NOT EXISTS product_properties (
    product_id INTEGER,
    properties_id INTEGER,
    FOREIGN KEY(product_id) REFERENCES product(id),
    FOREIGN KEY(properties_id) REFERENCES properties(id),
    PRIMARY KEY(product_id, properties_id)
);

-- Tabla 'step'
CREATE TABLE IF NOT EXISTS step (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    type TEXT,
    product_id INTEGER,
    FOREIGN KEY(product_id) REFERENCES product(id)
);

-- Tabla 'special'
CREATE TABLE IF NOT EXISTS special (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price_changer REAL,
    img BLOB,
    step_id INTEGER,
    FOREIGN KEY(step_id) REFERENCES step(id)
);

-- Tabla 'template'
CREATE TABLE IF NOT EXISTS template (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    business_id INTEGER,
    FOREIGN KEY(business_id) REFERENCES business(id)
);

-- Tabla 'category'
CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    img BLOB,
    template_id INTEGER,
    FOREIGN KEY(template_id) REFERENCES template(id)
);

-- Tabla 'cat_product'
CREATE TABLE IF NOT EXISTS cat_product (
    category_id INTEGER,
    product_id INTEGER,
    FOREIGN KEY(category_id) REFERENCES category(id),
    FOREIGN KEY(product_id) REFERENCES product(id),
    PRIMARY KEY(category_id, product_id)
);

-- Tabla 'order'
CREATE TABLE IF NOT EXISTS order (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT,
    name TEXT,
    date TEXT,
    business_id INTEGER,
    total REAL,
    FOREIGN KEY(business_id) REFERENCES business(id)
);

-- Tabla 'order_product'
CREATE TABLE IF NOT EXISTS order_product (
    order_id INTEGER,
    product_id INTEGER,
    unit_price REAL,
    quantity INTEGER,
    FOREIGN KEY(order_id) REFERENCES order(id),
    FOREIGN KEY(product_id) REFERENCES product(id),
    PRIMARY KEY(order_id, product_id),
);

-- Tabla 'order_special'
CREATE TABLE IF NOT EXISTS order_special (
    order_id INTEGER,
    product_id INTEGER,
    special_id INTEGER,
    FOREIGN KEY(order_id, product_id) REFERENCES order_product(order_id, product_id),
    FOREIGN KEY(special_id) REFERENCES special(id),
    PRIMARY KEY(order_id, product_id, special_id)
);

-- Eliminar triggers actuales
DROP TRIGGER IF EXISTS delete_business_dependencies;

DROP TRIGGER IF EXISTS delete_template_dependencies;

DROP TRIGGER IF EXISTS delete_category_dependencies;

DROP TRIGGER IF EXISTS delete_product_dependencies;

DROP TRIGGER IF EXISTS delete_step_dependencies;

DROP TRIGGER IF EXISTS delete_order_product_dependencies;
