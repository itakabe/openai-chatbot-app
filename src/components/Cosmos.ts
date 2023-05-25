// Get Cosmos Client
import { CosmosClient, Container, Database } from "@azure/cosmos";
import { ResponseData } from "@/types/custom";
import dotenv from 'dotenv';

dotenv.config();
<<<<<<< HEAD
const endpoint = process.env.AZURE_COSMOS_ENDPOINT || "https://sample.documents.azure.com:443/";
=======
const endpoint = process.env.AZURE_COSMOS_ENDPOINT || "";
>>>>>>> 93e8f3ed0b168c44999019b791aab05c1047c0d0
const key = process.env.AZURE_COSMOS_KEY || "";
const databaseId = "openai";
const containerId = "chat";

export class Cosmos {

  private client = new CosmosClient({ endpoint, key });
  private database = this.client.database(databaseId);
  private container = this.database.container(containerId);

  async create(response: any): Promise<any> {
    const { resource: createdResponse } = await this.container.items.create(response);
    console.log("created");
    return createdResponse as ResponseData;
  }

  async readAll(): Promise<ResponseData[]> {
    const { resources } = await this.container.items.readAll<ResponseData>().fetchAll();
    console.log("read");
    return resources;
  }

  async readByRange(start: string, end: string): Promise<ResponseData[]> {
    const query = `SELECT * FROM c WHERE c.value BETWEEN ${start} AND ${end}`;
    const { resources } = await this.container.items.query(query).fetchAll();
    return resources;
  }

  async readById(id: string): Promise<ResponseData> {
    const { resource } = await this.container.item(id, id).read();
    return resource;
  }

  async update(response: ResponseData): Promise<ResponseData> {
    const { resource: updatedResponse } = await this.container.item(response.id, response.id).replace(response);
    return updatedResponse as ResponseData;
  }

  async delete(id: string): Promise<void> {
    await this.container.item(id, id).delete();
  }
}