import { Client, TablesDB, ID, Query } from "appwrite";
import config from "../config/config";

class OrderService {
  client = new Client();
  tabledb;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.tabledb = new TablesDB(this.client);
  }

  async createOrder(data) {
    try {
      return await this.tabledb.createRow(
        config.appwriteDatabaseId,
        config.appwriteTableId,
        ID.unique(),
        data
      );
    } catch (error) {
      console.log("Order Error:", error);
    }
  }
  async getOrders(userId) {
    try {
      return await this.tabledb.listRows(
        config.appwriteDatabaseId,
        config.appwriteTableId,
        [Query.equal("type", "order"), Query.equal("userId", userId)]
      );
    } catch (error) {
      console.log("Get Orders Error:", error);
    }
  }
}

const orderService = new OrderService();
export default orderService;
