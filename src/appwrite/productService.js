import { Client, Query, Storage, TablesDB, ID } from "appwrite";
import config from "../config/config";

class ProductService {
  client = new Client();
  tabledb;
  storage;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.tabledb = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }
  async getProducts() {
    try {
      return await this.tabledb.listRows(
        config.appwriteDatabaseId,
        config.appwriteTableId,
        [
          Query.equal("type", "product"), // 🔥 IMPORTANT
        ]
      );
    } catch (error) {
      console.log(error);
    }
  }
  async getProduct(id) {
    try {
      const res = await this.tabledb.getRow(
        config.appwriteDatabaseId,
        config.appwriteTableId,
        id
      );
      if (!res || res.type !== "product") {
        return null;
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async createProduct(data) {
    try {
      let imageId = "";
      if (data.image) {
        const fileRes = await this.uploadImage(data.image);
        imageId = fileRes.$id;
      }
      return await this.tabledb.createRow(
        config.appwriteDatabaseId,
        config.appwriteTableId,
        ID.unique(),
        {
          ...data,
          image: imageId,
        }
      );
    } catch (error) {
      console.log("Create Product Error", error);
    }
  }
  async deleteProduct(id) {
    try {
      return await this.tabledb.deleteRow(
        config.appwriteDatabaseId,
        config.appwriteTableId,
        id
      );
    } catch (error) {
      console.log("Delete Error", error);
    }
  }
  async updateProduct(id, data) {
    try {
      return await this.tabledb.updateRow(
        config.appwriteDatabaseId,
        config.appwriteTableId,
        id,
        data
      );
    } catch (error) {
      console.log("Update Error", error);
    }
  }

  async uploadImage(file) {
    return await this.storage.createFile(
      config.appwriteBucketId,
      ID.unique(),
      file
    );
  }
  getImagePreview(fileId) {
    return this.storage.getFileView(config.appwriteBucketId, fileId);
  }
}
const productService = new ProductService();
export default productService;
