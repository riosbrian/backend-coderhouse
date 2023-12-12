import fs from "fs/promises";
import __dirname from "../../config/dirname.js";

export default class ProductsDAO {
  constructor() {
    this.products = [];
    this.path = `${__dirname}/../data/products.json`;
  }

  async create(data) {
    try {
      const products = await this.getAllProducts();
      const newProduct = { id: Date.now(), ...data };
      products.push(newProduct);
      await this.saveProducts(products);
      return newProduct;
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async find() {
    try {
      return await this.getAllProducts();
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async findById(id) {
    try {
      const products = await this.getAllProducts();
      return products.find((product) => product.id === Number(id));
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async findByIdAndUpdate(id, data) {
    try {
      const products = await this.getAllProducts();
      const index = products.findIndex((product) => product.id === Number(id));

      if (index !== -1) {
        products[index] = { ...products[index], ...data };
        await this.saveProducts(products);
        return products[index];
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async findByIdAndDelete(id) {
    try {
      const products = await this.getAllProducts();
      const updatedProducts = products.filter(
        (product) => product.id !== Number(id)
      );

      if (products.length !== updatedProducts.length) {
        await this.saveProducts(updatedProducts);
        return { message: "Product deleted successfully" };
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  // Función para obtener todos los productos desde el archivo
  async getAllProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o está vacío, devuelve un array vacío
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  // Función para guardar los productos en el archivo
  async saveProducts(products) {
    try {
      await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    } catch (error) {
      throw error;
    }
  }
}
