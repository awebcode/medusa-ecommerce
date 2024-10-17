import { MedusaRequest, MedusaResponse, ProductService,UserService, TokenService } from "@medusajs/medusa";
export const GET = async (
  req: MedusaRequest, 
  res: MedusaResponse
) => {
  const productService: ProductService = req.scope.resolve(
    "productService"
  );

  const userService: UserService = req.scope.resolve("userService");
  res.json({
    product: await productService.count(),
    user: (await userService.list({})),
  })
}
