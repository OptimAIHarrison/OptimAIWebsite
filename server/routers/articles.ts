import { z } from "zod";
import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { articles } from "../../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";

export const articlesRouter = router({
  upsertArticle: adminProcedure
    .input(
      z.object({
        id: z.number().optional(),
        title: z.string().min(1),
        slug: z.string().min(1),
        content: z.string().min(1),
        excerpt: z.string().optional(),
        featuredImage: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        metaKeywords: z.string().optional(),
        author: z.string().optional(),
        readTime: z.number().optional(),
        status: z.enum(["draft", "published", "scheduled"]).optional(),
        scheduledFor: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const articleData = {
        title: input.title,
        slug: input.slug,
        content: input.content,
        excerpt: input.excerpt || null,
        featuredImage: input.featuredImage || null,
        category: input.category || "General",
        tags: input.tags ? JSON.stringify(input.tags) : null,
        metaTitle: input.metaTitle || null,
        metaDescription: input.metaDescription || null,
        metaKeywords: input.metaKeywords || null,
        author: input.author || "OptimAI",
        readTime: input.readTime || 5,
        status: (input.status || "draft") as "draft" | "published" | "scheduled",
        publishedAt: input.status === "published" ? new Date() : null,
        scheduledFor: input.scheduledFor ? new Date(input.scheduledFor) : null,
      };

      if (input.id) {
        await db.update(articles).set(articleData).where(eq(articles.id, input.id));
        return { success: true, id: input.id };
      } else {
        const result = await db.insert(articles).values(articleData);
        return { success: true, id: (result as any).insertId };
      }
    }),

  getArticles: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const allArticles = await db.select().from(articles).orderBy(desc(articles.createdAt));
    return allArticles.map((article: any) => ({
      ...article,
      tags: article.tags ? JSON.parse(article.tags) : [],
    }));
  }),

  getPublishedArticles: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const publishedArticles = await db
      .select()
      .from(articles)
      .where(eq(articles.status, "published"))
      .orderBy(desc(articles.publishedAt));

    return publishedArticles.map((article: any) => ({
      ...article,
      tags: article.tags ? JSON.parse(article.tags) : [],
    }));
  }),

  getArticleBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const article = await db
        .select()
        .from(articles)
        .where(eq(articles.slug, input.slug))
        .limit(1);

      if (!article.length) throw new Error("Article not found");

      const articleData = article[0] as any;
      return {
        ...articleData,
        tags: articleData.tags ? JSON.parse(articleData.tags) : [],
      };
    }),

  getArticleById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const article = await db.select().from(articles).where(eq(articles.id, input.id)).limit(1);

      if (!article.length) throw new Error("Article not found");

      const articleData = article[0] as any;
      return {
        ...articleData,
        tags: articleData.tags ? JSON.parse(articleData.tags) : [],
      };
    }),

  deleteArticle: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.delete(articles).where(eq(articles.id, input.id));
      return { success: true };
    }),

  publishScheduledArticles: adminProcedure.mutation(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const now = new Date();
    const scheduledArticles = await db
      .select()
      .from(articles)
      .where(eq(articles.status, "scheduled"));

    for (const article of scheduledArticles as any[]) {
      if (article.scheduledFor && article.scheduledFor <= now) {
        await db
          .update(articles)
          .set({
            status: "published" as const,
            publishedAt: now,
          })
          .where(eq(articles.id, article.id));
      }
    }

    return { success: true };
  }),
});
