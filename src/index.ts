/* eslint-disable @typescript-eslint/no-misused-promises */
import Fastify from "fastify";
import fastifyJWT from "fastify-jwt";
import fastifySwagger from "fastify-swagger";
import randomstring from "randomstring";
import authRoute from "./routes/auth";
import healthRoute from "./routes/health";
import profile from "./routes/profile";
import { bootstrapService } from "./services/boostrap.service";

const whitelistRoutes = ["/auth", "/health"];
export const buildServer = () => {
  const fastify = Fastify({
    logger: true
  });

  void fastify.register(fastifyJWT, {
    secret: randomstring.generate({ length: 30 })
  });

  void fastify.register(fastifySwagger, {
    routePrefix: "/api_docs",
    swagger: {
      info: {
        title: `Deltaforce API server`,
        description: "API documentation",
        version: "1.0"
      },
      host: "localhost",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"]
    }
  });

  fastify.addHook("onRequest", async (request, reply) => {
    try {
      const whiteList = whitelistRoutes.filter((s) => request.url.includes(s));
      if (whiteList.length === 0) await request.jwtVerify();
    } catch (err) {
      await reply.send(err);
    }
  });

  void fastify.register(healthRoute, { prefix: "/health" });
  void fastify.register(authRoute, { prefix: "/auth" });
  void fastify.register(profile, { prefix: "/profile" });

  fastify.ready(async () => {
    fastify.log.info("Ready");
    fastify.swagger();
    await bootstrapService.init();
  });
  return fastify;
};
