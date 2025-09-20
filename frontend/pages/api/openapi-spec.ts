import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ganti dengan generator OpenAPI backend Anda
  const openapiSpec = {
    openapi: "3.0.0",
    info: { title: "VeloraChain API", version: "1.0.0" },
    paths: {
      "/wallets/{address}/balance": {
        get: {
          summary: "Get wallet balance",
          parameters: [
            { name: "address", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: { "200": { description: "Success" } }
        },
      },
      "/contracts/deploy": {
        post: {
          summary: "Deploy smart contract",
          requestBody: { content: { "application/json": { schema: { type: "object" } } } },
          responses: { "200": { description: "Success" } }
        }
      },
      // Tambahkan endpoint lain ...
    }
  };
  res.status(200).json(openapiSpec);
}