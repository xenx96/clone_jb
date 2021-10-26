import swaggerUi from "swagger-ui-express";
import swaggereJsdoc from "swagger-jsdoc";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Clone_JB's Node Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Meditator",
        url: "https://github.com/xenx96/clone_jb",
        email: "xenx96@naver.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },
  apis: ["./swagger_test/service/*"],
};
export const specs = swaggereJsdoc(options);
export const swaggerUI = swaggerUi;
