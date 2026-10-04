import config from "../config/config";
import { Client, Storage, Query, ID, TablesDB } from "appwrite";

class CategoryService {
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
  async uploadImage(file) {
    return await this.storage.createFile(
      config.appwriteBucketId,
      ID.unique(),
      file
    );
  }

  async createCategory(data) {
    const fileRes = await this.uploadImage(data.image);
    return await this.tabledb.createRow(
      config.appwriteDatabaseId,
      config.appwriteTableId,
      ID.unique(),
      {
        ...data, // ✅ sab fields pass ho jayengi
        image: fileRes.$id,
        type: "category",
      }
    );
  }

  async getCategories() {
    return await this.tabledb.listRows(
      config.appwriteDatabaseId,
      config.appwriteTableId,
      [Query.equal("type", "category")]
    );
  }
  getImage(fileId) {
    return this.storage.getFileView(config.appwriteBucketId, fileId);
  }
}

const categoryService = new CategoryService();
export default categoryService;
