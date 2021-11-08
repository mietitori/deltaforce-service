import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import { usersDao } from "../dao/users.dao";

export interface IUserLoginBody {
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/require-await
const AuthRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
  server.post<{ Body: IUserLoginBody }>(
    "/auth/login",
    {
      schema: {
        description: "Login user"
      }
    },
    async (req, reply) => {
      const user = await usersDao.login(req.body.email, req.body.password);
      if (user) {
        const token = server.jwt.sign({
          id: user.id,
          email: user.email,
          level: user.level
        });
        await reply.send({
          token,
          status: "USER_LOGIN_OK"
        });
        return;
      }
      await reply.send({ status: "USER_LOGIN_FAILED" });
    }
  );
};

export default fp(AuthRoute);
