import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const mailchimpService = req.scope.resolve("mailchimpService");

  // Assuming req.body contains the necessary data for newsletter subscription
  const { email, tags } = req.body as { email: string; tags?: string[] };

  // Subscribe the user to Mailchimp newsletter
  await mailchimpService.subscribeNewsletter(email, { tags: tags ?? ["customer"] });

  // Respond with a success message or appropriate status
  res.status(200).json({ message: "Subscription successful" });
};
