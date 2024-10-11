// api/admin/products/route.ts
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const productService = req.scope.resolve("productService");

  const products = await productService.list();

  res.json({ products });
}
