import { Service } from "../types/Service";
import HttpClient from "../utils/httpClient";

export function useServices() {
  const client = new HttpClient();

  async function getServices() {
    const response = await client.get("/services");
    return response.data as Service[];
  }

  return {
    getServices,
  };
}