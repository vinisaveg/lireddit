import { MikroORM } from "@mikro-orm/core";

import { __prod__ } from "./constants";
import env from "./environment/env";
import path from "path";

import { Post } from "./entities/Post";
import { User } from "./entities/User";

export default {
  dbName: "lireddit",
  type: "postgresql",
  user: "postgres",
  password: env.POSTGRES_PASS,
  entities: [Post, User],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
