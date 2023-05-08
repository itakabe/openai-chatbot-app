import { CosmosClient, Container, Database } from "@azure/cosmos";
import { ResponseData } from "@/types/custom";

export class ResponseRepository {
  private client: CosmosClient;
  private database: Database;
  private container: Container;

  constructor(endpoint: string, key: string, databaseId: string, containerId: string) {
    this.client = new CosmosClient({ endpoint, key });
    this.database = this.client.database(databaseId);
    this.container = this.database.container(containerId);
  }

  async create(response: ResponseData): Promise<ResponseData> {
    const { resource: createdResponse } = await this.container.items.create(response);
    return createdResponse as ResponseData;
  }

  async readAll(): Promise<ResponseData[]> {
    const { resources } = await this.container.items.readAll<ResponseData>().fetchAll();
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