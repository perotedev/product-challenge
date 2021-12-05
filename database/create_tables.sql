-- Creation of product table
CREATE TABLE products (
    id SERIAL NOT NULL,
    description varchar(250) NOT NULL,
    buy_date DATE NOT NULL,
    price FLOAT NOT NULL,
    category_id INT NOT NULL,
    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

CREATE TABLE categories (
    id SERIAL NOT NULL,
    name varchar(150) NOT NULL,
    CONSTRAINT "categories_pkey"  PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_category_id" ON "products"("category_id");


-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "product_category_id" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

