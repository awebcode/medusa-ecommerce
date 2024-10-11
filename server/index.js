const express = require("express")
const { GracefulShutdownServer } = require("medusa-core-utils")
const globalRoutes = require("./routes/index.routes")
const loaders = require("@medusajs/medusa/dist/loaders/index").default

(async() => {
  async function start() {
    const app = express()

    try {
      const { container } = await loaders({
        directory:process.cwd(),
        expressApp: app,
      });
      const configModule = container.resolve("configModule");
      const port = process.env.PORT ?? configModule.projectConfig.port ?? 9000;
      // Middleware to parse JSON requests
      

      // Use your custom routes
      app.use("/api/v1", globalRoutes); // Prefixing all custom routes with /api
      const server = GracefulShutdownServer.create(
        app.listen(port, (err) => {
          if (err) {
            return;
          }
          console.log(`Server is ready on port: ${port}`);
        })
      );

      // Handle graceful shutdown
      const gracefulShutDown = () => {
        server
          .shutdown()
          .then(() => {
            console.info("Gracefully stopping the server.");
            process.exit(0);
          })
          .catch((e) => {
            console.error("Error received when shutting down the server.", e);
            process.exit(1);
          });
      };
      process.on("SIGTERM", gracefulShutDown);
      process.on("SIGINT", gracefulShutDown);
    } catch (err) {
      console.error("Error starting server", err)
      process.exit(1)
    }
  }

  await start()
})()
