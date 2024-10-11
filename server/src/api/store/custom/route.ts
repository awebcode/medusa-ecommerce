import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const GET = (req: MedusaRequest, res: MedusaResponse) => {
  res.json({
    message: "[GET] Hello world!",
  });
};

export const POST = (req: MedusaRequest, res: MedusaResponse) => {
  res.json({
    message: "[POST] Hello world!",
  });
};
