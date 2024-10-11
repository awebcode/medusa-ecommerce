// api/middlewares.ts

import type { MiddlewaresConfig } from "@medusajs/medusa";

export const config: MiddlewaresConfig = {
  routes: [
    {
      method: [ "POST",'GET'],
      matcher: "/store/*",
      middlewares: [],
    },
  ],
};
