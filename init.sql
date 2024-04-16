-- Tabla 'business'
CREATE TABLE IF NOT EXISTS business (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    tag TEXT,
    password TEXT,
    name TEXT,
    tel TEXT,
    email TEXT,
    logo TEXT,
    landing_img TEXT,
    color1 TEXT,
    color2 TEXT,
    color3 TEXT,
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
    img TEXT,
    business_id INTEGER,
    FOREIGN KEY(business_id) REFERENCES business(id)
);

-- Tabla 'product'
CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    desc TEXT,
    price REAL,
    img TEXT
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
    img TEXT,
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
    img TEXT,
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
CREATE TABLE IF NOT EXISTS order_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT,
    name TEXT,
    date TEXT
);

-- Tabla 'order_product'
CREATE TABLE IF NOT EXISTS order_product (
    order_id INTEGER,
    product_id INTEGER,
    unit_price REAL,
    quantity INTEGER,
    FOREIGN KEY(order_id) REFERENCES order_table(id),
    FOREIGN KEY(product_id) REFERENCES product(id),
    PRIMARY KEY(order_id, product_id)
);

-- Tabla 'order_special'
CREATE TABLE IF NOT EXISTS order_special (
    order_product_id INTEGER,
    special_id INTEGER,
    FOREIGN KEY(order_product_id) REFERENCES order_product(order_id),
    FOREIGN KEY(special_id) REFERENCES special(id),
    PRIMARY KEY(order_product_id, special_id)
);
