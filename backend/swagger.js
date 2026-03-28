import swaggerJSDoc from "swagger-jsdoc";
import { PORT } from "./src/config/veriables.js";

// Define Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "LivePoll API",
      version: "1.0.0",
      description: "API documentation for LivePoll",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`,
      },
    ],
  },
  apis: ["./src/routes/v1/*.js"],
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
