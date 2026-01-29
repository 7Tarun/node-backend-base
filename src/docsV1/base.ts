const { PORT, MODE, SERVER_IP, SERVICE_NAME, SERVICE_DOMAIN } = process.env;

export const base = {
  servers: [
    {
      url: `${SERVICE_DOMAIN}/${SERVICE_NAME}/api/v1/`, // url
      description: `${MODE} server`, // name
    },
  ],
};
