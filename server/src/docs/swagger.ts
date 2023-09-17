const docs = {
  openapi: "3.0.3",
  info: {
    title: "NODE EXPRESS MONGODB API",
    description: "An API for  works built using NodeJS, ExpressJS & MongoDB",
    version: "1.0.0",
    contact: {
      name: "zehan khan",
      email: "zehan9211@gmail.com",
      url: "https://github.com/zehan12",
    },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "https://.com/api",
      description: "Production Server",
    },
    {
      url: `http://localhost:5000/api`,
      description: "Development Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  paths: {},
};

export default docs;
