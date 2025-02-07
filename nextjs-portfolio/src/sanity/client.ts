import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "o0lsdfkx",
  dataset: "portfolio-dataset",
  apiVersion: "2024-01-01",
  useCdn: false,
});
