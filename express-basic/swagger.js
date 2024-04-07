import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Api red social",
    versión: "1.0.0",
    description:
      "Api red social para crear. actualizar, delete, y obtener post de usuarios",
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.route.js"], // Ruta a las rutas API en su aplicación Node.js
};
const swaggerSpec = swaggerJSDoc(options);

export default function swaggerDocV1(app) {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}
