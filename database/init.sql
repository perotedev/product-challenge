USE product_challenge;

-- Creation of product table
CREATE TABLE  product (
    id INT NOT NULL AUTO_INCREMENT,
    description varchar(250) NOT NULL,
    buyDate DATE NOT NULL,
    price FLOAT NOT NULL,
    categoryId INT NOT NULL,
    
    PRIMARY KEY (id)
);

ALTER TABLE product MODIFY description TEXT CHARACTER SET utf8;

-- Creation of categories table
CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(150) NOT NULL,
    
    PRIMARY KEY (id)
);

ALTER TABLE category MODIFY name TEXT CHARACTER SET utf8;

-- AddForeignKey
ALTER TABLE product ADD CONSTRAINT FK_CategoryId FOREIGN KEY (categoryId) REFERENCES category(id) ON DELETE RESTRICT ON UPDATE CASCADE;;

INSERT INTO category (name)
VALUES ('Alimentos'),('Eletrônicos'),('Eletrodomésticos'),('Móveis'),('Materiais de Limpeza');

INSERT INTO product 
    (description, buyDate, price, categoryId)
VALUES 
    ('Coca-Cola Pet 2L', '2021-06-11T00:04:01', 7.50, 1),
    ('Smartphone Moto G8 Plus 128gb', '2021-10-11T00:04:01', 1502.99, 2),
    ('Microondas LG HTS21', '2021-11-11T00:04:01', 252.54, 3),
    ('Geladeira Brastemp FrostFree HS7', '2020-04-12T00:04:01', 1255.54, 3),
    ('Nutella 500g + 100g Grátis', '2021-07-22T00:04:01', 45.54, 1),
    ('Notebool Dell G15-SHW12 SSD 500gb RAM 16gb', '2019-09-23T00:04:01', 11322.54, 2),
    ('Microondas Eletrolux STF', '2021-03-01T00:04:01', 400.54, 3),
    ('Liquidificador Arno T200', '2021-07-15T00:04:01', 144.54, 3),
    ('Escrivaninha Gamer Razer X', '2021-07-10T00:04:01', 677.14, 4),
    ('Cesta Básica de Natal 2021', '2019-06-10T00:04:01', 55.74, 1),
    ('Iphone X 128gb 12gb RAM', '2021-02-17T00:04:01', 5092.11, 2),
    ('Televisão LED 55 SAMSUMG', '2020-04-14T00:04:01', 3505.99, 2);