import { buildServer } from "./index";

const fastify = buildServer();

const httpPort = 3000;
const httpListenHost = "0.0.0.0";

const start = async () => {
  try {
    await fastify.listen({ host: httpListenHost, port: httpPort });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void start();
