// api/admin/products/[id]/route.ts

import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;
  const { payload } = req.body as { payload: Record<string, unknown> };

  const productService = req.scope.resolve("productService");

  const product = await productService.update(id, payload);

  res.json({ product });
}
