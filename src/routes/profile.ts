import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";

// eslint-disable-next-line @typescript-eslint/require-await
const ProfileRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
  server.get("/profile", async (request, reply) => {
    await reply.send({
      status: "OK",
      data: request.user
    });
  });
};

export default fp(ProfileRoute);
