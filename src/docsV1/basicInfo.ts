export const basicInfo = {
  openapi: "3.1.0", // present supported openapi version
  info: {
    title: `${process.env.APP_NAME}`, // short title.
    description: `${process.env.APP_NAME} API Description`, //  desc.
    version: "1.0.0", // version number
    contact: {
      name: "Dev Team", // your name
      email: "", // your email
      url: `${process.env.SERVICE_DOMAIN}`, // your website
    },
  },
  externalDocs: {
    description: "Download API JSON",
    url: `${process.env.SERVICE_DOMAIN}/api-docs/v1/json`,
  },
};
