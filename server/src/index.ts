import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);

  await orm.getMigrator().up();

  const post = orm.em.create(Post, { title: "my first post" });

  //INSETING A NEWS POST
  // await orm.em.persistAndFlush(post);

  //SHOWING ALL POSTS
  //const posts = await orm.em.find(Post, {});
};

main().catch((error) => console.error(error));
