import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";

// eslint-disable-next-line @typescript-eslint/require-await
const HealthRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
  server.get("/health/ready", async (request, reply) => {
    await reply.send({
      status: "OK"
    });
  });

  server.get("/health/live", async (request, reply) => {
    await reply.send({
      status: "OK"
    });
  });
};

export default fp(HealthRoute, { name: "health" });
