import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext) {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const newPost = em.create(Post, { title });
    await em.persistAndFlush(newPost);

    return newPost;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    let currentPost = await em.findOne(Post, { id });

    if (!currentPost) {
      return null;
    }

    if (typeof title !== "undefined") {
      currentPost.title = title;

      await em.persistAndFlush(currentPost);
    }

    return currentPost;
  }

  @Mutation(() => Boolean, { nullable: true })
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Boolean | null> {
    await em.nativeDelete(Post, { id });

    return true;
  }
}
