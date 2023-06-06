import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.patch = "./productos.txt";
    this.products = [];
  }
  static id = 0;

  addProduct = async (title, description, price, imagen, code, stock) => {
    ProductManager.id++;

    let newProduct = {
      title,
      description,
      price,
      imagen,
      code,
      stock,
      id: ProductManager.id,
    };
    this.products.push(newProduct);

    await fs.writeFile(this.patch, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let respuesta = await fs.readFile(this.patch, "utf-8");
    return JSON.parse(respuesta);
  };

  getProducts = async () => {
    let respuesta2 = await this.readProducts();
    return console.log(respuesta2);
  };

  getProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    if (!respuesta3.find((product) => product.id === id)) {
      console.log("No existe producto");
    } else {
      console.log(respuesta3.find((product) => product.id === id));
    }
  };

  deleteProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter((products) => products.id != id);

    await fs.writeFile(this.patch, JSON.stringify(productFilter));
    console.log("Producto Eliminado");
  };

  updateProducts = async ({ id, ...producto }) => {
    await this.deleteProductsById(id);
    let productOld = await this.readProducts();
    let productsModif = [{...producto, id }, ...productOld];
    await fs.writeFile(this.patch, JSON.stringify(productsModif));
  };
}

const productos = new ProductManager();
// productos.addProduct("titulo1", "Description1", 50000, "Imagen1", "cod1", 10)
// productos.addProduct("titulo2", "Description2", 80000, "Imagen2", "cod2", 5)
// productos.addProduct("titulo3", "Description3", 40000, "Imagen3", "cod3", 6)
// productos.addProduct("titulo4", "Description4", 45000, "Imagen4", "cod4", 20)

//productos.getProducts ()
// productos.getProductsById (3)
// productos.deleteProductsById(3);
productos.updateProducts({
  title: "titulo2",
  description: "Description2",
  price: 85000,
  imagen: "Imagen2",
  code: "cod2",
  stock: 5,
  id: 2,
});
