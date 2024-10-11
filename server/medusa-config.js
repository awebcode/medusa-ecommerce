const dotenv = require("dotenv");

// Load environment variables from .env file.
let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  // {
  //   resolve: `@medusajs/file-local`,
  //   options: {
  //     upload_dir: "uploads",
  //   },
  // },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      // only enable `serve` in development
      // you may need to add the NODE_ENV variable
      // manually only deploy backend not admin
      serve: process.env.NODE_ENV === "development",
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
  // ** algolia plugin
  {
    resolve: `medusa-plugin-algolia`,
    options: {
      applicationId: process.env.ALGOLIA_APP_ID,
      adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,

      settings: {
        products: {
          indexSettings: {
            searchableAttributes: ["title", "description"],
            attributesToRetrieve: [
              "id",
              "title",
              "description",
              "handle",
              "thumbnail",
              "variants",
              "variant_sku",
              "options",
              "collection_title",
              "collection_handle",
              "images",
            ],
          },
          transformer: (item) => {
            // Extract titles and descriptions directly from item.metadata
            return {
              objectID: item.id,
              title: item.title,
              handle: item.handle,
              thumbnail: item.thumbnail,
              subtitle: item.subtitle,
              tags: item.tags,
              description: item.description,
              material: item.material,
              metadata: item.metadata, // Keep the original metadata as well if needed
              collection_title: item.collection ? item.collection.title : "", // Adjusted to avoid potential undefined access
              collection_handle: item.collection ? item.collection.handle : "", // Adjusted to avoid potential undefined access
            };
          },
        },
      },
    },
  },
  // ** Uncomment to add Stripe support
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY,
      // webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  },
  {
    resolve: `medusa-plugin-dashboard`,
    options: {
      enableUI: true,
    },
  },
  // Cloudinary plugin
  {
    resolve: `medusa-file-cloudinary`,
    options: {
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    },
  },
  // ** Uncomment to add Twilio SMS support
  {
    resolve: `medusa-plugin-twilio-sms`,
    options: {
      account_sid: process.env.TWILIO_SMS_ACCOUNT_SID,
      auth_token: process.env.TWILIO_SMS_AUTH_TOKEN,
      from_number: process.env.TWILIO_SMS_FROM_NUMBER,
    },
  },

  // ** Uncomment to add Email support
  {
    resolve: "@rootxpdev/medusa-email-plugin",
    options: {
      templateDir: "node_modules/@rootxpdev/medusa-email-plugin/data/emails",
      fromAddress: process.env.FROM_EMAIL, // Use the FROM_EMAIL env variable
      smtpHost: process.env.SMTP_HOST, // Use the SMTP_HOST env variable
      smtpPort: process.env.SMTP_PORT, // Use the SMTP_PORT env variable
      smtpUser: process.env.SMTP_USER, // Use the SMTP_USER env variable
      smtpPassword: process.env.SMTP_PASS, // Use the SMTP_PASS env variable
    },
  },
  // ...,
  // {
  //   resolve: `medusa-plugin-sendgrid`,
  //   options: {
  //     api_key: process.env.SENDGRID_API_KEY,
  //     from: process.env.SENDGRID_FROM,
  //     order_placed_template: process.env||"SENDGRID_ORDER_PLACED_ID",
  //     localization: {
  //       "de-DE": {
  //         // locale key
  //         order_placed_template: process.env.SENDGRID_ORDER_PLACED_ID_LOCALIZED,
  //       },
  //     },
  //   },
  // },
];

const modules = {
  /*eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  redis_url: REDIS_URL,

  jwt_secret: process.env.JWT_SECRET || "supersecret",
  cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  store_cors: STORE_CORS, //STORE_CORS||"*"|| "http://localhost:8000"
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS, //ADMIN_CORS || "*" || "http://localhost:7000,http://localhost:7001",
  // worker_mode: process.env.MEDUSA_WORKER_MODE,
  database_extra:
    process.env.NODE_ENV !== "development"
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {},

  // Uncomment the following lines to enable REDIS
  // redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
