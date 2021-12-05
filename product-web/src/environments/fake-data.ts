import { CategoryList } from './../app/shared/interfaces/category.interface';
import { ProductList } from './../app/shared/interfaces/product.interface';

export const fakeProducts: ProductList = {
    products: [
      {
        id: 1,
        description: "Coca-Cola Pet 1L",
        buy_date: new Date("2021-06-11T00:04:01.665Z").toISOString(),
        price: 7.50,
        category_id: 1,
        category: "Alimentos"
      },
      {
        id: 2,
        description: "Smartphone Moto G8 Plus 128gb",
        buy_date: new Date("2021-10-11T00:04:01.665Z").toISOString(),
        price: 1502.99,
        category_id: 2,
        category: "Eletrônicos"
      },
      {
        id: 3,
        description: "Microondas LG HTS21",
        buy_date: new Date("2021-11-11T00:04:01.665Z").toISOString(),
        price: 252.54,
        category_id: 3,
        category: "Eletrodomésticos"
      },
      {
        id: 4,
        description: "Geladeira Brastem FrostFree HS7",
        buy_date: new Date("2021-11-11T00:04:01.665Z").toISOString(),
        price: 1255.54,
        category_id: 3,
        category: "Eletrodomésticos"
      },
      {
        id: 5,
        description: "Nutella 500g + 100g Grátis",
        buy_date: new Date("2021-11-11T00:04:01.665Z").toISOString(),
        price: 45.54,
        category_id: 1,
        category: "Alimentos"
      },
      {
        id: 6,
        description: "Notebool Dell G15-SHW12 SSD 500gb RAM 16gb",
        buy_date: new Date("2021-11-11T00:04:01.665Z").toISOString(),
        price: 12500.54,
        category_id: 2,
        category: "Eletrônicos"
      },
      {
        id: 7,
        description: "Microondas Eletrolux STF",
        buy_date: new Date("2021-11-11T00:04:01.665Z").toISOString(),
        price: 400.94,
        category_id: 3,
        category: "Eletrodomésticos"
      },
      {
        id: 8,
        description: "Liquidificador Arno T200",
        buy_date: new Date("2021-11-11T00:04:01.665Z").toISOString(),
        price: 144.54,
        category_id: 3,
        category: "Eletrodomésticos"
      },
      {
        id: 9,
        description: "Escrivaninha Gamer Razer X",
        buy_date: new Date("2021-11-11T00:04:01.665Z").toISOString(),
        price: 677.14,
        category_id: 4,
        category: "Móveis"
      },
      {
        id: 10,
        description: "Cesta Básica de Natal 2021",
        buy_date: new Date("2021-11-11T00:04:01.665Z").toISOString(),
        price: 55.74,
        category_id: 1,
        category: "Alimentos"
      },
      {
        id: 11,
        description: "Iphone X 128gb 12gb RAM",
        buy_date: new Date("2021-11-11T00:04:01.665Z").toISOString(),
        price: 5092.11,
        category_id: 2,
        category: "Eletrônicos"
      }
    ]
  }
  
  export const fakeCategories: CategoryList = {
    categories: [
      {
        id: 1,
        name: "Alimentos"
      },
      {
        id: 2,
        name: "Eletrônicos"
      },
      {
        id: 3,
        name: "Eletrodomésticos"
      },
      {
        id: 4,
        name: "Móveis"
      }
    ]
  }